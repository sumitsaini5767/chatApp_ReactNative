import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  WrapperContainer,
  Backbutton,
  SocialLogin,
  UserInput,
  Button,
} from '../../../components/Componets';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import setUserAction from '../../../Redux/actions/userDetail';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigation = useNavigation();
  const {t}=useTranslation();
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <WrapperContainer
      contentContainerStyle={styles.mainContainerStyle}
      useScroll
    >
      <Backbutton onPress={handleGoBack} />

      <Text style={styles.topHeading}>{t('LogInToChatbox')}</Text>

      <Text style={styles.bottomHeading}>
        {t('WelcomeBack')}
      </Text>

      <SocialLogin
        imageContainerStyle={styles.socialImageContainer}
        isdark
      />

      {/* OR separator */}
      <View style={styles.OrContainer}>
        <View style={styles.orLines} />
        <Text style={styles.orTitle}>{t('OR')}</Text>
        <View style={styles.orLines} />
      </View>

      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t('YourEmail')}
        autoFocus
      />

      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t('Password')}
        secureTextEntry
        focusable
      />

      <View style={styles.buttonStyle}>
        <Button lable={t('login')} onPress={()=>{setUserAction(true);}} />
        <TouchableOpacity style={styles.forgetPassword}>
          <Text style={styles.forgetPasswordText}>{t('ForgotPassword')}</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default React.memo(Login);
