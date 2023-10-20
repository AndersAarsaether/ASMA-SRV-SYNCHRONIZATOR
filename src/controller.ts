import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import { Express } from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getRoutes(app: Express) {
    app.get('/', (_req, res) => {
        res.sendFile(path.resolve(__dirname, getRightPath()))
    })
}

function getRightPath() {
    let index_html_path = './public/index.html'
    if (fs.existsSync(index_html_path)) {
        index_html_path = '../public/index.html'
    }
    return index_html_path
}
