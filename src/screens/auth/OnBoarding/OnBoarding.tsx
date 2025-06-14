import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import imagepath from '../../../constants/imagepath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {WrapperContainer, SocialLogin} from '../../../components/Componets';
import {CommonColors} from '../../../styles/Colors';
import {useTranslation} from 'react-i18next';
import '../../../localization/i18n';
import {changeAppLanguage} from '../../../utils/languageUtils';
import { getLanguage } from '../../../localStorage/mmkv';
import { AuthStackParamList } from '../../../navigations/types';

const OnBoarding = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const selectedLanguage=getLanguage();
  const{t}=useTranslation();
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
        <Text style={styles.Title}>{t("ConnectFriends")}</Text>
        <Text style={styles.Title1}>{t('Easily_Quickly')}</Text>

        {/* subtitile section */}
        <Text style={styles.subtitle}>{t("Our_Chat")}</Text>
        <SocialLogin />
        {/* or container */}
        <View style={styles.OrContainer}>
          <View style={styles.orLines} />
          <Text style={styles.orTitle}>{t('OR')}</Text>
          <View style={styles.orLines} />
        </View>

        {/* button */}
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.ButtonText}>{t("SignUpWithMail")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ExistingAccountContainer}>
          <Text style={styles.ExistingAccountText}>{t('ExistingAccount')}</Text>
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
