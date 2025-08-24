import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function GET() {
  try {
    const zai = await ZAI.create();
    
    // Pesquisar informações sobre a API da BigModel
    const searchResult = await zai.functions.invoke("web_search", {
      query: "BigModel API types synchronous asynchronous chat completion difference",
      num: 5
    });

    return NextResponse.json({ 
      success: true, 
      data: searchResult 
    });
  } catch (error) {
    console.error('Error searching BigModel info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search BigModel information' },
      { status: 500 }
    );
  }
}