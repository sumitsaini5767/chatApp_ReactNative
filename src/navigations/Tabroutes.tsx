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
import Settings from '../screens/main/Settings/Settings';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomTabBar } from '../components/Componets';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets()
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
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingBottom: insets.bottom
        }
      }} >
      <Tab.Screen name="Home" component={Home}
        options={options(imagepath.message, t('Messages'))} />
      <Tab.Screen name="Settings" component={Settings}
        options={options(imagepath.settings, t('Settings'))} />
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({});
