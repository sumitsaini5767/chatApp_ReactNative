import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import imagepath from '../constants/imagepath';
import Home from '../screens/Home/Home';
const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  let options= (img:any,title?:string)=>{
    return{
    tabBarIcon: ({ focused  }:any) => (
      <Image source={img} style={focused ? { 
        tintColor: "#8E6CEF",} : null} />
    ),
    title:title
  }}
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} >
      <Tab.Screen name="Home" component={Home} options={options(imagepath.message,'Message')}/>
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({});
