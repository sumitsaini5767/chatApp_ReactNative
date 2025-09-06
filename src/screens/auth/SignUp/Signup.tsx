import React, { useState } from 'react';
import { WrapperContainer, UserInput, Button, SocialLogin } from '../../../components/Componets';
import { Backbutton } from '../../../components/Componets';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { AuthStackParamList } from '../../../navigations/types';
import { useTranslation } from 'react-i18next';
import { signUp } from '../../../Redux/actions/userDetail';
import { checkConfirmPassword, checkEmail, checkName, checkPassword } from '../../../utils/validations';
import { moderateScale, verticalScale } from '../../../styles/scaling';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  })
  const { nameError, emailError, passwordError, confirmPasswordError } = error;
  const { name, email, password, confirmPassword } = state;

  const validators: Record<keyof typeof state,
    { fn: (val: string, other?: string) => boolean; errorKey: keyof typeof error; errorMsg: string }> = {
    name: { fn: checkName, errorKey: "nameError", errorMsg: "EnterCorrectName" },
    email: { fn: checkEmail, errorKey: "emailError", errorMsg: "EnterCorrectEmail" },
    password: { fn: checkPassword, errorKey: "passwordError", errorMsg: "EnterCorrectPassword" },
    confirmPassword: {
      fn: (val) => checkConfirmPassword(password, val),
      errorKey: "confirmPasswordError",
      errorMsg: "ConfirmPasswordSame",
    },
  };

  const updateError = (key: string, value: string) => {
    setError((prevError) => ({ ...prevError, [key]: t(value) }))
  };

  const updateState = (key: keyof typeof state, value: string) => {
    const validator = validators[key];
    if (validator) {
      const isValid = key === "confirmPassword"
        ? validator.fn(value, password) // confirm needs password too
        : validator.fn(value);

      updateError(validator.errorKey, isValid ? "" : validator.errorMsg);
    }

    setState((prev) => ({ ...prev, [key]: value }));
  };
  const onSignUp = () => {
    let hasError = false;

    Object.entries(validators).forEach(([field, { fn, errorKey, errorMsg }]) => {
      const value = state[field as keyof typeof state];
      const isValid = field === "confirmPassword"
        ? fn(value, password)
        : fn(value);

      if (!value) {
        updateError(errorKey, `Empty${field.charAt(0).toUpperCase() + field.slice(1)}`);
        hasError = true;
      } else if (!isValid) {
        updateError(errorKey, errorMsg);
        hasError = true;
      }
    });

    if (!hasError) {
      signUp(state);
    }
  };
  return (
    <WrapperContainer
      contentContainerStyle={styles.mainContainerStyle}
      useScroll>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(64) : verticalScale(30)}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
            error={nameError}
            focusable
          />
          <UserInput
            inputContainerStyle={styles.inputContainerStyle}
            lable={t("YourEmail")}
            value={email}
            onChangeText={(text) => updateState('email', text)}
            error={emailError}
            focusable
          />
          <UserInput
            inputContainerStyle={styles.inputContainerStyle}
            lable={t("Password")}
            value={password}
            onChangeText={(text) => updateState('password', text)}
            error={passwordError}
            secureTextEntry={true}
            focusable
          />
          <UserInput
            inputContainerStyle={styles.inputContainerStyle}
            lable={t("ConfirmPassword")}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => updateState('confirmPassword', text)}
            error={confirmPasswordError}
            focusable
          />
          <View style={styles.buttonStyle}>
            <Button label={t('CreateAnAccount')} onPress={onSignUp} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  )
}

export default Signup
