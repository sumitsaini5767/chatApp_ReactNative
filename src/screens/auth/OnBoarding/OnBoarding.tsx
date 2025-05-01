import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import imagepath from '../../../constants/imagepath';
import {useNavigation} from '@react-navigation/native';
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer';
import {CommonColors} from '../../../styles/Colors';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <WrapperContainer
      backgroundColor={CommonColors.themeMain}
      contentContainerStyle={styles.MainContainer}>
      {/* logo section */}
      <Image source={imagepath.gradientCircleBg} style={styles.bgCircleImage} />
      <View style={styles.LogoContainer}>
        <Image source={imagepath.c_Letter} style={styles.cLetterImage} />
        <Text style={styles.LogoTitle}>Chatbox</Text>
      </View>

      {/* title section */}
      <Text style={styles.Title}>Connect friends</Text>
      <Text style={styles.Title1}>easily & quickly</Text>

      {/* subtitile section */}
      <Text style={styles.subtitle}>
        Our chat app is the perfect way to stay connected with friends and
        family.
      </Text>
      <SocialLogin/>
      {/* or container */}
      <View style={styles.OrContainer}>
        <View style={styles.orLines} />
        <Text style={styles.orTitle}>OR</Text>
        <View style={styles.orLines} />
      </View>

      {/* button */}
      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.Button}
        onPress={()=>{
          navigation.navigate('Signup');
        }}
        >
          <Text style={styles.ButtonText}>Sign up with mail</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ExistingAccountContainer}>
        <Text style={styles.ExistingAccountText}>Existing account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.LoginButtontext}>Login</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default OnBoarding;
