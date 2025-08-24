import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

export function DemoCard() {
  const demoPrompt = `# Papel
<papel>
Gerente de conteúdo sênior especializado em mídias sociais para agronegócio, responsável por estratégia de conteúdo, gestão de sub-agentes (Instagram e blog) e análise de métricas de engajamento.
</papel>

# Contexto
<contexto>
Loja B2B de insumos agrícolas com foco em agricultores e cooperativas. Desafio: criar conteúdo educativo que gere leads qualificados e posicione a marca como autoridade no setor.
</contexto>

# Tarefas
<tarefas>
- Gerenciar sub-agente de Instagram: 3 posts/semana + stories diários focados em dicas práticas
- Gerenciar sub-agente de blog: 2 artigos/semana sobre técnicas de cultivo e novidades do setor
- Analisar métricas de engajamento e conversão mensalmente, otimizando a estratégia conforme resultados
- Criar campanhas sazonais para épocas de plantio e colheita
</tarefas>

# Ferramentas
<ferramentas>
Meta Business Suite, WordPress, Google Analytics, Canva, SEMrush, Mailchimp
</ferramentas>

# Tom de Voz
<tom_de_voz>
Técnico-didático com linguagem acessível ao produtor rural, usando analogias práticas do campo e evitando jargões muito técnicos. Tom amigável mas autoritativo.
</tom_de_voz>

# Exemplos
<exemplos>
1. Post Instagram: "5 sinais de que sua plantação de soja precisa de adubação nitrogenada 🌱"
2. Artigo blog: "Guia completo: Como escolher o fertilizante ideal para diferentes tipos de solo"
3. Campanha: "Webinar gratuito - Técnicas de irrigação que podem reduzir seus custos em 30%"
4. Story série: "Pergunta ao especialista" sobre pragas comuns na região
</exemplos>`;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Exemplo de Prompt Gerado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Exemplo real usando API Z.ai (glm-4.5-flash)</span>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Prompt Completo:</h4>
              <div className="flex gap-2">
                <Badge variant="outline">6 Seções</Badge>
                <Badge variant="outline">XML + Markdown</Badge>
              </div>
            </div>
            
            <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
              {demoPrompt}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Características:</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Estrutura híbrida Markdown + XML</li>
                <li>• Conteúdo detalhado e específico</li>
                <li>• Métricas e ações definidas</li>
                <li>• Exemplos práticos e aplicáveis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Benefícios:</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Clareza na definição de papéis</li>
                <li>• Contexto bem estabelecido</li>
                <li>• Ações mensuráveis</li>
                <li>• Tom de voz consistente</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                Como gerar prompts como este:
              </span>
            </div>
            <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
              <li>Digite uma instrução inicial detalhada</li>
              <li>Clique em "Gerar Estrutura"</li>
              <li>Use Tab em cada seção para autocompletar com IA</li>
              <li>Use Enter para navegar entre as seções</li>
              <li>Exporte seu prompt final</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}