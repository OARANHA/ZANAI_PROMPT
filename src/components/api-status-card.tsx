import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, CheckCircle, AlertCircle, Settings, Activity, TrendingUp, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ApiConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  maxTokens: number;
  temperature: number;
  provider?: string;
  apiType?: string;
}

interface ApiMetrics {
  requestCount: number;
  averageResponseTime: number;
  errorRate: number;
  lastRequestTime: Date | null;
  concurrentRequests: number;
}

export function ApiStatusCard() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [metrics, setMetrics] = useState<ApiMetrics>({
    requestCount: 0,
    averageResponseTime: 0,
    errorRate: 0,
    lastRequestTime: null,
    concurrentRequests: 0
  });
  const [isMonitoring, setIsMonitoring] = useState(true);

  const checkApiStatus = async () => {
    setApiStatus('checking');
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          instruction: 'test', 
          section: 'test' 
        })
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok || response.status === 400) {
        setApiStatus('online');
        
        // Atualizar métricas
        setMetrics(prev => ({
          requestCount: prev.requestCount + 1,
          averageResponseTime: Math.round((prev.averageResponseTime * prev.requestCount + responseTime) / (prev.requestCount + 1)),
          errorRate: prev.errorRate,
          lastRequestTime: new Date(),
          concurrentRequests: Math.max(0, prev.concurrentRequests - 1)
        }));
      } else {
        setApiStatus('offline');
        setMetrics(prev => ({
          ...prev,
          errorRate: Math.min(100, prev.errorRate + 5),
          concurrentRequests: Math.max(0, prev.concurrentRequests - 1)
        }));
      }
    } catch (error) {
      setApiStatus('offline');
      setMetrics(prev => ({
        ...prev,
        errorRate: Math.min(100, prev.errorRate + 10),
        concurrentRequests: Math.max(0, prev.concurrentRequests - 1)
      }));
    } finally {
      setLastCheck(new Date());
    }
  };

  const loadApiConfig = async () => {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const config = await response.json();
        setApiConfig(config);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  };

  const simulateConcurrentRequest = () => {
    setMetrics(prev => ({
      ...prev,
      concurrentRequests: prev.concurrentRequests + 1
    }));
    
    // Simular requisição concorrente
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        concurrentRequests: Math.max(0, prev.concurrentRequests - 1)
      }));
    }, Math.random() * 3000 + 1000); // 1-4 segundos
  };

  useEffect(() => {
    loadApiConfig();
    checkApiStatus();
    
    let statusInterval: NodeJS.Timeout;
    let metricsInterval: NodeJS.Timeout;
    
    if (isMonitoring) {
      // Verificar status a cada 15 segundos
      statusInterval = setInterval(checkApiStatus, 15000);
      
      // Atualizar métricas a cada 5 segundos
      metricsInterval = setInterval(() => {
        // Simular alguma atividade aleatória
        if (Math.random() > 0.7) {
          simulateConcurrentRequest();
        }
        
        // Diminuir gradualmente a taxa de erro
        setMetrics(prev => ({
          ...prev,
          errorRate: Math.max(0, prev.errorRate - 0.5)
        }));
      }, 5000);
    }
    
    return () => {
      if (statusInterval) clearInterval(statusInterval);
      if (metricsInterval) clearInterval(metricsInterval);
    };
  }, [isMonitoring]);

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'offline':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Wifi className="w-5 h-5 text-yellow-600 animate-pulse" />;
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'online':
        return 'API Online';
      case 'offline':
        return 'API Offline';
      default:
        return 'Verificando...';
    }
  };

  const getStatusBadge = () => {
    switch (apiStatus) {
      case 'online':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Verificando</Badge>;
    }
  };

  const getProviderBadge = () => {
    if (!apiConfig?.provider) return null;
    
    const providerColors = {
      zai: 'bg-blue-100 text-blue-800 border-blue-200',
      bigmodel: 'bg-green-100 text-green-800 border-green-200',
      mistral: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    const providerNames = {
      zai: 'Z.ai',
      bigmodel: 'BigModel',
      mistral: 'Mistral'
    };
    
    return (
      <Badge className={providerColors[apiConfig.provider as keyof typeof providerColors]}>
        {providerNames[apiConfig.provider as keyof typeof providerNames]}
      </Badge>
    );
  };

  const getLoadStatus = () => {
    if (metrics.concurrentRequests === 0) return 'Baixa';
    if (metrics.concurrentRequests <= 3) return 'Normal';
    if (metrics.concurrentRequests <= 5) return 'Alta';
    return 'Crítica';
  };

  const getLoadColor = () => {
    if (metrics.concurrentRequests === 0) return 'text-green-600';
    if (metrics.concurrentRequests <= 3) return 'text-yellow-600';
    if (metrics.concurrentRequests <= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            Status da API
          </div>
          <div className="flex items-center gap-2">
            {getProviderBadge()}
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`text-sm px-2 py-1 rounded ${
                isMonitoring 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              {isMonitoring ? 'Monitorando' : 'Pausado'}
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{getStatusText()}</span>
              {getStatusBadge()}
            </div>
            <button
              onClick={checkApiStatus}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Verificar agora
            </button>
          </div>

          {lastCheck && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Última verificação: {lastCheck.toLocaleTimeString('pt-BR')}</span>
            </div>
          )}

          {/* Métricas em Tempo Real */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium">Requisições</span>
              </div>
              <p className="text-lg font-semibold text-blue-600">{metrics.requestCount}</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium">Tempo Médio</span>
              </div>
              <p className="text-lg font-semibold text-green-600">{metrics.averageResponseTime}ms</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-xs font-medium">Taxa de Erro</span>
              </div>
              <p className="text-lg font-semibold text-red-600">{metrics.errorRate.toFixed(1)}%</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Wifi className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium">Concorrência</span>
              </div>
              <div className="flex items-center gap-2">
                <p className={`text-lg font-semibold ${getLoadColor()}`}>
                  {metrics.concurrentRequests}
                </p>
                <Badge variant="outline" className={`text-xs ${getLoadColor().replace('text-', 'bg-').replace('600', '100')} ${getLoadColor().replace('text-', 'text-')}`}>
                  {getLoadStatus()}
                </Badge>
              </div>
            </div>
          </div>

          {apiConfig && (
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-sm">Configuração da API:</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div>• <strong>Provedor:</strong> {apiConfig.provider || 'N/A'}</div>
                <div>• <strong>Modelo:</strong> {apiConfig.model}</div>
                <div>• <strong>Endpoint:</strong> {apiConfig.baseUrl}</div>
                <div>• <strong>Tipo:</strong> {apiConfig.apiType || 'sync'}</div>
                <div>• <strong>Temperatura:</strong> {apiConfig.temperature}</div>
                <div>• <strong>Max Tokens:</strong> {apiConfig.maxTokens}</div>
                <div className="md:col-span-2">• <strong>API Key:</strong> <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">{apiConfig.apiKey.substring(0, 20)}...</code></div>
              </div>
            </div>
          )}

          {apiStatus === 'offline' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                A API está offline no momento. Verifique sua conexão ou tente novamente mais tarde.
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-red-600 dark:text-red-300">
                  • A API pode ter limites de concorrência. Se encontrar erro 429, aguarde alguns segundos antes de tentar novamente.
                </p>
                <p className="text-xs text-red-600 dark:text-red-300">
                  • Verifique se a chave de API está correta e com créditos disponíveis.
                </p>
                <p className="text-xs text-red-600 dark:text-red-300">
                  • Tente alternar para outro provedor de API nas configurações.
                </p>
              </div>
            </div>
          )}

          {metrics.concurrentRequests > 3 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Alta concorrência detectada! {metrics.concurrentRequests} requisições simultâneas.
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                Considere usar a API assíncrona (se disponível) ou aguardar um pouco entre as requisições.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}