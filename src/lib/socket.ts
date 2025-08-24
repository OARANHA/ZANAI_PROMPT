import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'

export type SocketServer = Server

// Função para criar o servidor Socket.IO
export function createSocketServer(req: NextApiRequest, res: NextApiResponse): SocketServer {
  const socket = res.socket as any
  if (socket && socket.server && !socket.server.io) {
    console.log('Criando novo servidor Socket.IO...')
    
    const io = new Server(socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
        methods: ['GET', 'POST']
      }
    })

    // Eventos de conexão
    io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id)

      // Evento para gerar prompt
      socket.on('generate-prompt', async (data) => {
        try {
          const { instruction, section, previousContent } = data
          
          // Emitir evento de início
          socket.emit('generation-start', { section })

          // Simular geração (na implementação real, chamaria a API)
          setTimeout(() => {
            const mockContent = `Conteúdo gerado para a seção ${section} com base na instrução: ${instruction}`
            
            socket.emit('generation-complete', {
              section,
              content: mockContent,
              success: true
            })
          }, 2000)

        } catch (error) {
          const { section } = data
          socket.emit('generation-error', {
            section,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          })
        }
      })

      // Evento de desconexão
      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id)
      })
    })

    socket.server.io = io
  } else {
    console.log('Servidor Socket.IO já existe')
  }

  const serverSocket = res.socket as any
  return serverSocket?.server?.io as SocketServer
}

// Função para emitir eventos para todos os clientes conectados
export function emitToAll(io: SocketServer, event: string, data: any) {
  io.emit(event, data)
}

// Função para emitir eventos para um cliente específico
export function emitToClient(io: SocketServer, socketId: string, event: string, data: any) {
  io.to(socketId).emit(event, data)
}