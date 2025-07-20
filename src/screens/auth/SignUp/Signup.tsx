import React, { useState } from 'react';
import { WrapperContainer, UserInput, Button, SocialLogin } from '../../../components/Componets';
import { Backbutton } from '../../../components/Componets';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { AuthStackParamList } from '../../../navigations/types';
import { useTranslation } from 'react-i18next';
import { signUp } from '../../../Redux/actions/userDetail';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { name, email, password, confirmPassword } = state;
  const updateState = (key: string, value: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const onSingUp = () => {
    signUp(state);
  }
  return (
    <WrapperContainer
      contentContainerStyle={styles.mainContainerStyle}
      useScroll={true}>
      <Backbutton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.topHeading}>{t("SignUpWith")}</Text>
      <Text style={styles.bottomHeading}>{t('Get_Chatting_With')}</Text>
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("YourName")}
        value={name}
        onChangeText={(text) => updateState('name', text)}
        focusable
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("YourEmail")}
        value={email}
        onChangeText={(text) => updateState('email', text)}
        focusable
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("Password")}
        secureTextEntry
        value={password}
        onChangeText={(text) => updateState('password', text)}
        focusable
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("ConfirmPassword")}
        secureTextEntry 
        value={confirmPassword}
        onChangeText={(text) => updateState('confirmPassword', text)}
        focusable
      />
      <View style={styles.buttonStyle}>
        <Button lable={t('CreateAnAccount')} onPress={onSingUp} />
      </View>
    </WrapperContainer>
  )
}

export default Signup
