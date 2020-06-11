module.exports = (socket, io) => { //module.exports allows function ot be used elsewhere when called
  console.log('a user connected')

  //broadcast emits to every cpnnected user except for specfic users
  socket.on('new-chat-message', (data) => {
    socket.broadcast.emit('broadcast-message', data)
  })
}
