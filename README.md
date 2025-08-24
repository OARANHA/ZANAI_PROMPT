# ZANAI PROMPT

Gerador de prompts estruturados em XML com autocompletar por IA para criação de agentes de nível sênior.

## Funcionalidades

- ✅ Geração de estrutura XML com 7 seções padrão
- ✅ Autocompletar por seção usando múltiplas APIs (OpenAI, BigModel, Mistral AI, Z.ai)
- ✅ Interface interativa com navegação por Tab/Enter
- ✅ Monitoramento de status de APIs em tempo real
- ✅ Exportação para texto e cópia para área de transferência
- ✅ Design responsivo com shadcn/ui

## Estrutura XML

```xml
<contexto>[Conteúdo]</contexto>
<papel>[Conteúdo]</papel>
<tarefas>[Conteúdo]</tarefas>
<ferramentas>[Conteúdo]</ferramentas>
<tom-de-voz>[Conteúdo]</tom-de-voz>
<exemplos>[Conteúdo]</exemplos>
<arquitetura-agente>[Conteúdo]</arquitetura-agente>
```

## Como Usar

1. Digite uma instrução inicial descrevendo o agente desejado
2. Clique em "Gerar Estrutura" para criar a base XML
3. Use Tab para autocompletar cada seção individualmente
4. Use Enter para navegar entre as seções
5. Exporte ou copie o prompt final quando terminar

## Tecnologias

- Next.js 15 com TypeScript
- shadcn/ui components
- Tailwind CSS
- Múltiplas APIs de IA
- Socket.io para comunicação em tempo real

## Instalação

```bash
npm install
npm run dev
```

Acesse http://localhost:3000 para usar o aplicativo.

## Variáveis de Ambiente

Configure as seguintes variáveis no arquivo `.env`:

```
OPENAI_API_KEY=sua_chave_openai
BIGMODEL_API_KEY=sua_chave_bigmodel
MISTRAL_API_KEY=sua_chave_mistral
ZAI_API_KEY=sua_chave_zai
```

## Licença

MIT