import { NextRequest, NextResponse } from 'next/server'

// Mock data para fallback quando APIs não estão disponíveis
const MOCK_RESPONSES: Record<string, string> = {
  contexto: `Empresa do agronegócio especializada em insumos agrícolas, com foco em agricultores e cooperativas. Ambiente digital em crescimento, necessidade de educar o mercado sobre novos produtos e tecnologias.`,
  papel: `Gerente de conteúdo sênior especializado em mídias sociais para agronegócio, responsável por estratégia de conteúdo, gestão de sub-agentes (Instagram e blog) e análise de métricas de engajamento.`,
  tarefas: `- Gerenciar sub-agente de Instagram: 3 posts/semana + stories diários
- Gerenciar sub-agente de blog: 2 artigos/semana sobre técnicas de cultivo
- Analisar métricas de engajamento e conversão mensalmente
- Desenvolver estratégia de conteúdo educativo para produtos agrícolas`,
  ferramentas: `Meta Business Suite, WordPress, Google Analytics, Canva, SEMrush, Ferramentas de design gráfico, Plataformas de agendamento`,
  tom_de_voz: `Técnico-didático com linguagem acessível ao produtor rural, usando analogias práticas do campo, mantendo profissionalismo e clareza.`,
  exemplos: `1. Campanha sobre adubação orgânica: Posts no Instagram mostrando antes/depois, artigo no blog explicando benefícios científicos
2. Série sobre pragas: Stories diárias com dicas rápidas, artigo completo com métodos de controle integrado
3. Lançamento de novo fertilizante: Vídeos demonstrativos, depoimentos de agricultores, artigo técnico com resultados`,
  arquitetura_agente: `<sub-agente nome="Instagram_Content" tipo="content_creator">
  <responsabilidade>Criar 3 posts semanais + stories diários</responsabilidade>
  <plataforma>Instagram Business Suite</plataforma>
</sub-agente>
<sub-agente nome="Blog_Content" tipo="content_writer">
  <responsabilidade>Produzir 2 artigos técnicos semanais</responsabilidade>
  <plataforma>WordPress</plataforma>
</sub-agente>`
}

// Configuração das APIs
const APIS = {
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    key: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`
    }
  },
  bigmodel: {
    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    key: process.env.BIGMODEL_API_KEY || '',
    model: 'glm-4',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BIGMODEL_API_KEY || ''}`
    }
  },
  mistral: {
    url: 'https://api.mistral.ai/v1/chat/completions',
    key: process.env.MISTRAL_API_KEY || '',
    model: 'mistral-large-latest',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MISTRAL_API_KEY || ''}`
    }
  },
  zai: {
    url: 'https://api.z.ai/v1/chat/completions',
    key: process.env.ZAI_API_KEY || '',
    model: 'zai-large',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ZAI_API_KEY || ''}`
    }
  }
}

// Função para tentar gerar conteúdo com uma API específica
async function generateWithApi(apiName: keyof typeof APIS, systemPrompt: string, userPrompt: string) {
  const api = APIS[apiName]
  
  if (!api.key) {
    throw new Error(`Chave da API ${apiName} não configurada`)
  }

  try {
    const response = await fetch(api.url, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify({
        model: api.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error(`API ${apiName} retornou status ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  } catch (error) {
    throw new Error(`Erro na API ${apiName}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
}

// Função principal que tenta múltiplas APIs em ordem
async function generateContent(instruction: string, section: string, previousContent: string) {
  const systemPrompt = `Você é um engenheiro de prompts sênior especializado em criar agentes de IA de alta qualidade.

Com base na instrução inicial e no conteúdo das seções anteriores, gere APENAS o conteúdo para a seção <${section}>.

Regras importantes:
1. Responda APENAS com o conteúdo da seção, sem incluir tags XML
2. Seja específico, detalhado e profissional
3. Inclua exemplos práticos quando relevante
4. Mantenha coerência com o conteúdo anterior
5. Use linguagem adequada para um agente de nível sênior

Instrução inicial: ${instruction}

Conteúdo anterior: ${previousContent}`

  const userPrompt = `Gere o conteúdo para a seção ${section} com base na instrução fornecida.`

  // Lista de APIs para tentar em ordem
  const apiOrder: (keyof typeof APIS)[] = ['openai', 'bigmodel', 'mistral', 'zai']
  
  let lastError = ''
  
  // Tenta cada API em ordem
  for (const apiName of apiOrder) {
    try {
      const content = await generateWithApi(apiName, systemPrompt, userPrompt)
      if (content && content.trim()) {
        return { success: true, content, api: apiName }
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Erro desconhecido'
      console.warn(`Falha na API ${apiName}:`, lastError)
      continue
    }
  }
  
  // Se todas as APIs falharem, retorna mock data
  console.warn('Todas as APIs falharam, usando dados mock')
  const mockContent = MOCK_RESPONSES[section] || `Conteúdo gerado para a seção ${section}.`
  
  return { 
    success: true, 
    content: mockContent, 
    api: 'mock',
    warning: 'Usando dados de demonstração - APIs indisponíveis'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { instruction, section, previous_content = '' } = body

    if (!instruction || !section) {
      return NextResponse.json({
        success: false,
        error: 'Parâmetros obrigatórios ausentes: instruction e section'
      }, { status: 400 })
    }

    // Validação básica dos parâmetros
    if (typeof instruction !== 'string' || typeof section !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Parâmetros inválidos'
      }, { status: 400 })
    }

    // Gera o conteúdo usando múltiplas APIs com fallback
    const result = await generateContent(instruction, section, previous_content)

    return NextResponse.json({
      success: true,
      content: result.content,
      api: result.api,
      warning: result.warning,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erro na API de geração de prompt:', error)
    
    // Extrai a seção do corpo da requisição para fallback
    let section = 'contexto'
    try {
      const body = await request.clone().json()
      section = body.section || 'contexto'
    } catch {
      // Usa valor padrão se não conseguir ler o corpo
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      content: MOCK_RESPONSES[section] || 'Conteúdo não disponível.'
    }, { status: 500 })
  }
}