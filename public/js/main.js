const socket      = io()
const Form        = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
const users = document.getElementById('users')
const Room  = document.getElementById('room-name')

socket.emit('roomJoin',{username,room})


Form.addEventListener('submit',(e) =>{

    e.preventDefault()
    const msg = e.target.elements.msg.value
    socket.emit('messageChat',msg)
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

socket.on('message',msg =>{

    outPutMessage(msg)
    chatMessage.scrollTop = chatMessage.scrollHeight

})

socket.on('room&Users', user =>{
    users.innerHTML = user.users.map(u => `<li>${u.username}</li>`).join('')
    Room.innerHTML  = user.room
})

function outPutMessage(msg){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <p class="meta">${msg.username}<span> ${msg.time}</span></p>
    <p class="text">
    ${msg.message}
    </p>
    `
    chatMessage.appendChild(div)
}
