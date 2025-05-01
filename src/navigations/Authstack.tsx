import React from 'react'
import OnBoarding from '../screens/auth/OnBoarding/OnBoarding';
import Login from '../screens/auth/Login/Login';
import Signup from '../screens/auth/SignUp/Signup';

const AuthStack = (Stack :any) => {
  return (
      <>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </>
  )
}

export default AuthStack;