import React from 'react';
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer';
import Backbutton from '../../../components/backbutton/Backbutton';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';
import UserInput from '../../../components/UserInput/UserInput';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import { styles } from './styles';

const Signup = () => {
    const navigation=useNavigation();
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
