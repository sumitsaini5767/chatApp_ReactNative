import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, WrapperContainer } from '../../../components/Componets'
import { CommonColors } from '../../../styles/Colors'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigations/types';
import imagepath from '../../../constants/imagepath'
import Dropdown from '../../../components/Dropdown/Dropdown'
import { changeAppLanguage } from '../../../utils/languageUtils'
import { useTranslation } from 'react-i18next'
import { getLanguage } from '../../../localStorage/mmkv'
import { logout } from '../../../Redux/actions/userDetail'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Settings'>;
const Settings = () => {
    const user = useSelector((state: RootState) => state.userDetail);
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();
    const languages = ['हिन्दी', 'English']
    const changeLanguage = (lang: string) => {
        changeAppLanguage(lang === 'हिन्दी' ? 'hi' : 'en');
    }
    const selectedLang = getLanguage();
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
                    <Avatar name={user?.name as string} size={80} />
                    <Text style={styles.profileText}>{user?.name}</Text>
                    <Text style={styles.profileDecs}>{user?.email}</Text>
                </View>
                <TouchableOpacity style={styles.container}>
                    <MaterialIcons name="person" size={30} color="#333" />
                    <Text style={styles.lable}>{t("editProfile")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.container, zIndex: 999 }}>
                    <MaterialIcons name="language" size={30} color="#333" />
                    <Dropdown
                        placeHolder={selectedLang == "en" ? "English" : "हिन्दी"}
                        options={languages}
                        containerStyle={styles.dropdown}
                        onSelect={changeLanguage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={logout}>
                    <MaterialIcons name="logout" size={30} color="#333" />
                    <Text style={styles.lable}>{t("Logout")}</Text>
                </TouchableOpacity>
            </ScrollView>
        </WrapperContainer>
    )
}

export default Settings

