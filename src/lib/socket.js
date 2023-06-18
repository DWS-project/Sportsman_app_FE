import io from 'socket.io-client'

export const SocketSubject = {
  Team: 'TEAM',
  Player: 'PLAYER',
  Owner: 'OWNER',
}

class SocketClient {
  constructor() {
    this.socket = null
  }

  init() {
    if (this.socket) return
    this.socket = io(String(process.env.REACT_APP_SOCKETS_URL))
    this.socket.connect()
  }

  joinRooms(data) {
    this.socket.emit('join-rooms', data)
  }

  clean() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
}

const socketClient = new SocketClient()

export default socketClient
