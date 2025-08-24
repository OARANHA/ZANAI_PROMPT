"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Copy, Check } from "lucide-react"

const examples = [
  {
    title: "Gerente de Mídias Sociais",
    instruction: "gerente de conteúdo de mídias sociais para uma loja de insumos agrícolas e você irá gerencia dois sub agentes um para conteúdo de Instagram e outro para blog",
    tags: ["Agronegócio", "Marketing", "Gestão"]
  },
  {
    title: "Especialista em Suporte",
    instruction: "especialista em suporte técnico para plataforma SaaS com foco em resolução de problemas e satisfação do cliente",
    tags: ["Suporte", "SaaS", "Técnico"]
  },
  {
    title: "Analista de Dados",
    instruction: "analista de dados senior para e-commerce especializado em análise de comportamento do consumidor e otimização de conversão",
    tags: ["Dados", "E-commerce", "Análise"]
  },
  {
    title: "Content Creator",
    instruction: "criador de conteúdo especializado em tecnologia e inovação para blog corporativo com foco em tendências de mercado",
    tags: ["Conteúdo", "Tecnologia", "Blog"]
  }
]

export function ExamplesCard() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Exemplos de Instruções
        </CardTitle>
        <CardDescription>
          Clique para copiar exemplos prontos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {examples.map((example, index) => (
          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm">{example.title}</h4>
              <button
                onClick={() => copyToClipboard(example.instruction)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Copiar instrução"
              >
                <Copy className="h-3 w-3 text-gray-500" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
              {example.instruction}
            </p>
            <div className="flex flex-wrap gap-1">
              {example.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2 border-t">
          <p className="text-xs text-gray-500">
            Dica: Use estes exemplos como base para criar seus próprios agentes
          </p>
        </div>
      </CardContent>
    </Card>
  )
}