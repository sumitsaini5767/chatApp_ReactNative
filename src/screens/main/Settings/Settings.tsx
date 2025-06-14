import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WrapperContainer } from '../../../components/Componets'
import { CommonColors } from '../../../styles/Colors'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigations/types';
import imagepath from '../../../constants/imagepath'
import setUserAction from '../../../Redux/actions/userDetail'
import Dropdown from '../../../components/Dropdown/Dropdown'
import { changeAppLanguage } from '../../../utils/languageUtils'
import { useTranslation } from 'react-i18next'
import { getLanguage } from '../../../localStorage/mmkv'
type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Settings'>;
const Settings = () => {
    const {t}=useTranslation();
    const navigation = useNavigation<NavigationProp>();
    const languages = ['हिन्दी', 'English']
    const changeLanguage = (lang: string) => {
        changeAppLanguage(lang === 'हिन्दी' ? 'hi' : 'en');
    }
    const selectedLang=getLanguage();
    return (
        <WrapperContainer
            backgroundColor={CommonColors.black}>
            <View style={styles.upperContainer}>
                <Text style={styles.headline}>{t("Settings")}</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.lowerConatiner}>
                <View style={styles.profile}>
                    <Image source={imagepath.user} style={styles.userImage} />
                    <Text style={styles.profileText}>Rahul Kumar</Text>
                </View>
                <TouchableOpacity style={styles.container}>
                    <Image
                        source={imagepath.Profile}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.lable}>{t("editProfile")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.container, zIndex: 999 }}>
                    <Image
                        source={imagepath.Language}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Dropdown
                        placeHolder={selectedLang=="en"?"English":"हिन्दी"}
                        options={languages}
                        containerStyle={styles.dropdown}
                        onSelect={changeLanguage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.container}
                    onPress={() => setUserAction(false)}
                >
                    <Image
                        source={imagepath.logout}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.lable}>{t("Logout")}</Text>
                </TouchableOpacity>
            </ScrollView>
        </WrapperContainer>
    )
}

export default Settings

