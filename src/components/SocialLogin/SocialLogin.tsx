import {
  Image,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {styles} from './style';
import imagepath from '../../constants/imagepath';
interface props {
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  isdark?:boolean;
}
const SocialLogin: React.FC<props> = ({
  containerStyle,
  imageContainerStyle,
  isdark
}) => {
  return (
    <>
      <View style={[styles.socialLoginContainer, containerStyle]}>
        <TouchableOpacity
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={imagepath.facebookIcon} style={styles.SocialImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={imagepath.googleIcon} style={styles.SocialImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={isdark?imagepath.darkappleIcon:imagepath.appleIcon} style={styles.SocialImage}/>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialLogin;
