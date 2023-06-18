import React from 'react'
import { SocketProvider } from 'src/context/Socket'

const withSockets = (Component) => {
  const WrappedComponent = (props) => (
    <SocketProvider>
      <Component {...props} />
    </SocketProvider>
  )

  return WrappedComponent
}

export default withSockets
