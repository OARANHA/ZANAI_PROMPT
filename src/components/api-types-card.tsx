import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, Key, Zap, Shield, BarChart3, Users, Clock, RefreshCw, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function ApiTypesCard() {
  const [selectedApiProvider, setSelectedApiProvider] = useState<'zai' | 'bigmodel' | 'mistral'>('mistral');
  const [selectedApiType, setSelectedApiType] = useState<'sync' | 'async'>('sync');
  const [selectedApiKey, setSelectedApiKey] = useState<'default' | 'alternative'>('default');
  const [isApplying, setIsApplying] = useState(false);
  const [applyStatus, setApplyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const apiConfigs = {
    zai: {
      default: {
        key: 'd56c89e3fdd24034bd228576e2f40fd5.zfVpIPTnS55T9qRE',
        name: 'Chave Z.ai Padrão',
        description: 'Configuração original Z.ai',
        baseUrl: 'https://api.z.ai/api/paas/v4/',
        model: 'glm-4.5-flash'
      },
      alternative: {
        key: 'ae05cfde6538494c9b66c87ef5b68439.BtCLj8iOsXqqDGbl',
        name: 'Chave Z.ai Alternativa',
        description: 'Nova chave Z.ai fornecida',
        baseUrl: 'https://api.z.ai/api/paas/v4/',
        model: 'glm-4.5-flash'
      }
    },
    bigmodel: {
      default: {
        key: 'ae05cfde6538494c9b66c87ef5b68439.BtCLj8iOsXqqDGbl',
        name: 'Chave BigModel',
        description: 'Chave da API BigModel (智谱AI)',
        baseUrl: 'https://open.bigmodel.cn/api/paas/v4/',
        model: 'glm-4-flash'
      }
    },
    mistral: {
      default: {
        key: 'aGIuNGBSGqHQfmEUXtjruDpGXK0hYdKN',
        name: 'Chave Mistral',
        description: 'Chave da API Mistral AI',
        baseUrl: 'https://api.mistral.ai/v1/',
        model: 'mistral-large-latest'
      }
    }
  };

  const applyApiSettings = async () => {
    setIsApplying(true);
    setApplyStatus('idle');
    
    try {
      const config = {
        apiKey: apiConfigs[selectedApiProvider][selectedApiKey].key,
        baseUrl: apiConfigs[selectedApiProvider][selectedApiKey].baseUrl,
        model: apiConfigs[selectedApiProvider][selectedApiKey].model,
        maxTokens: 2000,
        temperature: 0.6,
        provider: selectedApiProvider,
        apiType: selectedApiType
      };

      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        setApplyStatus('success');
        setTimeout(() => setApplyStatus('idle'), 3000);
      } else {
        setApplyStatus('error');
        setTimeout(() => setApplyStatus('idle'), 3000);
      }
    } catch (error) {
      setApplyStatus('error');
      setTimeout(() => setApplyStatus('idle'), 3000);
    } finally {
      setIsApplying(false);
    }
  };

  const getAvailableKeys = () => {
    if (selectedApiProvider === 'zai') {
      return [
        { id: 'default', name: 'Chave Padrão' },
        { id: 'alternative', name: 'Chave Alternativa' }
      ];
    } else {
      return [
        { id: 'default', name: `Chave ${selectedApiProvider === 'bigmodel' ? 'BigModel' : 'Mistral'}` }
      ];
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          Tipos de API e Seleção de Chave
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="providers" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="providers">Provedores</TabsTrigger>
            <TabsTrigger value="api-types">Tipos de API</TabsTrigger>
            <TabsTrigger value="key-selection">Seleção</TabsTrigger>
            <TabsTrigger value="comparison">Comparação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="providers" className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Selecione o Provedor de API</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedApiProvider === 'zai' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedApiProvider('zai')}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h5 className="font-medium">Z.ai API</h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    API da Z.ai com modelo glm-4.5-flash. Ideal para desenvolvimento geral e prototipagem.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary" className="text-xs">glm-4.5-flash</Badge>
                    <Badge variant="outline" className="text-xs">Síncrona</Badge>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedApiProvider === 'bigmodel' 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                  onClick={() => {
                    setSelectedApiProvider('bigmodel');
                    setSelectedApiKey('default');
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h5 className="font-medium">BigModel API</h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    API da BigModel (智谱AI) com modelo glm-4-flash. Suporta síncrono e assíncrono.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary" className="text-xs">glm-4-flash</Badge>
                    <Badge variant="outline" className="text-xs">Síncrona</Badge>
                    <Badge variant="outline" className="text-xs">Assíncrona</Badge>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedApiProvider === 'mistral' 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                  onClick={() => {
                    setSelectedApiProvider('mistral');
                    setSelectedApiKey('default');
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <h5 className="font-medium">Mistral AI</h5>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">Padrão</Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    API da Mistral AI com modelo mistral-large-latest. Alta performance e capacidade.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary" className="text-xs">mistral-large-latest</Badge>
                    <Badge variant="outline" className="text-xs">Síncrona</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Provedor selecionado:</strong> {
                    selectedApiProvider === 'zai' ? 'Z.ai API' : 
                    selectedApiProvider === 'bigmodel' ? 'BigModel API (智谱AI)' : 
                    'Mistral AI'
                  }
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api-types" className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Diferenças Entre API Síncrona e Assíncrona
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <h5 className="font-medium text-sm">API Síncrona</h5>
                    <Badge variant="outline" className="text-xs">Todos</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <p>Resposta imediata em uma única requisição</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <p>Ideal para interações em tempo real</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <p>Simples de implementar e usar</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-3 h-3 mt-0.5 text-yellow-600 flex-shrink-0" />
                      <p>Pode ter limites de concorrência mais restritos</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-purple-600" />
                    <h5 className="font-medium text-sm">API Assíncrona</h5>
                    <Badge variant="outline" className="text-xs">BigModel</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <p>Processamento em segundo plano</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <p>Melhor para tarefas longas e complexas</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <p>Limites de concorrência geralmente mais altos</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-3 h-3 mt-0.5 text-yellow-600 flex-shrink-0" />
                      <p>Requer polling para obter resultados</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Nota:</strong> A API Assíncrona está disponível apenas no provedor BigModel. 
                  Este projeto atualmente utiliza a API Síncrona para maior simplicidade e resposta imediata.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="key-selection" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Selecione o Tipo de API</h4>
                <Select value={selectedApiType} onValueChange={(value: 'sync' | 'async') => setSelectedApiType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo de API" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sync">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        API Síncrona (Recomendado)
                      </div>
                    </SelectItem>
                    <SelectItem value="async" disabled={selectedApiProvider !== 'bigmodel'}>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        API Assíncrona {selectedApiProvider !== 'bigmodel' && '(Apenas BigModel)'}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Selecione a Chave de API</h4>
                <Select value={selectedApiKey} onValueChange={(value: 'default' | 'alternative') => setSelectedApiKey(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a chave de API" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableKeys().map((key) => (
                      <SelectItem key={key.id} value={key.id}>
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          {key.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-3 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Chave selecionada:</span>
                    <p className="text-slate-600 dark:text-slate-400 font-mono text-xs">
                      {apiConfigs[selectedApiProvider][selectedApiKey].key.substring(0, 20)}...
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {apiConfigs[selectedApiProvider][selectedApiKey].description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {apiConfigs[selectedApiProvider][selectedApiKey].model}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedApiProvider === 'zai' ? 'Z.ai' : selectedApiProvider === 'bigmodel' ? 'BigModel' : 'Mistral'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={applyApiSettings}
                  disabled={isApplying}
                  className="flex items-center gap-2"
                >
                  {isApplying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Aplicando...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      Aplicar Configuração
                    </>
                  )}
                </Button>
                
                {applyStatus === 'success' && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Configuração aplicada!
                  </Badge>
                )}
                
                {applyStatus === 'error' && (
                  <Badge variant="destructive">
                    Erro ao aplicar
                  </Badge>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Comparação Detalhada</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-2">Característica</th>
                      <th className="text-left p-2">Z.ai API</th>
                      <th className="text-left p-2">BigModel API</th>
                      <th className="text-left p-2">Mistral AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-2 font-medium">Modelo</td>
                      <td className="p-2">glm-4.5-flash</td>
                      <td className="p-2">glm-4-flash</td>
                      <td className="p-2">mistral-large-latest</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-2 font-medium">API Síncrona</td>
                      <td className="p-2">✓ Suportada</td>
                      <td className="p-2">✓ Suportada</td>
                      <td className="p-2">✓ Suportada</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-2 font-medium">API Assíncrona</td>
                      <td className="p-2">✗ Não suportada</td>
                      <td className="p-2">✓ Suportada</td>
                      <td className="p-2">✗ Não suportada</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-2 font-medium">Endpoint</td>
                      <td className="p-2">api.z.ai</td>
                      <td className="p-2">open.bigmodel.cn</td>
                      <td className="p-2">api.mistral.ai</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-2 font-medium">Status</td>
                      <td className="p-2">Disponível</td>
                      <td className="p-2">Disponível</td>
                      <td className="p-2">Padrão ✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                  <h5 className="font-medium text-sm mb-1 text-blue-800 dark:text-blue-200">
                    Vantagens Z.ai API
                  </h5>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Modelo mais recente (glm-4.5-flash)</li>
                    <li>• Implementação simplificada</li>
                    <li>• Ideal para desenvolvimento rápido</li>
                    <li>• Configuração com múltiplas chaves</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                  <h5 className="font-medium text-sm mb-1 text-green-800 dark:text-green-200">
                    Vantagens BigModel API
                  </h5>
                  <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                    <li>• Suporte a API assíncrona</li>
                    <li>• Provedor estabelecido (智谱AI)</li>
                    <li>• Melhor para tarefas longas</li>
                    <li>• Limites possivelmente mais altos</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-3 rounded-lg">
                  <h5 className="font-medium text-sm mb-1 text-purple-800 dark:text-purple-200">
                    Vantagens Mistral AI
                  </h5>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Modelo de alta performance</li>
                    <li>• Excelente capacidade de raciocínio</li>
                    <li>• Respostas rápidas e precisas</li>
                    <li>• Configuração padrão do sistema</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}