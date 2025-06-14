import React from 'react';
import { WrapperContainer, UserInput, Button ,SocialLogin } from '../../../components/Componets';
import {Backbutton} from '../../../components/Componets';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { styles } from './styles';
import { AuthStackParamList } from '../../../navigations/types';
import { useTranslation } from 'react-i18next';

const Signup = () => {
    const navigation=useNavigation<NavigationProp<AuthStackParamList>>();
    const {t}=useTranslation();
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
        autoFocus
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("YourEmail")}
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("Password")}
        secureTextEntry
        focusable
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable={t("ConfirmPassword")}
        secureTextEntry
        focusable
      />
      <View style={styles.buttonStyle}>
        <Button lable={t('CreateAnAccount')}/>
      </View>
    </WrapperContainer>
  )
}

export default Signup
