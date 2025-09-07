import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import imagepath from '../../constants/imagepath';
import { useTranslation } from 'react-i18next';
import { googleLogin } from '../../utils/socialLogins';
import { googleSignIn } from '../../Redux/actions/userDetail';
import { CommonColors } from '../../styles/Colors';
interface props {
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  isdark?: boolean;
  isFacebook?: boolean;
  isGoogle?: boolean;
  isApple?: boolean;
}
const SocialLogin: React.FC<props> = ({
  containerStyle,
  imageContainerStyle,
  isdark,
  isFacebook,
  isGoogle,
  isApple,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const SocialLogin = async (type: string) => {
    if (type === 'google') {
      try {
        setIsLoading(true);
        const token = await googleLogin();
        if (!!token) {
          googleSignIn(token as string);
        }
      } catch (error) {
        console.log(error, "error in social login");
      } finally {
        setIsLoading(false)
      }
    } else if (type === 'facebook') {
      // facebook login function
    } else if (type === 'apple') {
      // apple login function
    }
    return;
  };
  return (
    <>
      <View style={[styles.socialLoginContainer, containerStyle]}>
        {(isFacebook && !isLoading) && <TouchableOpacity
          onPress={() => SocialLogin('facebook')}
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={imagepath.facebookIcon} style={styles.SocialImage} />
        </TouchableOpacity>}
        {(isGoogle && !isLoading) && <TouchableOpacity
          onPress={() => SocialLogin('google')}
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={imagepath.googleIcon} style={styles.SocialImage} />
        </TouchableOpacity>}
        {(isApple && !isLoading) && <TouchableOpacity
          onPress={() => SocialLogin('apple')}
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={isdark ? imagepath.darkappleIcon : imagepath.appleIcon} style={styles.SocialImage} />
        </TouchableOpacity>}
        {isLoading && <ActivityIndicator size='large' color={isdark?CommonColors.black:CommonColors.white} />}
      </View>
      {/* OR separator */}
      <View style={styles.OrContainer}>
        <View style={styles.orLines} />
        <Text style={styles.orTitle}>{t('OR')}</Text>
        <View style={styles.orLines} />
      </View>
    </>
  );
};

export default SocialLogin;
