import React from 'react'
import OnBoarding from '../screens/auth/OnBoarding/OnBoarding';
import Login from '../screens/auth/Login/Login';
import Signup from '../screens/auth/SignUp/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
       <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
  )
}

export default AuthStack;