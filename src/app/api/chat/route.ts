import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/constants';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
          const { messages, categoryId } = await request.json();

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const chat = model.startChat({
              history: messages.slice(0, -1).map((msg: any) => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }],
              })),
              generationConfig: {
                        temperature: 0.7,
                        topP: 0.95,
                        maxOutputTokens: 8192,
              },
              systemInstruction: `${SYSTEM_PROMPT}\n\n現在の相談カテゴリID: ${categoryId}`,
      });

      const lastMessage = messages[messages.length - 1];
          const result = await chat.sendMessage(lastMessage.content);
          const response = await result.response;
          const text = response.text();

      return NextResponse.json({ text });
    } catch (error) {
          console.error('Gemini API Error:', error);
          return NextResponse.json(
            { error: '通信エラーが発生しました。時間を置いて再度お試しください。' },
            { status: 500 }
                );
    }
}
