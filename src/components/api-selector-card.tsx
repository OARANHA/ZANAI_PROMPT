import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Key, Server, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ApiConfig {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
  model: string;
  maxTokens: number;
  temperature: number;
  provider?: string;
  apiType?: string;
  description?: string;
}

const defaultConfigs: ApiConfig[] = [
  {
    id: 'mistral',
    name: 'Mistral AI (Padrão)',
    apiKey: 'aGIuNGBSGqHQfmEUXtjruDpGXK0hYdKN',
    baseUrl: 'https://api.mistral.ai/v1/',
    model: 'mistral-large-latest',
    maxTokens: 2000,
    temperature: 0.6,
    provider: 'mistral',
    apiType: 'sync',
    description: 'Configuração padrão do sistema com Mistral AI'
  },
  {
    id: 'default',
    name: 'Configuração Z.ai Original',
    apiKey: 'd56c89e3fdd24034bd228576e2f40fd5.zfVpIPTnS55T9qRE',
    baseUrl: 'https://api.z.ai/api/paas/v4/',
    model: 'glm-4',
    maxTokens: 2000,
    temperature: 0.6,
    provider: 'zai',
    apiType: 'sync',
    description: 'Configuração original do projeto Z.ai'
  },
  {
    id: 'alternative',
    name: 'Configuração BigModel',
    apiKey: 'ae05cfde6538494c9b66c87ef5b68439.BtCLj8iOsXqqDGbl',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4/',
    model: 'glm-4-flash',
    maxTokens: 2000,
    temperature: 0.6,
    provider: 'bigmodel',
    apiType: 'sync',
    description: 'Configuração alternativa com BigModel API'
  }
];

export function ApiSelectorCard() {
  const [selectedConfig, setSelectedConfig] = useState<ApiConfig>(defaultConfigs[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentConfig, setCurrentConfig] = useState<ApiConfig | null>(null);

  // Carregar configuração atual ao montar o componente
  useEffect(() => {
    loadCurrentConfig();
  }, []);

  const loadCurrentConfig = async () => {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const config = await response.json();
        setCurrentConfig(config);
        
        // Tentar encontrar uma configuração padrão que corresponda à atual
        const matchingConfig = defaultConfigs.find(c => 
          c.baseUrl === config.baseUrl && c.model === config.model
        );
        
        if (matchingConfig) {
          setSelectedConfig(matchingConfig);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configuração atual:', error);
    }
  };

  const saveConfig = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedConfig)
      });

      if (response.ok) {
        setSaveStatus('success');
        setCurrentConfig(selectedConfig);
        
        // Recarregar a página para forçar a atualização da configuração em todos os componentes
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfigChange = (configId: string) => {
    const config = defaultConfigs.find(c => c.id === configId);
    if (config) {
      setSelectedConfig(config);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Seletor de Configuração de API
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Configuração Predefinida:</label>
            <Select value={selectedConfig.id} onValueChange={handleConfigChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma configuração" />
              </SelectTrigger>
              <SelectContent>
                {defaultConfigs.map((config) => (
                  <SelectItem key={config.id} value={config.id}>
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      {config.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedConfig.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedConfig.description}
              </p>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-sm">Configuração Atual:</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-medium">Endpoint:</span>
                <p className="text-slate-600 dark:text-slate-400 break-all">
                  {selectedConfig.baseUrl}
                </p>
              </div>
              
              <div>
                <span className="font-medium">Modelo:</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    {selectedConfig.model}
                  </Badge>
                </div>
              </div>
              
              <div>
                <span className="font-medium">API Key:</span>
                <p className="text-slate-600 dark:text-slate-400 font-mono">
                  {selectedConfig.apiKey.substring(0, 20)}...
                </p>
              </div>
              
              <div>
                <span className="font-medium">Temperatura:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedConfig.temperature}
                </p>
              </div>
              
              <div>
                <span className="font-medium">Max Tokens:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedConfig.maxTokens}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={saveConfig}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  Aplicar Configuração
                </>
              )}
            </Button>
            
            {saveStatus === 'success' && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Configuração salva! Recarregando...
              </Badge>
            )}
            
            {saveStatus === 'error' && (
              <Badge variant="destructive">
                Erro ao salvar
              </Badge>
            )}
            
            {currentConfig && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Configuração atual: {currentConfig.provider === 'mistral' ? 'Mistral AI' : currentConfig.provider === 'bigmodel' ? 'BigModel' : 'Z.ai'}
              </div>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p><strong>Diferenças entre as configurações:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Mistral AI:</strong> Modelo mistral-large-latest, alta qualidade, endpoint próprio</li>
              <li><strong>Z.ai Original:</strong> Modelo glm-4, configuração original do projeto</li>
              <li><strong>BigModel:</strong> Modelo glm-4-flash, suporta modo assíncrono</li>
              <li>Cada provedor tem diferentes limites de uso e características</li>
              <li>O Mistral AI é a configuração padrão recomendada</li>
            </ul>
            <p className="mt-2 text-blue-600 dark:text-blue-400">
              <strong>Nota:</strong> Ao aplicar uma nova configuração, a página será recarregada para garantir que todas as alterações sejam aplicadas corretamente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}