import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './Mainstack';
import AuthStack from './Authstack';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
        {false?<AuthStack/>:<MainStack/>}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
