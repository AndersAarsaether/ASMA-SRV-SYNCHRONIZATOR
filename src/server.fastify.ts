import fastify from 'fastify'
import compress from '@fastify/compress'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
//import { singin } from './handlers/signin'
import dotenv from 'dotenv'

import { EnvConfigs } from './EnvConfigs'
//import { setEnvToOperateMiddlewareFastify } from './graphql/envToOperate'
//import { updateUser } from './handlers/updateUser'
//import { insertUser } from './handlers/insert_user'
dotenv.config()

const server = fastify({ logger: true })

server.register(compress)
server.register(cors)
server.register(helmet)

server.post('/hello', (_request, res) => {
    res.send({ hello: 'world' })
})

server.listen(parseInt(EnvConfigs.PORT), (err) => {
    if (err) {
        server.log.error(err)

        process.exit(1)
    }

    console.log(`server listening on ${EnvConfigs.PORT}`)

    server.log.info(`server listening on ${EnvConfigs.PORT}`)
})

/* //@ts-check


import express from "express";
import bodyParser from "body-parser";
import { singin } from "./handlers/signin"
import { updateUser } from "./handlers/updateUser"
import { insertUser } from './handlers/insert_user'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.disable('etag').disable('x-powered-by')

const PORT = process.env.PORT || 8000

app.use(bodyParser.json());

app.post('/hello', async (req, res) => {
    return res.json({
        hello: "world"
    });
});

// Request Handler
app.post('/singin', (req, res) => {
console.log("port process env:", process.env.PORT)
  
    try{
        
    return singin(req.body, res)
    }catch(e){

    return res.status(500).json(`${e}`)
    }
});

app.post('/updateUser', async (req,res)=>{

    try{
        
        return updateUser(req.body, res)
    }catch(e){
        return res.status(500).json(`${e}`)
    }
})

app.post('/insertUser', async (req, res)=>{

    try {

        return  insertUser(req.body, res)
    } catch (e) {

        return res.status(500).json(`${e}`)
    }
})


app.listen(PORT);

  

 */
