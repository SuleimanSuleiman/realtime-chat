const moment = require('moment')

let users =[]

function handleUser(username,message){
    return {
        username,
        message,
        time: moment().format('h:mm a')
    }
}

function joinUser(id,username,room){
    const user = {
        id,
        username,
        room
    }

    users.push(user)

    return user
}

function getUser(id){
    return users.find(user => user.id == id)
}

function discon(id){
    const user = users.find(user => user.id == id)
    if(user){
        return users.splice(user,1)[0]
    }
}

function getUsers(room){
    return users.filter(user => user.room == room)
}

module.exports = {
    handleUser,
    joinUser,
    getUser,
    discon,
    getUsers
}