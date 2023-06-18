import { createContext, useEffect, useState } from 'react'
import { socketSubjects } from 'src/constants/socketSubjects'
import socketClient from 'src/lib/socket'
import socket from 'src/lib/socket'

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
            case 'cao':
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
