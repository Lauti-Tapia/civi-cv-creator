import { NextResponse } from 'next/server';
import { extractRelevantJobInfo } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const { jobDescription, language } = await request.json();
    if (!jobDescription || !language) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    const relevantText = await extractRelevantJobInfo(jobDescription, language);
    return NextResponse.json({ relevantText });
  } catch (error) {
    console.error('Error in extract-job-info API:', error);
    return NextResponse.json(
      { error: 'Error extracting relevant job info' },
      { status: 500 }
    );
  }
} 