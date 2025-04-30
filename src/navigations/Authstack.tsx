import React from 'react'
import OnBoarding from '../screens/auth/OnBoarding/OnBoarding';
import Login from '../screens/auth/Login/Login';

const AuthStack = (Stack :any) => {
  return (
      <>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
      </>
  )
}

export default AuthStack;