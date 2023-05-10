import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import * as http from "http";
import { Server } from 'socket.io'

import chat from "./controllers/chat.js";

//app
const app = express()
app.use(express.json({ limit: '5mb'}))
app.use(express.urlencoded({ extended: true}))
app.use(cors())
const httpServer = http.createServer(app)

// socket io
const io = new Server(httpServer, {
    path: '/socket.io',
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    },
})

//api
app.get('/', (req, res) => {
    res.json({msg: 'ok'})
})

//socket
chat(io)

const PORT_NUMBER = process.env.PORT_NUMBER || 8000
httpServer.listen(PORT_NUMBER, () => {
    console.log(`listening on port ${PORT_NUMBER}`)
})