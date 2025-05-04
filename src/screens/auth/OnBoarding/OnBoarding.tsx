import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import imagepath from '../../../constants/imagepath';
import {useNavigation} from '@react-navigation/native';
import {WrapperContainer, SocialLogin} from '../../../components/Componets';
import {CommonColors} from '../../../styles/Colors';
import {useTranslation} from 'react-i18next';
import '../../../localization/i18n';
import {changeAppLanguage} from '../../../utils/languageUtils';
import { getLanguage } from '../../../localStorage/mmkv';

const OnBoarding = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const selectedLanguage=getLanguage();
  console.log(selectedLanguage,"dfdfdfdf");
  return (
    <WrapperContainer backgroundColor={CommonColors.themeMain}>
      {/* language change icon */}
      <View style={styles.TopContainer}>
        <TouchableOpacity
          onPress={() => {
            changeAppLanguage(selectedLanguage=='hi'?'en':'hi');
          }}
          style={styles.translateImageContainer}>
          <Image source={imagepath.translate} style={styles.translateImage} />
        </TouchableOpacity>
      </View>
      {/* logo section */}
      <Image source={imagepath.gradientCircleBg} style={styles.bgCircleImage} />
      <View style={styles.LogoContainer}>
        <Image source={imagepath.c_Letter} style={styles.cLetterImage} />
        <Text style={styles.LogoTitle}>Chatbox</Text>
      </View>
      <ScrollView style={styles.MainContainer}>
        {/* title section */}
        <Text style={styles.Title}>Connect friends</Text>
        <Text style={styles.Title1}>easily & quickly</Text>

        {/* subtitile section */}
        <Text style={styles.subtitle}>
          Our chat app is the perfect way to stay connected with friends and
          family.
        </Text>
        <SocialLogin />
        {/* or container */}
        <View style={styles.OrContainer}>
          <View style={styles.orLines} />
          <Text style={styles.orTitle}>OR</Text>
          <View style={styles.orLines} />
        </View>

        {/* button */}
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.ButtonText}>Sign up with mail</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ExistingAccountContainer}>
          <Text style={styles.ExistingAccountText}>Existing account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.LoginButtontext}>{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default OnBoarding;
