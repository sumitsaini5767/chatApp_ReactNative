import React from 'react';
import { WrapperContainer ,Backbutton ,SocialLogin ,UserInput , Button} from '../../../components/Componets'; 
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import setUserAction from '../../../Redux/actions/userDetail';

const Login = () => {
  const navigation = useNavigation();
  return (
    <WrapperContainer
      contentContainerStyle={styles.mainContainerStyle}
      useScroll={true}>
      <Backbutton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.topHeading}>Log in to Chatbox</Text>
      <Text style={styles.bottomHeading}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>
      <SocialLogin
        imageContainerStyle={styles.socialImageContainer}
        isdark={true}
      />
      {/* or container */}
      <View style={styles.OrContainer}>
        <View style={styles.orLines} />
        <Text style={styles.orTitle}>OR</Text>
        <View style={styles.orLines} />
      </View>
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable="Your email"
        autoFocus
      />
      <UserInput
        inputContainerStyle={styles.inputContainerStyle}
        lable="Password"
        secureTextEntry
        focusable
      />
      <View style={styles.buttonStyle}>
        <Button lable='Log in' onPress={()=>{setUserAction(true);}} />
        <TouchableOpacity style={styles.forgetPassword}>
          <Text style={styles.forgetPasswordText} >Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default Login;
