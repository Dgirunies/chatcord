const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io()

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    chatMessages.appendChild(div)
}

// Message from server
socket.on('message', message => {
    outputMessage(message)

    // Scroll to the bottom of messages
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Message input 
    const msgInput = e.target.elements.msg

    // Get message text
    const msg = msgInput.value
    
    // Emit a message to server
    socket.emit('chatMessage', msg)

    // Clear input
    msgInput.value = ''
    msgInput.focus()
})