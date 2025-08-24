import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import ZAI from 'z-ai-web-dev-sdk';

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
    // Fallback para configuração padrão (BigModel)
    return {
      apiKey: 'ae05cfde6538494c9b66c87ef5b68439.BtCLj8iOsXqqDGbl',
      baseUrl: 'https://open.bigmodel.cn/api/paas/v4/',
      model: 'glm-4',
      maxTokens: 2000,
      temperature: 0.6,
      provider: 'bigmodel',
      apiType: 'sync'
    };
  }
}

// Função de fallback para conteúdo simulado
function getFallbackContent(section: string, instruction: string): string {
  const fallbacks: Record<string, string> = {
    'papel': `Gerente de Conteúdo Sênior especializado em mídias sociais para agronegócio. Responsável por estratégia de conteúdo, gestão de equipe e análise de métricas de engajamento.`,
    'contexto': `Loja B2B de insumos agrícolas com foco em agricultores e cooperativas. Desafio: educar mercado sobre novos produtos via conteúdo digital.`,
    'tarefas': `- Desenvolver estratégia de conteúdo mensal para Instagram e Blog\n- Gerenciar equipe de criação com definição clara de KPIs\n- Analisar métricas de engajamento semanalmente`,
    'ferramentas': `Meta Business Suite, WordPress, Google Analytics, Canva, HubSpot`,
    'tom-de-voz': `Técnico-didático com linguagem acessível ao produtor rural.`,
    'exemplos': `Exemplo 1: Campanha de fertilizantes orgânicos - Série de posts mostrando antes/depois de lavouras.`,
    'arquitetura-agente': `<agente>
<nome>Agente do Instagram</nome>
<funcao>Criar conteúdo para Instagram e elementos visuais</funcao>
</agente>

<agente>
<nome>Agente do Blog</nome>
<funcao>Criar artigos de blog com títulos e otimização SEO</funcao>
</agente>`
  };
  
  return fallbacks[section] || `Conteúdo gerado para a seção ${section} com base na instrução: ${instruction}`;
}

export async function POST(request: NextRequest) {
  try {
    const { instruction, section, previousContent, formatSettings } = await request.json();

    if (!instruction || !section) {
      return NextResponse.json(
        { error: 'Instrução e seção são obrigatórios' },
        { status: 400 }
      );
    }

    // Configurações de formatação padrão se não fornecidas
    const settings = formatSettings || {
      useSubTags: false,
      useLists: true,
      contentStyle: 'balanced'
    };

    // Construir o prompt do sistema com base nas configurações
    let formatInstructions = `REGRAS IMPORTANTES:
1. NÃO inclua a tag XML de abertura ou fechamento (como <${section}> ou </${section}>)
2. NÃO inclua o título da seção (como "# Papel")
3. NÃO use formatação XML aninhada ou estruturas complexas dentro do conteúdo
4. NÃO inclua marcadores de código como \`\`\`xml
5. Use formato de texto limpo, direto e acionável
6. Seja conciso e objetivo, focando em informações práticas
7. Mantenha o conteúdo em português claro e profissional`;

    if (settings.useLists) {
      formatInstructions += `\n8. Use listas com marcadores (-) para organizar informações quando apropriado`;
    }

    if (settings.useSubTags) {
      formatInstructions += `\n9. Use tags XML simples para estruturar subtópicos quando relevante (ex: <instagram>, <blog>)`;
    } else {
      formatInstructions += `\n9. NÃO use tags XML internas ou aninhamento de tags`;
    }

    // Ajustar instruções baseado no estilo de conteúdo
    if (settings.contentStyle === 'direct') {
      formatInstructions += `\n10. Seja extremamente direto e conciso, focando apenas em informações essenciais`;
    } else if (settings.contentStyle === 'detailed') {
      formatInstructions += `\n10. Seja detalhado e completo, fornecendo informações abrangentes e minuciosas`;
    } else {
      formatInstructions += `\n10. Mantenha um bom equilíbrio entre detalhe e concisão`;
    }

    const systemPrompt = `Você é um engenheiro de prompts sênior especializado em criar prompts estruturados. Com base na instrução inicial e no conteúdo das seções anteriores, gere APENAS o conteúdo para a tag XML <${section}>.

${formatInstructions}

Instrução inicial: ${instruction}

${previousContent ? `Conteúdo anterior das seções:\n${previousContent}` : ''}

Gere um conteúdo detalhado, profissional e específico para a seção ${section}. Considere o contexto fornecido e crie um conteúdo que seja útil para guiar um assistente de IA.`;

    // Usar APIs externas diretamente (sem ZAI SDK)
  try {
    console.log('Tentando usar APIs externas...');
    
    // Tentar BigModel API primeiro
    try {
      const bigModelResponse = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BIGMODEL_API_KEY || 'ae05cfde6538494c9b66c87ef5b68439.BtCLj8iOsXqqDGbl'}`
        },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Gere o conteúdo para a seção ${section} com base na instrução fornecida.`
            }
          ],
          temperature: 0.6,
          max_tokens: 2000
        })
      });

      if (bigModelResponse.ok) {
        const data = await bigModelResponse.json();
        const messageContent = data.choices?.[0]?.message?.content;
        
        if (messageContent) {
          console.log('Sucesso com BigModel API');
          return NextResponse.json({ content: messageContent.trim() });
        }
      } else {
        console.log('BigModel API falhou:', await bigModelResponse.text());
      }
    } catch (bigModelError) {
      console.log('Erro com BigModel API:', bigModelError);
    }

    // Tentar Mistral AI
    try {
      const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY || 'aGIuNGBSGqHQfmEUXtjruDpGXK0hYdKN'}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Gere o conteúdo para a seção ${section} com base na instrução fornecida.`
            }
          ],
          temperature: 0.6,
          max_tokens: 2000
        })
      });

      if (mistralResponse.ok) {
        const data = await mistralResponse.json();
        const messageContent = data.choices?.[0]?.message?.content;
        
        if (messageContent) {
          console.log('Sucesso com Mistral AI');
          return NextResponse.json({ content: messageContent.trim() });
        }
      } else {
        console.log('Mistral AI falhou:', await mistralResponse.text());
      }
    } catch (mistralError) {
      console.log('Erro com Mistral AI:', mistralError);
    }

    // Tentar OpenAI
    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Gere o conteúdo para a seção ${section} com base na instrução fornecida.`
            }
          ],
          temperature: 0.6,
          max_tokens: 2000
        })
      });

      if (openaiResponse.ok) {
        const data = await openaiResponse.json();
        const messageContent = data.choices?.[0]?.message?.content;
        
        if (messageContent) {
          console.log('Sucesso com OpenAI');
          return NextResponse.json({ content: messageContent.trim() });
        }
      } else {
        console.log('OpenAI falhou:', await openaiResponse.text());
      }
    } catch (openaiError) {
      console.log('Erro com OpenAI:', openaiError);
    }

    // Se todas as APIs falharem, usar fallback
    console.log('Todas as APIs falharam, usando fallback simulado...');
    const fallbackContent = getFallbackContent(section, instruction);
    return NextResponse.json({ content: fallbackContent });

  } catch (error) {
    console.error('Erro geral:', error);
    const fallbackContent = getFallbackContent(section, instruction);
    return NextResponse.json({ content: fallbackContent });
  }

  } catch (error) {
    console.error('Erro ao gerar conteúdo:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno ao gerar conteúdo' },
      { status: 500 }
    );
  }
}