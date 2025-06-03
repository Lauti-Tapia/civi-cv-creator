import { NextResponse } from 'next/server';
import { improveCVText, improveTextForPreview } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const { originalText, jobDescription, type, jobContext, language } = await request.json();

    if (!originalText || !type) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Si se recibe jobContext y language, usar el flujo de preview inteligente
    if (jobContext && language) {
      const improvedText = await improveTextForPreview(originalText, jobContext, type, language);
      return NextResponse.json({ improvedText });
    }

    // Lógica anterior para mejora simple o adaptación a puesto
    const improvedText = await improveCVText(originalText, jobDescription || '', type, language || 'es');
    return NextResponse.json({ improvedText });
  } catch (error) {
    console.error('Error in improve-cv API:', error);
    return NextResponse.json(
      { error: 'Error improving CV text' },
      { status: 500 }
    );
  }
} 