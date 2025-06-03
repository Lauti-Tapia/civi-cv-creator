import { Groq } from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in environment variables");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateWithGroq(prompt: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant specialized in CV creation and career advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating with Groq:", error);
    throw error;
  }
}

// Función específica para generar contenido de CV
export async function generateCVContent(
  prompt: string,
  language: "es" | "en" = "es"
) {
  const systemPrompt = language === "es" 
    ? "Eres un experto en creación de CVs y asesoría de carrera. Genera contenido profesional y relevante para CVs en español."
    : "You are an expert in CV creation and career advice. Generate professional and relevant content for CVs in English.";

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating CV content:", error);
    throw error;
  }
}

/**
 * Detecta si un texto está en español o inglés
 * @param text - El texto a analizar
 * @returns 'es' | 'en' - El idioma detectado
 */
function detectLanguage(text: string): 'es' | 'en' {
  // Características comunes del español
  const spanishPatterns = [
    /\b(el|la|los|las|un|una|unos|unas)\b/i,
    /\b(es|son|está|están)\b/i,
    /\b(para|por|con|sin|sobre|bajo|entre|durante)\b/i,
    /\b(que|qué|cual|cuál|quien|quién)\b/i,
    /[áéíóúñ¿¡]/i,
  ];

  // Contar coincidencias de patrones españoles
  const spanishMatches = spanishPatterns.reduce((count, pattern) => {
    return count + (text.match(pattern) || []).length;
  }, 0);

  // Si hay más de 2 coincidencias, consideramos que es español
  return spanishMatches > 2 ? 'es' : 'en';
}

/**
 * Mejora un texto específico del CV usando la descripción del trabajo como contexto
 * @param originalText - El texto original a mejorar
 * @param jobDescription - La descripción del trabajo objetivo
 * @param type - El tipo de texto a mejorar ('presentation' o 'experience')
 * @param language - El idioma del texto original
 * @returns El texto mejorado
 */
export async function improveCVText(
  originalText: string,
  jobDescription: string,
  type: 'presentation' | 'experience',
  language: 'es' | 'en' = 'es'
): Promise<string> {
  if (!originalText.trim()) {
    throw new Error('Original text is required');
  }

  const detectedLanguage = detectLanguage(originalText);
  const isSpanish = language === 'es' || detectedLanguage === 'es';

  let systemPrompt = '';
  let prompt = '';

  if (!jobDescription.trim()) {
    // Solo mejora de redacción profesional y expande si es breve
    systemPrompt = isSpanish
      ? `Eres un experto en redacción de CVs. Tu única tarea es devolver el texto mejorado, sin ningún tipo de texto adicional. Mejora la claridad, profesionalismo y coherencia. Si el texto es muy breve, expándelo agregando detalles realistas y relevantes típicos de un perfil profesional, pero sin inventar logros ni información falsa. No expliques los cambios. Devuelve solo el texto mejorado.`
      : `You are a professional CV writer. Your only task is to return the improved text, without any additional text. Improve clarity, professionalism, and coherence. If the text is very short, expand it by adding realistic and relevant details typical of a professional profile, but do not invent achievements or false information. Do not explain the changes. Return only the improved text.`;
    prompt = isSpanish
      ? `Texto a mejorar:\n${originalText}\n\nDevuelve ÚNICAMENTE el texto mejorado:`
      : `Text to improve:\n${originalText}\n\nReturn ONLY the improved text:`;
  } else {
    // Adaptación a puesto
    systemPrompt = isSpanish
      ? `Eres un experto en redacción de CVs. Tu única tarea es devolver el texto mejorado, sin ningún tipo de texto adicional.\n       REGLAS ESTRICTAS:\n       1. Devuelve ÚNICAMENTE el texto mejorado\n       2. NO incluyas ningún tipo de introducción, explicación o texto adicional\n       3. NO uses frases como "Mejora del párrafo:", "Versión mejorada:", etc.\n       4. NO agregues información nueva\n       5. NO uses formato markdown ni comillas\n       6. NO des explicaciones sobre lo que hiciste\n       7. NO incluyas ningún tipo de meta-texto\n       8. SOLO devuelve el texto mejorado, nada más`
      : `You are a professional CV writer. Your only task is to return the improved text, without any additional text.\n       STRICT RULES:\n       1. Return ONLY the improved text\n       2. DO NOT include any introduction, explanation, or additional text\n       3. DO NOT use phrases like "Improved paragraph:", "Enhanced version:", etc.\n       4. DO NOT add new information\n       5. DO NOT use markdown formatting or quotes\n       6. DO NOT explain what you did\n       7. DO NOT include any meta-text\n       8. Return ONLY the improved text, nothing else`;
    prompt = isSpanish
      ? type === 'presentation'
        ? `Texto a mejorar:\n${originalText}\n\nDescripción del trabajo:\n${jobDescription}\n\nDevuelve ÚNICAMENTE el texto mejorado:`
        : `Experiencia a mejorar:\n${originalText}\n\nDescripción del trabajo:\n${jobDescription}\n\nDevuelve ÚNICAMENTE el texto mejorado:`
      : type === 'presentation'
        ? `Text to improve:\n${originalText}\n\nJob description:\n${jobDescription}\n\nReturn ONLY the improved text:`
        : `Experience to improve:\n${originalText}\n\nJob description:\n${jobDescription}\n\nReturn ONLY the improved text:`;
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      model: "llama3-70b-8192",
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 0.9,
      stream: false,
    });

    // Limpiar cualquier texto adicional que pudiera haber quedado
    let improvedText = completion.choices[0]?.message?.content?.trim() || originalText;
    
    // Lista más exhaustiva de frases a eliminar
    const phrasesToRemove = isSpanish
      ? [
          "Mejora del párrafo:",
          "Versión mejorada:",
          "Aquí está el texto mejorado:",
          "Texto mejorado:",
          "Párrafo mejorado:",
          "Presentación mejorada:",
          "Experiencia mejorada:",
          "El texto mejorado es:",
          "La versión mejorada es:",
          "La presentación mejorada es:",
          "La experiencia mejorada es:",
          "Mejora:",
          "Versión optimizada:",
          "Texto optimizado:",
          "Presentación optimizada:",
          "Experiencia optimizada:",
          "Aquí está la versión optimizada:",
          "Aquí está el texto optimizado:",
          "Aquí está la presentación optimizada:",
          "Aquí está la experiencia optimizada:"
        ]
      : [
          "Improved paragraph:",
          "Enhanced version:",
          "Here is the improved text:",
          "Improved text:",
          "Enhanced text:",
          "Improved presentation:",
          "Improved experience:",
          "The improved text is:",
          "The enhanced version is:",
          "The improved presentation is:",
          "The improved experience is:",
          "Improvement:",
          "Optimized version:",
          "Optimized text:",
          "Optimized presentation:",
          "Optimized experience:",
          "Here's the optimized version:",
          "Here's the optimized text:",
          "Here's the optimized presentation:",
          "Here's the optimized experience:"
        ];

    // Eliminar cualquier aparición de frases no deseadas en cualquier parte del texto
    phrasesToRemove.forEach(phrase => {
      // Eliminar la frase aunque esté rodeada de espacios, saltos de línea, o en medio del texto
      const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      improvedText = improvedText.replace(regex, '').trim();
    });

    // Eliminar líneas vacías resultantes
    improvedText = improvedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');

    // Verificar que el texto mejorado mantiene el mismo idioma
    const improvedLanguage = detectLanguage(improvedText);
    if (improvedLanguage !== detectedLanguage) {
      console.warn('Language mismatch detected. Using original text.');
      return originalText;
    }

    return improvedText;
  } catch (error) {
    console.error('Error improving CV text:', error);
    throw error;
  }
}

