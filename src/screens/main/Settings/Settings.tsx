import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WrapperContainer } from '../../../components/Componets'
import { CommonColors } from '../../../styles/Colors'
import { t } from 'i18next'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigations/types';
import imagepath from '../../../constants/imagepath'
import setUserAction from '../../../Redux/actions/userDetail'
import Dropdown from '../../../components/Dropdown/Dropdown'
type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'UserStatus'>;
const Settings = () => {
    const navigation = useNavigation<NavigationProp>();
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
                <TouchableOpacity style={styles.container}>
                    <Image
                        source={imagepath.Language}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.lable}>{t("changeLanguage")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container}
                onPress={()=>setUserAction(false)}
                >
                    <Image
                        source={imagepath.logout}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.lable}>{t("Logout")}</Text>
                </TouchableOpacity>
                <Dropdown/>
            </ScrollView>
        </WrapperContainer>
    )
}

export default Settings

