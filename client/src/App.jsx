import socket from "./socket.js";
import {useEffect, useState} from "react";

function App() {
    const [username, setUsername] = useState('')
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('user joined', msg => {
            console.log('userjoined message', msg)
        })
         socket.on('message', message => {
            console.log('message', message)
             setMessages(prevState => [...prevState, message])
        })

        return () => {
            socket.off('user joined')
            socket.off('message')
        }
    }, [])

    useEffect(() => {
        socket.on('users', users => {
            console.log('users', users)
            setUsers(users)
        })

        return () => {
            socket.off('users')
        }
    }, [socket])

    const handleUsername = (e) => {
        console.log(username)
        e.preventDefault()
        socket.emit('username', username)
        setConnected(true)
    }

    const handleMessage = (e) => {
        e.preventDefault()
        socket.emit('message', `${username} - ${message}`)
        setMessage('')
    }
    
  return (
    <>
        <div className="container text-center">
            <div className="row">
                {connected ?
                    (<form onSubmit={handleMessage} className={'text-center pt-3'}>
                        <div className="row g-3">
                            <div className="col-md-8">
                                <input type="text"
                                       value={message}
                                       onChange={e => setMessage(e.target.value)}
                                       placeholder={'message'}
                                       className={'form-control'}
                                />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-secondary" type={"submit"}>
                                    Send
                                </button>
                            </div>
                        </div>


                    </form>
                    )
                    :
                    (
                        <form onSubmit={handleUsername} className={'text-center pt-3'}>
                            <div className="row g-3">
                                <div className="col-md-8">
                                    <input type="text"
                                           value={username}
                                           onChange={e => setUsername(e.target.value)}
                                           placeholder={'enter you name'}
                                           className={'form-control'}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-secondary" type={"submit"}>
                                        Join
                                    </button>
                                </div>
                            </div>
                        </form>
                    )
                }
            </div>

            <div className="row">
                <div className="col-md-8">
                    <pre>
                        {messages.map(m =>
                            <div key={m} className={'alert alert-secondary'}>{m}</div>
                        )}
                    </pre>
                </div>

                <div className="col-md-4">
                    <pre>
                        {users.map(u =>
                            <div key={u} className={'alert alert-secondary'}>{u}</div>
                        )}
                    </pre>
                </div>
            </div>


        </div>
    </>
  )
}

export default App
