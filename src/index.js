'use strict'

const http = require('http')
const express = require('express')
const helmet = require('helmet')

const { PORT = 3000 } = process.env

const app = express()

const healthCheck = (_, res) => res.json({
  status: 'Alive',
  time: new Date()
})

const shutdown = (status = 1) => {
  console.warn('Shutting down with status', status)
  process.exit(status)
}

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error)
  shutdown(1)
})

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error)
  shutdown(1)
})
const configureRoutes = () => {
  app.get('/health', healthCheck)
  app.use('/', require('./routes'))
}

const configureApi = () => {
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  configureRoutes()
}

const listen = (port = PORT) => new Promise(
  (resolve, reject) => {
    const defaultBind = '0.0.0.0'
    const server = http.createServer(app, defaultBind)
    server.listen(port, defaultBind, (err) => {
      if (err) return reject(err)
      const addr = server.address()
      const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
      console.log(`listening on ${bind}`)
      return resolve(server)
    })
  }
)

const startUp = async () => {
  console.log(`Starting service`)
  configureApi()
  await listen()
}

startUp().catch((error) => {
  console.error(`STARTUP ERROR:`, error)
  shutdown()
})