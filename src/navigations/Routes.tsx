import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './Mainstack';
import AuthStack from './Authstack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const user = useSelector((state: RootState) => state.userDetail);
  return (
    <NavigationContainer>
        {!user?<AuthStack/>:<MainStack/>}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
