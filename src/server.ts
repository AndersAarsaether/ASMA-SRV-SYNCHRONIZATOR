import path from 'path'

import express, { json } from 'express'
import helmet from 'helmet'

import configureRoutes from './api'

// Initialize api
const api = express()

// Maximum size of JSON body
api.use(json({ limit: '10mb' }))

// General web security
api.use(helmet())

// Serve static files from 'public' directory
api.use(express.static('public'))

// Route for serving the HTML file at root
api.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Disable etag and x-powered-by headers
api.disable('etag').disable('x-powered-by')

// Define the endpoints
configureRoutes(api)
