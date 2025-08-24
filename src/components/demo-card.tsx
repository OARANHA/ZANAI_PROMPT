"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Copy, Check } from "lucide-react"

const demoInstruction = "gerente de conteúdo de mídias sociais para uma loja de insumos agrícolas"

export function DemoCard() {
  const copyDemoInstruction = () => {
    navigator.clipboard.writeText(demoInstruction)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Demonstração Rápida
        </CardTitle>
        <CardDescription>
          Experimente com um exemplo pronto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">
              Exemplo para Teste
            </h4>
            <Badge variant="secondary" className="text-xs">
              Demo
            </Badge>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed mb-3">
            {demoInstruction}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyDemoInstruction}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copiar
            </Button>
            <Badge variant="outline" className="text-xs">
              Agronegócio
            </Badge>
            <Badge variant="outline" className="text-xs">
              Marketing
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Passos para testar:</h4>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">1</span>
              <span>Copie o exemplo acima</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">2</span>
              <span>Cole no campo de instrução</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">3</span>
              <span>Clique em "Gerar Estrutura"</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">4</span>
              <span>Use Tab para autocompletar</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500">
            Este exemplo demonstra como criar um agente completo para gestão de mídias sociais no agronegócio.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}