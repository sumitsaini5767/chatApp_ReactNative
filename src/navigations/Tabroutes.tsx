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
import SearchUser from '../screens/main/SearchUser/SearchUser';
import { t } from 'i18next';
import Settings from '../screens/main/Settings/Settings';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  let options = (
    img: any,
    title?: string,
    barBadge?: string) => {
    return {
      tabBarIcon: ({ focused }: any) => (
        <Image source={img} style={focused ? {
          tintColor: CommonColors.inputTextColor,
        } : {
          tintColor: CommonColors.black
        }} />
      ),
      tabBarLabel: ({ focused }: any) => (
        <Text style={{
          color: focused ? CommonColors.inputTextColor
            : CommonColors.black
        }}>{title}</Text>
      ),
      tabBarBadge: barBadge,
    }
  }
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
    }} >
      <Tab.Screen name="Home" component={Home}
        options={options(imagepath.message, t('Message'), "9")} />
      <Tab.Screen name="Settings" component={Settings}
        options={options(imagepath.settings, t('Settings'))} />
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({});
