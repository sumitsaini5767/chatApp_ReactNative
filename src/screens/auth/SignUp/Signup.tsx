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

const Signup = () => {
    const navigation=useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <WrapperContainer
      contentContainerStyle={styles.mainContainerStyle}
      useScroll={true}>
      <Backbutton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.topHeading}>Sign up with Email</Text>
      <Text style={styles.bottomHeading}>
      Get chatting with friends and family today by signing up for our chat app!
      </Text>
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable="Your name"
        autoFocus
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable="Your email"
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable="Password"
        secureTextEntry
        focusable
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable="Confirm Password"
        secureTextEntry
        focusable
      />
      <View style={styles.buttonStyle}>
        <Button lable='Create an account'/>
      </View>
    </WrapperContainer>
  )
}

export default Signup
