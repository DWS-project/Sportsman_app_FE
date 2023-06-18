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
    async function socketInitialization() {
      socketClient.init()
      //   if (authenticationCookie) {
      //     const { data: followedCompanies, status: statusFollowedCompanies } =
      //       await userService.getFollowedCompanies()
      //     if (statusFollowedCompanies !== HTTPStatusCodes.OK) return
      //     const data = {
      //       cookie: authenticationCookie,
      //       rooms: followedCompanies,
      //     }
      //     socketClient.joinRooms(data)
      //   }
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
    socketInitialization()

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
