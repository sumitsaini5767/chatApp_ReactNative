import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { styles } from './style';
import imagepath from '../../constants/imagepath';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <>
      <View style={[styles.socialLoginContainer, containerStyle]}>
        {isFacebook && <TouchableOpacity
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={imagepath.facebookIcon} style={styles.SocialImage} />
        </TouchableOpacity>}
        {isGoogle && <TouchableOpacity
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={imagepath.googleIcon} style={styles.SocialImage} />
        </TouchableOpacity>}
        {isApple && <TouchableOpacity
          style={[styles.socialImageContainer, imageContainerStyle]}>
          <Image source={isdark ? imagepath.darkappleIcon : imagepath.appleIcon} style={styles.SocialImage} />
        </TouchableOpacity>}
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
