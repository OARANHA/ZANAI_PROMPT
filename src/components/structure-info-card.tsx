"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Code, Hash } from "lucide-react"

const sections = [
  {
    title: "# Contexto",
    tag: "contexto",
    description: "Ambiente, empresa, público-alvo e desafios",
    icon: FileText
  },
  {
    title: "# Papel", 
    tag: "papel",
    description: "Função, responsabilidades e autoridade",
    icon: Hash
  },
  {
    title: "# Tarefas",
    tag: "tarefas", 
    description: "Ações específicas e métricas de sucesso",
    icon: FileText
  },
  {
    title: "# Ferramentas",
    tag: "ferramentas",
    description: "Plataformas, softwares e metodologias",
    icon: Code
  },
  {
    title: "# Tom de Voz",
    tag: "tom_de_voz",
    description: "Estilo de comunicação e linguagem",
    icon: Hash
  },
  {
    title: "# Exemplos",
    tag: "exemplos",
    description: "Casos de uso e situações práticas",
    icon: FileText
  },
  {
    title: "# Arquitetura do Agente",
    tag: "arquitetura_agente",
    description: "Estrutura técnica e sub-agentes",
    icon: Code
  }
]

export function StructureInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Estrutura XML
        </CardTitle>
        <CardDescription>
          Seções do prompt estruturado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section, index) => (
          <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mt-0.5">
              <section.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{section.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {section.tag}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Cada seção é preenchida individualmente pela IA</p>
            <p>• A estrutura garante consistência e qualidade</p>
            <p>• Tags XML facilitam integração com outros sistemas</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}