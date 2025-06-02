import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './Mainstack';
import AuthStack from './Authstack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const Routes = () => {
  const user = useSelector((state: RootState) => state.userDetail);
  return (
    <NavigationContainer>
        {!user?<AuthStack/>:<MainStack/>}
    </NavigationContainer>
  );
};

export default Routes;
