import { NextResponse } from 'next/server';
import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const chatStreamResponse = await client.chatStream({
      model: 'mistral-tiny',
      messages: [{ role: 'user', content: prompt }],
    });

    let messageString = '';

    for await (const chunk of chatStreamResponse) {
      if (chunk.choices[0].delta.content !== undefined) {
        messageString += chunk.choices[0].delta.content;
      }
    }

    const cleanMessageString = messageString
      .replace(/(\d+\.\s*)|["]/g, '')  // Remove numbers and quotes
      .trim();

    return NextResponse.json({ message: cleanMessageString });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch suggested messages' },
      { status: 500 }
    );
  }
}