/**
 * Extrae solo lo relevante de una job description para adaptar el CV
 * @param jobDescription - El texto completo de la job description
 * @param language - Idioma de la interfaz ('es' | 'en')
 * @returns Un resumen profesional y directo de lo relevante para el puesto
 */
export async function extractRelevantJobInfo(jobDescription: string, language: 'es' | 'en'): Promise<string> {
  if (!jobDescription.trim()) throw new Error('Job description is required');

  const systemPrompt = language === 'es'
    ? `Eres un experto en recursos humanos y selección de personal. Tu tarea es analizar la siguiente descripción de puesto y extraer SOLO lo relevante para el candidato: herramientas, tecnologías, requisitos excluyentes, responsabilidades clave y habilidades técnicas. NO incluyas beneficios, historia de la empresa, cultura, ni información irrelevante. Devuelve un resumen claro, profesional y directo, sin introducciones ni explicaciones, solo el texto relevante.`
    : `You are an expert in HR and recruitment. Your task is to analyze the following job description and extract ONLY what is relevant for the candidate: tools, technologies, must-have requirements, key responsibilities, and technical skills. DO NOT include benefits, company background, culture, or irrelevant information. Return a clear, professional, and direct summary, with no introductions or explanations, just the relevant text.`;

  const prompt = language === 'es'
    ? `Descripción del puesto:\n${jobDescription}\n\nDevuelve solo lo relevante para el candidato:`
    : `Job description:\n${jobDescription}\n\nReturn only what is relevant for the candidate:`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    model: 'llama3-70b-8192',
    temperature: 0.4,
    max_tokens: 800,
    top_p: 0.9,
    stream: false,
  });

  let relevantText = completion.choices[0]?.message?.content?.trim() || '';

  // Limpieza: eliminar posibles introducciones
  const phrasesToRemove = language === 'es'
    ? [
        'Resumen relevante:',
        'Información relevante:',
        'Solo lo relevante:',
        'Aquí tienes lo relevante:',
        'Extracto relevante:',
        'Lo relevante es:',
        'Resumen:',
        'Información clave:',
        'Puntos clave:',
        'Lo importante es:'
      ]
    : [
        'Relevant summary:',
        'Relevant information:',
        'Only the relevant:',
        'Here is what is relevant:',
        'Relevant extract:',
        'The relevant part is:',
        'Summary:',
        'Key information:',
        'Key points:',
        'What matters is:'
      ];
  phrasesToRemove.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    relevantText = relevantText.replace(regex, '').trim();
  });
  relevantText = relevantText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  return relevantText;
}

