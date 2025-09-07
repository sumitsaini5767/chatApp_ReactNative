import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { login } from '../../../Redux/actions/userDetail';
import { useTranslation } from 'react-i18next';
import { showError } from '../../../utils/helperFunction';
import { verticalScale } from '../../../styles/scaling';

const Login = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const { email, password } = state;
  const updateState = (key: string, value: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const onLogin = () => {
    if (!email || !password) {
      showError("Eamil And Password Is Required")
      return;
    }
    login(state);
  }
  return (
    <WrapperContainer
      contentContainerStyle={styles.mainContainerStyle}
      useScroll
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(64) : verticalScale(30)}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Backbutton onPress={handleGoBack} />
          <Text style={styles.topHeading}>{t('LogInToChatbox')}</Text>
          <Text style={styles.bottomHeading}>
            {t('WelcomeBack')}
          </Text>
          <SocialLogin
            imageContainerStyle={styles.socialImageContainer}
            isGoogle={true}
            isdark={true}
          />
          <UserInput
            inputContainerStyle={styles.inputContainerStyle}
            lable={t('YourEmail')}
            value={email}
            onChangeText={(text) => updateState('email', text)}
          />

          <UserInput
            inputContainerStyle={styles.inputContainerStyle}
            lable={t('Password')}
            secureTextEntry
            value={password}
            onChangeText={(text) => updateState('password', text)}
            focusable
          />

          <View style={styles.buttonStyle}>
            <Button label={t('login')} onPress={onLogin} />
            <TouchableOpacity style={styles.forgetPassword}>
              <Text style={styles.forgetPasswordText}>{t('ForgotPassword')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default React.memo(Login);
