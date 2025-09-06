import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './Mainstack';
import AuthStack from './Authstack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { backgroundhandler, forgroundHandler, getFcmToken, OnClickNotif } from '../utils/notificationHandler';
import { requestNotificationPermission } from '../utils/userPermission';
import { AlertPopup } from '../components/Componets';

const Routes = () => {
  const user = useSelector((state: RootState) => state.userDetail);
  const alert = useSelector((state: RootState) => state.alert);
  useEffect(() => {
    requestNotificationPermission();
    getFcmToken();
    forgroundHandler();
    backgroundhandler();
    OnClickNotif();
  }, []);
  return (
    <NavigationContainer>
      {!!alert.text && <AlertPopup />}
      {!user?.token ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default Routes;
