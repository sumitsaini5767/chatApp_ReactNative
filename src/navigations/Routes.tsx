import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './Mainstack';
import AuthStack from './Authstack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { getFcmToken } from '../utils/helperFunction';

const Routes = () => {
  const user = useSelector((state: RootState) => state.userDetail);
  console.log(user, "user++++");
  useEffect(() => {
    getFcmToken();
  }, []);
  return (
    <NavigationContainer>
        {!user?.token?<AuthStack/>:<MainStack/>}
    </NavigationContainer>
  );
};

export default Routes;
