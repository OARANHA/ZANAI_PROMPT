"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Settings, FileText, Code, Hash } from "lucide-react"

interface FormatSettingsCardProps {
  settings: {
    includeMarkdown: boolean
    includeXml: boolean
    includeExamples: boolean
  }
  onSettingsChange: (settings: any) => void
}

export function FormatSettingsCard({ settings, onSettingsChange }: FormatSettingsCardProps) {
  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Formato de Saída
        </CardTitle>
        <CardDescription>
          Configure como o prompt será gerado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-blue-600" />
              <div>
                <h4 className="text-sm font-medium">Títulos Markdown</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Incluir # Títulos para organização
                </p>
              </div>
            </div>
            <Switch
              checked={settings.includeMarkdown}
              onCheckedChange={(checked) => handleSettingChange('includeMarkdown', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-green-600" />
              <div>
                <h4 className="text-sm font-medium">Tags XML</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Incluir tags XML para estruturação
                </p>
              </div>
            </div>
            <Switch
              checked={settings.includeXml}
              onCheckedChange={(checked) => handleSettingChange('includeXml', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <div>
                <h4 className="text-sm font-medium">Exemplos Práticos</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Incluir seção de exemplos
                </p>
              </div>
            </div>
            <Switch
              checked={settings.includeExamples}
              onCheckedChange={(checked) => handleSettingChange('includeExamples', checked)}
            />
          </div>
        </div>
        
        <div className="pt-3 border-t">
          <div className="text-xs text-gray-500 space-y-1">
            <p>• As configurações afetam a estrutura gerada</p>
            <p>• Recomendado manter todas as opções ativadas</p>
            <p>• Formato híbrido oferece melhor legibilidade</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}