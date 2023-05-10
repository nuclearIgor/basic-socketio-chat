import {io} from "socket.io-client";

const SERVER_URL = 'http://localhost:8000'
const socket = io(SERVER_URL, {
    path: '/socket.io',
    reconnection: false,
})

export default socket