import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import logger from 'morgan'
import winston from 'winston'
import expressWinston from 'express-winston'
import routes from './routes'
import {parseXmlToJson, getOpeningHours} from './lib'

const app = express()
const server = http.createServer(app)
const start = async () => {
  app.use(cors())
  app.use(bodyParser.json())

  app.use('/', routes)

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        formatter: ({level, message, meta}) => `${new Date().toTimeString()} ${level}: ${message}`,
      }),
    ],

  }))

  app.use((req, res, next) => {
    const err = new Error('API not found', 404)
    return next(err)
  })

  await parseXmlToJson()
  const port = process.env.PORT || 8000
  await server.listen(port)
  console.log(`Started on port ${server.address().port}`)
}

start()