export interface ApiConfig {
  openai: {
    apiKey: string
    model: string
    baseUrl: string
  }
  bigmodel: {
    apiKey: string
    model: string
    baseUrl: string
  }
  mistral: {
    apiKey: string
    model: string
    baseUrl: string
  }
  zai: {
    apiKey: string
    model: string
    baseUrl: string
  }
}

export const defaultApiConfig: ApiConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
    baseUrl: 'https://api.openai.com/v1'
  },
  bigmodel: {
    apiKey: process.env.BIGMODEL_API_KEY || '',
    model: 'glm-4',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4'
  },
  mistral: {
    apiKey: process.env.MISTRAL_API_KEY || '',
    model: 'mistral-large-latest',
    baseUrl: 'https://api.mistral.ai/v1'
  },
  zai: {
    apiKey: process.env.ZAI_API_KEY || '',
    model: 'zai-large',
    baseUrl: 'https://api.z.ai/v1'
  }
}

export function getApiConfig(): ApiConfig {
  return defaultApiConfig
}