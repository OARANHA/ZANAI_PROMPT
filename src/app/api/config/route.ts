import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ZAIConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  maxTokens: number;
  temperature: number;
  provider?: string;
  apiType?: string;
}

function loadZAIConfig(): ZAIConfig {
  try {
    const configPath = path.join(process.cwd(), '.z-ai-config');
    const configData = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Erro ao carregar configuração .z-ai-config:', error);
    // Fallback para configuração padrão (Mistral AI)
    return {
      apiKey: 'aGIuNGBSGqHQfmEUXtjruDpGXK0hYdKN',
      baseUrl: 'https://api.mistral.ai/v1/',
      model: 'mistral-large-latest',
      maxTokens: 2000,
      temperature: 0.6,
      provider: 'mistral',
      apiType: 'sync'
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const config = loadZAIConfig();
    
    // Não retornar a API key completa por segurança
    const safeConfig = {
      ...config,
      apiKey: config.apiKey.substring(0, 20) + '...'
    };

    return NextResponse.json(safeConfig);
  } catch (error) {
    console.error('Erro ao obter configuração:', error);
    return NextResponse.json(
      { error: 'Erro ao obter configuração' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newConfig = await request.json();
    
    // Validar os campos necessários
    const requiredFields = ['apiKey', 'baseUrl', 'model', 'maxTokens', 'temperature'];
    for (const field of requiredFields) {
      if (!newConfig[field]) {
        return NextResponse.json(
          { error: `Campo obrigatório ausente: ${field}` },
          { status: 400 }
        );
      }
    }

    // Salvar a nova configuração
    const configPath = path.join(process.cwd(), '.z-ai-config');
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));

    // Retornar a configuração salva (com API key mascarada)
    const safeConfig = {
      ...newConfig,
      apiKey: newConfig.apiKey.substring(0, 20) + '...'
    };

    return NextResponse.json(safeConfig);
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar configuração' },
      { status: 500 }
    );
  }
}