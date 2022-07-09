require('dotenv').config()

const express  = require('express')
const app      = express()
const http     = require('http')
const server      = http.createServer(app)
const socketio    = require('socket.io')
const io          = socketio(server)
const {handleUser,joinUser,getUser,discon,getUsers}= require('./utils/chat')

app.use(express.static('./public'))


io.on('connection', socket =>{

    socket.on('roomJoin', ({username,room}) =>{

        const user = joinUser(socket.id,username,room)

        socket.join(user.room)

        socket.emit('message',handleUser('Bot','welcome mr User'))

        socket.broadcast.to(user.room).emit('message',handleUser('Bot',`${user.username} join to chat`))

        io.to(user.room).emit('room&Users',{
            room: user.room,
            users: getUsers(user.room)
        })
    })


    socket.on('messageChat', msg =>{
        const user = getUser(socket.id)
        if(user){
            io.to(user.room).emit('message',handleUser(user.username,msg))
        }
    })

    socket.on('disconnect',msg =>{

        const user = discon(socket.id)
        if(user){
            io.to(user.room).emit('message',handleUser('Bot',`${user.username} left the chat`))
            
            io.to(user.room).emit('room&Users',{
                room: user.room,
                users: getUsers(user.room)
            }) 
        }
        
    })
})


server.listen(process.env.PORT)
