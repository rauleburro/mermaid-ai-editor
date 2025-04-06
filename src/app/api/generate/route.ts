import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY || typeof GEMINI_API_KEY !== 'string') {
  throw new Error('GEMINI_API_KEY is not defined or not a string in environment variables.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

interface GenerateRequestBody {
  prompt: string;
}

export async function POST(request: Request) {
  try {
    const body: GenerateRequestBody = await request.json();
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: "Missing or invalid 'prompt' in request body" }, { status: 400 });
    }

    console.log('Received prompt on backend. Sending to Gemini...');

    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = response.text();

    if (!generatedText) {
      console.error('Gemini API returned an empty response.');
      return NextResponse.json({ error: 'AI failed to generate a response.' }, { status: 500 });
    }

    console.log('Gemini Response Text:', generatedText);

    const cleanedMermaidCode = generatedText.replace(/^```mermaid\n?|\n?```$/g, '').trim();

    return new Response(cleanedMermaidCode, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error: unknown) {
    console.error('Error during Gemini API call or processing:', error);

    let message = 'Unknown error calling AI';
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: `Internal Server Error: ${message}` }, { status: 500 });
  }
}

export const runtime = 'edge';