/**
 * Mejora el texto del usuario para el preview, fusionándolo con el contexto relevante del puesto
 * @param userText - El texto original del usuario (objetivo o experiencia)
 * @param jobContext - El resumen relevante extraído de la job description
 * @param type - 'presentation' | 'experience'
 * @param language - 'es' | 'en'
 * @returns El texto mejorado y alineado con el puesto
 */
export async function improveTextForPreview(userText: string, jobContext: string, type: 'presentation' | 'experience', language: 'es' | 'en'): Promise<string> {
  if (!userText.trim() || !jobContext.trim()) {
    throw new Error('Both user text and job context are required');
  }

  let systemPrompt = '';
  let prompt = '';

  if (language === 'es') {
    systemPrompt = `Eres un experto en redacción de CVs. Toma el siguiente ${type === 'presentation' ? 'objetivo profesional' : 'logro profesional'} del usuario y reescríbelo en un solo párrafo profesional, alineándolo con los requisitos y palabras clave relevantes del puesto (ver contexto). Integra las habilidades y experiencia del usuario con lo que busca la empresa, usando un lenguaje natural, profesional y sobrio. NO inventes, agregues ni exageres tecnologías, herramientas, habilidades, logros ni experiencia que el usuario no haya mencionado. No adornes ni infles el perfil. No copies literalmente el contexto ni repitas información. No incluyas introducciones ni explicaciones, solo devuelve el texto final mejorado.`;
    if (type === 'experience') {
      systemPrompt = `Eres un experto en redacción de CVs. Toma la siguiente descripción de experiencia laboral del usuario y reescríbela en un solo párrafo profesional, adaptándola al puesto y usando palabras clave relevantes del contexto. Usa un lenguaje profesional, realista y sobrio. NO inventes, agregues ni exageres tecnologías, herramientas, habilidades, logros ni experiencia que el usuario no haya mencionado. No adornes ni infles el perfil. No copies literalmente el contexto ni repitas información. No incluyas introducciones ni explicaciones, solo devuelve el texto final mejorado.`;
    }
    prompt = `${type === 'presentation' ? 'Objetivo del usuario' : 'Descripción del usuario'}:
${userText}

Contexto del puesto:
${jobContext}

Devuelve solo el texto final mejorado:`;
  } else {
    systemPrompt = `You are a professional CV writer. Take the following user's ${type === 'presentation' ? 'professional summary' : 'work achievement'} and rewrite it as a single professional paragraph, aligning it with the relevant requirements and keywords from the job context. Integrate the user's skills and experience with what the company is looking for, using natural, professional, and sober language. DO NOT invent, add, or exaggerate technologies, tools, skills, achievements, or experience that the user did not mention. Do not embellish or inflate the profile. Do not copy the context verbatim or repeat information. Do not include introductions or explanations, just return the final improved text.`;
    if (type === 'experience') {
      systemPrompt = `You are a professional CV writer. Take the following user's work experience description and rewrite it as a single professional paragraph, adapting it to the job and using relevant keywords from the context. Use professional, realistic, and sober language. DO NOT invent, add, or exaggerate technologies, tools, skills, achievements, or experience that the user did not mention. Do not embellish or inflate the profile. Do not copy the context verbatim or repeat information. Do not include introductions or explanations, just return the final improved text.`;
    }
    prompt = `${type === 'presentation' ? "User's summary" : "User's description"}:
${userText}

Job context:
${jobContext}

Return only the final improved text:`;
  }

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    model: 'llama3-70b-8192',
    temperature: 0.45,
    max_tokens: 700,
    top_p: 0.9,
    stream: false,
  });

  let improvedText = completion.choices[0]?.message?.content?.trim() || userText;

  // Limpieza: eliminar posibles introducciones
  const phrasesToRemove = language === 'es'
    ? [
        'Texto final mejorado:',
        'Versión mejorada:',
        'Aquí tienes el texto final:',
        'Texto mejorado:',
        'Párrafo mejorado:',
        'Presentación mejorada:',
        'Descripción mejorada:',
        'El texto mejorado es:',
        'La versión mejorada es:',
        'La presentación mejorada es:',
        'La descripción mejorada es:',
        'Mejora:',
        'Aquí tienes:',
        'Resultado:',
        'Respuesta:',
        'Texto:',
        'Final:',
      ]
    : [
        'Final improved text:',
        'Improved version:',
        'Here is the final text:',
        'Improved text:',
        'Enhanced text:',
        'Improved summary:',
        'Improved description:',
        'The improved text is:',
        'The improved version is:',
        'The improved summary is:',
        'The improved description is:',
        'Improvement:',
        'Here you go:',
        'Result:',
        'Answer:',
        'Text:',
        'Final:',
      ];
  phrasesToRemove.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    improvedText = improvedText.replace(regex, '').trim();
  });
  improvedText = improvedText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  return improvedText;
} 