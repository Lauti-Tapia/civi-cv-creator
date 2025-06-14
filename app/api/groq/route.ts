import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;
let groq: Groq | null = null;
if (apiKey) {
  groq = new Groq({ apiKey });
} else {
  console.error("GROQ_API_KEY is not defined in environment variables");
}

export async function POST(req: NextRequest) {
  try {
    if (!groq) {
      return NextResponse.json({ error: "GROQ API key not configured" }, { status: 500 });
    }
    const { prompt, language } = await req.json();
    const systemPrompt = language === "es"
      ? "Eres un experto en creación de CVs y asesoría de carrera. Genera contenido profesional y relevante para CVs en español."
      : "You are an expert in CV creation and career advice. Generate professional and relevant content for CVs in English.";

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const content = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ result: content });
  } catch (error) {
    console.error("Error in Groq API Route:", error);
    return NextResponse.json({ error: "Error generating content" }, { status: 500 });
  }
} 