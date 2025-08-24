import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Lightbulb } from 'lucide-react';

interface Example {
  title: string;
  instruction: string;
  category: string;
}

const examples: Example[] = [
  {
    title: "Gerente de Mídias Sociais",
    instruction: "gerente de conteúdo de mídias sociais para uma loja de insumos agrícolas e você irá gerencia dois sub agentes um para conteúdo de Instagram e outro para blog",
    category: "Marketing"
  },
  {
    title: "Especialista em E-commerce",
    instruction: "especialista em e-commerce para plataforma de vendas de produtos eletrônicos, responsável por otimização de conversão e gestão de campanhas",
    category: "Vendas"
  },
  {
    title: "Consultor de TI",
    instruction: "consultor de tecnologia da informação para empresas de médio porte, especializado em transformação digital e segurança de dados",
    category: "Tecnologia"
  },
  {
    title: "Coordenador de Conteúdo",
    instruction: "coordenador de conteúdo educacional para plataforma de cursos online, focado em engenharia e programação",
    category: "Educação"
  }
];

export function ExamplesCard({ onExampleSelect }: { onExampleSelect: (instruction: string) => void }) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Exemplos de Instruções
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{example.title}</h4>
                <Badge variant="outline">{example.category}</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {example.instruction}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onExampleSelect(example.instruction)}
                  className="flex-1"
                >
                  Usar este exemplo
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(example.instruction)}
                  className="p-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}