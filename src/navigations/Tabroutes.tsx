import {
  StyleSheet,
  Text,
  Image
} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import imagepath from '../constants/imagepath';

import { CommonColors } from '../styles/Colors';
import Home from '../screens/main/Home/Home';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  let options = (img: any, title?: string) => {
    return {
      tabBarIcon: ({ focused }: any) => (
        <Image source={img} style={focused ? {
          tintColor: CommonColors.tabbarFocusColour,
        } : {
          tintColor: CommonColors.black
        }} />
      ),
      tabBarLabel: ({ focused }: any) => (
        <Text style={{ color: focused ? CommonColors.tabbarFocusColour : CommonColors.black }}>{title}</Text>
      ),
      tabBarBadge: "9",
    }
  }
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard:true,
    }} >
      <Tab.Screen name="Home" component={Home} options={options(imagepath.message, 'Message')} />
      <Tab.Screen name="Home2" component={Home} options={options(imagepath.message, 'Message')} />
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({});
