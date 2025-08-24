import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Info } from 'lucide-react';

export function StructureInfoCard() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Estrutura do Prompt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              O prompt gerado segue uma estrutura híbrida que combina Markdown para organização visual e XML para estrutura semântica.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Estrutura Gerada:</h4>
            <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
{`# Papel
<papel>
[Conteúdo gerado para o papel]
</papel>

# Contexto
<contexto>
[Conteúdo gerado para o contexto]
</contexto>

# Tarefas
<tarefas>
[Conteúdo gerado para as tarefas]
</tarefas>

# Ferramentas
<ferramentas>
[Conteúdo gerado para as ferramentas]
</ferramentas>

# Tom de Voz
<tom_de_voz>
[Conteúdo gerado para o tom de voz]
</tom_de_voz>

# Exemplos
<exemplos>
[Conteúdo gerado para os exemplos]
</exemplos>`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Vantagens da Estrutura:</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Organização visual clara com Markdown</li>
                <li>• Estrutura semântica com XML</li>
                <li>• Compatibilidade com LLMs</li>
                <li>• Fácil exportação e reutilização</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Uso Recomendado:</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Treinamento de agentes de IA</li>
                <li>• Documentação de processos</li>
                <li>• Templates de comunicação</li>
                <li>• Guias de boas práticas</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}