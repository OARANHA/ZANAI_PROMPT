import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Keyboard, Lightbulb } from 'lucide-react';

export function InstructionsCard() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Como Usar o Gerador de Prompt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold">1. Instrução Inicial</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Digite uma descrição clara do papel ou contexto que você deseja criar. 
              Seja específico sobre responsabilidades, público-alvo e objetivos.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-green-600" />
              <h4 className="font-semibold">2. Navegação</h4>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">Tab</Badge>
                <span>Autocompleta a seção atual</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">Enter</Badge>
                <span>Avança para próxima seção</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
              <h4 className="font-semibold">3. Personalização</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Edite manualmente qualquer conteúdo gerado. Cada seção pode ser 
              personalizada conforme suas necessidades específicas.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Exemplo de Instrução:</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
            "gerente de conteúdo de mídias sociais para uma loja de insumos agrícolas e você irá gerencia dois sub agentes um para conteúdo de Instagram e outro para blog"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}