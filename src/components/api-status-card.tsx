"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Wifi,
  WifiOff,
  Server,
  Zap
} from "lucide-react"

interface ApiStatus {
  name: string
  available: boolean
  latency?: number
  error?: string
}

export function ApiStatusCard() {
  const [apiStatus, setApiStatus] = useState<ApiStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await fetch('/api/config')
        const data = await response.json()
        setApiStatus(data.apis || [])
      } catch (error) {
        console.error('Erro ao buscar status das APIs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiStatus()
    const interval = setInterval(fetchApiStatus, 30000) // Atualiza a cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const getAvailableCount = () => apiStatus.filter(api => api.available).length
  const getTotalCount = () => apiStatus.length

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Status das APIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Verificando status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Status das APIs
        </CardTitle>
        <CardDescription>
          Status de disponibilidade das APIs de IA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Overall Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            {getAvailableCount() > 0 ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm font-medium">
              {getAvailableCount()} de {getTotalCount()} APIs disponíveis
            </span>
          </div>
          <Badge variant={getAvailableCount() > 0 ? "default" : "destructive"}>
            {getAvailableCount() > 0 ? "Online" : "Offline"}
          </Badge>
        </div>

        {/* Individual API Status */}
        <div className="space-y-2">
          {apiStatus.map((api, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded border">
              <div className="flex items-center gap-2">
                {api.available ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-medium">{api.name}</span>
                {api.latency && (
                  <span className="text-xs text-gray-500">
                    {api.latency}ms
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={api.available ? "default" : "destructive"} className="text-xs">
                  {api.available ? "Online" : "Offline"}
                </Badge>
                {api.available && <Zap className="h-3 w-3 text-yellow-500" />}
              </div>
            </div>
          ))}
        </div>

        {getAvailableCount() === 0 && (
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500 mx-auto mb-1" />
            <p className="text-sm text-red-700 dark:text-red-300">
              Nenhuma API disponível. Verifique suas configurações.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}