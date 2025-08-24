"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bot, 
  Zap, 
  Brain, 
  Cloud,
  Settings,
  CheckCircle
} from "lucide-react"

const apis = [
  {
    id: 'openai',
    name: 'OpenAI GPT-4',
    description: 'Modelo mais avançado para geração de texto',
    icon: Brain,
    features: ['Alta qualidade', 'Contexto longo', 'Rápido'],
    status: 'available'
  },
  {
    id: 'bigmodel',
    name: 'BigModel',
    description: 'Alternativa robusta com bom custo-benefício',
    icon: Cloud,
    features: ['Custo acessível', 'Bom desempenho', 'Estável'],
    status: 'available'
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'Modelo europeu de alta performance',
    icon: Zap,
    features: ['Open source', 'Alta performance', 'Seguro'],
    status: 'available'
  },
  {
    id: 'zai',
    name: 'Z.ai',
    description: 'API nativa integrada ao sistema',
    icon: Bot,
    features: ['Nativa', 'Sem latência', 'Otimizada'],
    status: 'available'
  }
]

interface ApiSelectorCardProps {
  selectedApi: string
  onApiChange: (api: string) => void
}

export function ApiSelectorCard({ selectedApi, onApiChange }: ApiSelectorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Selecionar API
        </CardTitle>
        <CardDescription>
          Escolha qual API de IA usar para gerar os prompts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedApi} onValueChange={onApiChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="bigmodel">BigModel</TabsTrigger>
            <TabsTrigger value="mistral">Mistral</TabsTrigger>
            <TabsTrigger value="zai">Z.ai</TabsTrigger>
          </TabsList>
          
          {apis.map((api) => (
            <TabsContent key={api.id} value={api.id} className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <api.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{api.name}</h3>
                      <Badge variant={api.status === 'available' ? 'default' : 'destructive'}>
                        {api.status === 'available' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Disponível
                          </>
                        ) : (
                          'Indisponível'
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {api.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Características:</h4>
                  <div className="flex flex-wrap gap-2">
                    {api.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant={selectedApi === api.id ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => onApiChange(api.id)}
                >
                  {selectedApi === api.id ? 'Selecionado' : 'Selecionar esta API'}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}