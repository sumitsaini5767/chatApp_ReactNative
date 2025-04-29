import React from 'react'
import Home from '../screens/Home/Home'

const AuthStack = (Stack :any) => {
  return (
      <>
        <Stack.Screen name="Login" component={Home} />
      </>
  )
}

export default AuthStack;