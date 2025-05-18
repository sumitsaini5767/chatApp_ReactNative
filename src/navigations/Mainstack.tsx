import React from 'react';
import TabRoutes from './Tabroutes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default MainStack;

