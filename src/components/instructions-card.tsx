"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Keyboard, Mouse, Zap, FileText } from "lucide-react"

export function InstructionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="h-5 w-5" />
          Instruções de Uso
        </CardTitle>
        <CardDescription>
          Como usar o gerador de prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mt-0.5">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-sm">1. Digite a instrução inicial</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Descreva o agente que você deseja criar
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mt-0.5">
              <Mouse className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-sm">2. Gere a estrutura</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Clique no botão para criar a base XML
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-full mt-0.5">
              <Keyboard className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="font-medium text-sm">3. Use Tab para autocompletar</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Pressione Tab para preencher cada seção com IA
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full mt-0.5">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-sm">4. Navegue com Enter</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Pressione Enter para ir para a próxima seção
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Tab
            </Badge>
            <span className="text-xs text-gray-600">= Autocompletar seção</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              Enter
            </Badge>
            <span className="text-xs text-gray-600">= Próxima seção</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}