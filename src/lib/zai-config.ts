export interface ZaiConfig {
  apiKey: string
  baseUrl: string
  model: string
  maxTokens: number
  temperature: number
}

export const defaultZaiConfig: ZaiConfig = {
  apiKey: process.env.ZAI_API_KEY || '',
  baseUrl: process.env.ZAI_BASE_URL || 'https://api.z.ai/v1',
  model: process.env.ZAI_MODEL || 'zai-large',
  maxTokens: parseInt(process.env.ZAI_MAX_TOKENS || '1000'),
  temperature: parseFloat(process.env.ZAI_TEMPERATURE || '0.7')
}

export function getZaiConfig(): ZaiConfig {
  return {
    ...defaultZaiConfig,
    apiKey: process.env.ZAI_API_KEY || defaultZaiConfig.apiKey
  }
}