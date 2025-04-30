import React from 'react';
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import Backbutton from '../../../components/backbutton/Backbutton';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import imagepath from '../../../constants/imagepath';
import {CommonColors} from '../../../styles/Colors';

const Login = () => {
  const navigation = useNavigation();
  return (
    <WrapperContainer contentContainerStyle={styles.mainContainerStyle}>
      <Backbutton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.topHeading}>Log in to Chatbox</Text>
      <Text style={styles.bottomHeading}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>

      {/* social login seciton */}
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialImageContainer}>
          <Image source={imagepath.facebookIcon} style={styles.SocialImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialImageContainer}>
          <Image source={imagepath.googleIcon} style={styles.SocialImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialImageContainer}>
          <Image
            source={imagepath.appleIcon}
            style={styles.SocialImage}
            tintColor={CommonColors.black}
          />
        </TouchableOpacity>
      </View>
      {/* or container */}
      <View style={styles.OrContainer}>
        <View style={styles.orLines} />
        <Text style={styles.orTitle}>OR</Text>
        <View style={styles.orLines} />
      </View>
    </WrapperContainer>
  );
};

export default Login;
