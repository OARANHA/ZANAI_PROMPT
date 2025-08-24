import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Code, Type, List } from 'lucide-react';
import { useState } from 'react';

interface FormatSettings {
  useSubTags: boolean;
  useLists: boolean;
  contentStyle: 'direct' | 'detailed' | 'balanced';
}

export function FormatSettingsCard() {
  const [settings, setSettings] = useState<FormatSettings>({
    useSubTags: false,
    useLists: true,
    contentStyle: 'balanced'
  });

  const handleSettingChange = (key: keyof FormatSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configurações de Formatação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Usar Sub-Tags XML
                </Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Incluir tags XML internas para estruturar o conteúdo detalhadamente
                </p>
              </div>
              <Switch
                checked={settings.useSubTags}
                onCheckedChange={(checked) => handleSettingChange('useSubTags', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Usar Listas com Marcadores
                </Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Organizar informações usando listas com marcadores (-) quando apropriado
                </p>
              </div>
              <Switch
                checked={settings.useLists}
                onCheckedChange={(checked) => handleSettingChange('useLists', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Type className="w-4 h-4" />
              Estilo de Conteúdo
            </Label>
            <Select value={settings.contentStyle} onValueChange={(value) => handleSettingChange('contentStyle', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estilo de conteúdo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">
                  <div className="flex flex-col">
                    <span className="font-medium">Direto e Conciso</span>
                    <span className="text-xs text-slate-500">Informações objetivas e diretas ao ponto</span>
                  </div>
                </SelectItem>
                <SelectItem value="detailed">
                  <div className="flex flex-col">
                    <span className="font-medium">Detalhado e Completo</span>
                    <span className="text-xs text-slate-500">Informações abrangentes e minuciosas</span>
                  </div>
                </SelectItem>
                <SelectItem value="balanced">
                  <div className="flex flex-col">
                    <span className="font-medium">Equilibrado</span>
                    <span className="text-xs text-slate-500">Bom equilíbrio entre detalhe e concisão</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Pré-visualização das Configurações:</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium">Sub-Tags XML:</span>
                <span className={settings.useSubTags ? 'text-green-600' : 'text-red-600'}>
                  {settings.useSubTags ? 'Habilitado' : 'Desabilitado'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Listas:</span>
                <span className={settings.useLists ? 'text-green-600' : 'text-red-600'}>
                  {settings.useLists ? 'Habilitado' : 'Desabilitado'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Estilo:</span>
                <span className="text-blue-600">
                  {settings.contentStyle === 'direct' ? 'Direto e Conciso' :
                   settings.contentStyle === 'detailed' ? 'Detalhado e Completo' :
                   'Equilibrado'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p><strong>Dica:</strong> Desabilite as sub-tags XML para um conteúdo mais limpo e fácil de processar por IAs.</p>
            <p><strong>Recomendação:</strong> Use o estilo equilibrado para a maioria dos casos.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}