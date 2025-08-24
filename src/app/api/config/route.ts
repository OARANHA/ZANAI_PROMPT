import { NextRequest, NextResponse } from 'next/server'

// Configuração das APIs
const API_CONFIG = {
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    key: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4'
  },
  bigmodel: {
    name: 'BigModel',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    key: process.env.BIGMODEL_API_KEY || '',
    model: 'glm-4'
  },
  mistral: {
    name: 'Mistral',
    baseUrl: 'https://api.mistral.ai/v1',
    key: process.env.MISTRAL_API_KEY || '',
    model: 'mistral-large-latest'
  },
  zai: {
    name: 'Z.ai',
    baseUrl: 'https://api.z.ai/v1',
    key: process.env.ZAI_API_KEY || '',
    model: 'zai-large'
  }
}

// Função para verificar status de uma API
async function checkApiStatus(apiName: keyof typeof API_CONFIG) {
  const config = API_CONFIG[apiName]
  
  if (!config.key) {
    return {
      name: config.name,
      available: false,
      error: 'Chave API não configurada'
    }
  }

  try {
    const startTime = Date.now()
    
    // Tenta fazer uma requisição simples para verificar se a API está respondendo
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1
      })
    })

    const latency = Date.now() - startTime

    if (response.ok) {
      return {
        name: config.name,
        available: true,
        latency
      }
    } else {
      return {
        name: config.name,
        available: false,
        error: `HTTP ${response.status}`
      }
    }
  } catch (error) {
    return {
      name: config.name,
      available: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verifica status de todas as APIs em paralelo
    const apiPromises = Object.keys(API_CONFIG).map(apiName => 
      checkApiStatus(apiName as keyof typeof API_CONFIG)
    )
    
    const apis = await Promise.all(apiPromises)
    
    return NextResponse.json({
      success: true,
      apis,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno',
      apis: []
    }, { status: 500 })
  }
}