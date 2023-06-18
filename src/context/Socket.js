import { createContext, useEffect, useState } from 'react'
import { socketSubjects } from 'src/constants/socketSubjects'
import socketClient from 'src/lib/socket'
import socket from 'src/lib/socket'

export const SocketSubject = {
  NewSportHallRegisted: 'NEW_SPORT_HALL_REGISTERED',
  NewPlayerRegistered: 'NEW_PLAYER_REGISTERED',
  NewTeamRegistered: 'NEW_TEAM_REGISTERED',
}

const SocketContext = createContext({
  newNotification: {},
  setNewNotification: () => {},
})

const SocketProvider = ({ children }) => {
  const [newNotification, setNewNotification] = useState()

  useEffect(() => {
    async function initSocketClient() {
      socketClient.init()
      socketSubjects.forEach((subject) => {
        socket.socket.on(subject, (props) => {
          switch (subject) {
            case SocketSubject.NewSportHallRegisted:
            case SocketSubject.NewPlayerRegistered:
            case SocketSubject.NewTeamRegistered:
              setNewNotification(props)
              break
            default:
              break
          }
        })
      })
    }
    initSocketClient()

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
