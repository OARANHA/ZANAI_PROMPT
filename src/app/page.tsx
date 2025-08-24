import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bot, 
  Zap, 
  FileText, 
  Settings, 
  Play,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"
import { ApiSelectorCard } from "@/components/api-selector-card"
import { ApiStatusCard } from "@/components/api-status-card"
import { InstructionsCard } from "@/components/instructions-card"
import { ExamplesCard } from "@/components/examples-card"
import { StructureInfoCard } from "@/components/structure-info-card"
import { FormatSettingsCard } from "@/components/format-settings-card"
import { DemoCard } from "@/components/demo-card"
import { useApiToast } from "@/hooks/use-api-toast"

export default function Home() {
  const [instruction, setInstruction] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [apiStatus, setApiStatus] = useState<'checking' | 'available' | 'unavailable'>('checking')
  const [selectedApi, setSelectedApi] = useState('openai')
  const [formatSettings, setFormatSettings] = useState({
    includeMarkdown: true,
    includeXml: true,
    includeExamples: true
  })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { showToast } = useApiToast()

  const sections = [
    { title: '# Papel', tag: 'papel' },
    { title: '# Contexto', tag: 'contexto' },
    { title: '# Tarefas', tag: 'tarefas' },
    { title: '# Ferramentas', tag: 'ferramentas' },
    { title: '# Tom de Voz', tag: 'tom_de_voz' },
    { title: '# Exemplos', tag: 'exemplos' },
    { title: '# Arquitetura do Agente', tag: 'arquitetura_agente' }
  ]

  const generateInitialStructure = () => {
    return sections.map(section => {
      return `${section.title}\n<${section.tag}>\n\n</${section.tag}>`
    }).join('\n\n')
  }

  const handleGenerate = async () => {
    if (!instruction.trim()) {
      showToast('Por favor, digite uma instrução inicial', 'error')
      return
    }

    setIsGenerating(true)
    showToast('Gerando estrutura XML...', 'info')

    try {
      const structure = generateInitialStructure()
      setGeneratedPrompt(structure)
      setCurrentSection(0)
      showToast('Estrutura gerada com sucesso!', 'success')
      
      // Focar no textarea após gerar
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
        }
      }, 100)
    } catch (error) {
      showToast('Erro ao gerar estrutura', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAutoComplete = async () => {
    if (!generatedPrompt || !instruction) return

    setIsGenerating(true)
    const currentTag = sections[currentSection].tag

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instruction,
          section: currentTag,
          previous_content: getPreviousContent(currentSection)
        })
      })

      const data = await response.json()
      
      if (data.success) {
        updateSectionContent(currentTag, data.content)
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1))
        showToast(`Seção ${currentTag} preenchida!`, 'success')
      } else {
        showToast(data.error || 'Erro ao preencher seção', 'error')
      }
    } catch (error) {
      showToast('Erro na requisição', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const getPreviousContent = (currentIndex: number) => {
    let content = ''
    for (let i = 0; i < currentIndex; i++) {
      const tag = sections[i].tag
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i')
      const match = generatedPrompt.match(regex)
      if (match) {
        content += `<${tag}>${match[1]}</${tag}>\n\n`
      }
    }
    return content
  }

  const updateSectionContent = (tag: string, content: string) => {
    const regex = new RegExp(`<${tag}>[\\s\\S]*?</${tag}>`, 'i')
    const newContent = `<${tag}>${content}</${tag}>`
    setGeneratedPrompt(prev => prev.replace(regex, newContent))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    showToast('Copiado para a área de transferência!', 'success')
  }

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'zanai-prompt.txt'
    a.click()
    URL.revokeObjectURL(url)
    showToast('Download iniciado!', 'success')
  }

  const resetAll = () => {
    setInstruction('')
    setGeneratedPrompt('')
    setCurrentSection(0)
    showToast('Resetado com sucesso!', 'info')
  }

  useEffect(() => {
    // Verificar status das APIs
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/config')
        const data = await response.json()
        setApiStatus(data.apis?.some((api: any) => api.available) ? 'available' : 'unavailable')
      } catch {
        setApiStatus('unavailable')
      }
    }
    checkApiStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Bot className="h-12 w-12 text-blue-600" />
              <Zap className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              ZANAI PROMPT
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Gerador de prompts estruturados em XML com autocompletar por IA
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {apiStatus === 'checking' && (
              <Badge variant="secondary">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Verificando APIs...
              </Badge>
            )}
            {apiStatus === 'available' && (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                APIs Disponíveis
              </Badge>
            )}
            {apiStatus === 'unavailable' && (
              <Badge variant="destructive">
                <AlertCircle className="h-3 w-3 mr-1" />
                APIs Indisponíveis
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instruction Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Instrução Inicial
                </CardTitle>
                <CardDescription>
                  Descreva o agente que você quer criar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ex: gerente de conteúdo de mídias sociais para uma loja de insumos agrícolas..."
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="min-h-24"
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !instruction.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Gerar Estrutura
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* API Status */}
            <ApiStatusCard />

            {/* API Selector */}
            <ApiSelectorCard 
              selectedApi={selectedApi}
              onApiChange={setSelectedApi}
            />

            {/* Format Settings */}
            <FormatSettingsCard 
              settings={formatSettings}
              onSettingsChange={setFormatSettings}
            />

            {/* Instructions */}
            <InstructionsCard />

            {/* Examples */}
            <ExamplesCard />

            {/* Structure Info */}
            <StructureInfoCard />

            {/* Demo */}
            <DemoCard />
          </div>

          {/* Right Panel - Main Content */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Editor de Prompt</CardTitle>
                    <CardDescription>
                      Use Tab para autocompletar seções e Enter para navegar
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {generatedPrompt && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={downloadPrompt}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={resetAll}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedPrompt ? (
                    <>
                      <Textarea
                        ref={textareaRef}
                        value={generatedPrompt}
                        onChange={(e) => setGeneratedPrompt(e.target.value)}
                        className="min-h-96 font-mono text-sm"
                        placeholder="Seu prompt estruturado aparecerá aqui..."
                      />
                      
                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Seção atual: {sections[currentSection]?.title}
                          </span>
                          <Badge variant="outline">
                            {currentSection + 1} / {sections.length}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAutoComplete}
                            disabled={isGenerating || currentSection >= sections.length}
                          >
                            {isGenerating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                Tab - Autocompletar
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentSection(prev => Math.min(prev + 1, sections.length - 1))}
                            disabled={currentSection >= sections.length - 1}
                          >
                            Enter - Próxima
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-96 text-gray-500">
                      <Bot className="h-16 w-16 mb-4 opacity-50" />
                      <p className="text-lg mb-2">Nenhum prompt gerado ainda</p>
                      <p className="text-sm">Digite uma instrução inicial e clique em "Gerar Estrutura"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}