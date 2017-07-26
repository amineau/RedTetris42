export const ping = () => {
  return {
    type: 'server/ping'
  }
}

export const message = (room, data) => {
  const message = {room, content};
  return {
    type: 'socket',
    promise: (socket) => socket.emit('sendMessage', message)
  }
}
