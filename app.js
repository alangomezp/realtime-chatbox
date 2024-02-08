import express from 'express'
import morgan from 'morgan'
import { Server } from 'socket.io'
import http from 'node:http'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5500'
  }
}) // io cors managing

app.use(morgan('dev'))
app.use(cors()) // express app cors managing

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('message', (content) => {
    io.emit('message', content)
  })
})

app.use('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

export const PORT = process.env.PORT ?? 3000

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
