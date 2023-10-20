import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import { Express } from 'express'
import multer from 'multer'

import { signout } from './handlers/signout'
import { signinSwitcher } from './handlers/signinSwitcher'
import { checkSwitcher } from './handlers/checkSwitcher'
import { newJwtFromRefreshToken } from './handlers/newJwtFromRefreshToken'
//import { generatePatientTokenTest } from './helpers/generatePatientToken'

const upload = multer()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getRoutes(app: Express) {
    /**
     * shared signin required query string `context`
     * //TODO need to split specific signin of the adoups and close it in VPN
     */
    app.get('/signin', upload.none(), async (req, res) => signinSwitcher(req, res))

    app.get('/check', upload.none(), async (req, res) => checkSwitcher(req, res))

    /**
     * shared signout method for all apps
     *
     */
    app.get('/signout', async (req, res) => signout(req, res))

    app.get('/token', async (req, res) => newJwtFromRefreshToken(req, res))

    //app.get('/getHashed', async (req, res) => generatePatientTokenTest(req, res))

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
