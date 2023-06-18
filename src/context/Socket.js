import { createContext, useEffect, useState } from 'react'
import { socketSubjects } from 'src/constants/socketSubjects'
import socketClient from 'src/lib/socket'
import socket from 'src/lib/socket'

export const SocketSubject = {
  Team: 'TEAM',
  Player: 'PLAYER',
  Owner: 'OWNER',
  NewPlayerRegistered: 'NEW_PLAYER_REGISTERED',
}

const SocketContext = createContext({
  newNotification: {},
  setNewNotification: () => {},
})

const SocketProvider = ({ children }) => {
  const [newNotification, setNewNotification] = useState()

  useEffect(() => {
    async function socketClientInitialization() {
      socketClient.init()
      socketSubjects.map((subject) => {
        socket.socket.on(subject, (props) => {
          switch (subject) {
            case SocketSubject.Owner:
            case SocketSubject.Team:
            case SocketSubject.Player:
            case SocketSubject.NewPlayerRegistered:
              console.log('props', props)

              setNewNotification(props)
              break
            default:
              break
          }
        })
      })
    }
    socketClientInitialization()

    return () => socketClient.clean()
  }, [])

  return (
    <SocketContext.Provider
      value={{
        newNotification,
        setNewNotification,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { SocketProvider, SocketContext }
