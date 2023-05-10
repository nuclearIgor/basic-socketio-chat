const users = []

const addUser = (username) => {
    const name = username.trim().toLowerCase()
    const existingUser = users.find(u => u === name)

    if (!username.trim()){
        return {error: "name is required"}
    }
    if (existingUser) {
        return {error: "name is taken"}
    } else {
        users.push(name)
        return username
    }

}

const chat = (io) => {

    console.log('live chat', io.opts)
    io.on('connection', (socket) => {
        // console.log('socket id: \n',socket.id)

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })

        socket.on('username', (username, next) => {
            // io.emit('user joined', `${username} joined`)
            // all sockets but yourself
            let result = addUser(username)
            if (result.error) {
                return next(result.error)
            }
            io.emit('users', users)
            socket.broadcast.emit('user joined', `${username} joined`)
        })

        socket.on('message', (message) => {
            io.emit("message", message)
        })
    })

}

export default chat