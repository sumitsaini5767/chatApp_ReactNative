import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { Avatar, Backbutton, Button, UserInput, WrapperContainer } from '../../../components/Componets'
import { CommonColors } from '../../../styles/Colors'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { verticalScale } from '../../../styles/scaling'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheetModal from '../../../components/BottomSheetModal/BottomSheetModal'
import { openCamera, openGallery } from '../../../utils/imagePicker'
import { editProfileApi } from '../../../Redux/actions/userDetail'
import { showError } from '../../../utils/helperFunction'
import { checkName } from '../../../utils/validations'

const EditProfile = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.userDetail);
    const [image, setImage] = React.useState<any>();
    const [isModal, setIsModal] = React.useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [state, setState] = React.useState({
        name: user?.name || '',
        currentPassword: '',
        newPassword: '',
    })
    const { name, currentPassword, newPassword } = state;
    const updateState = (key: string, value: string) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }
    const selectImage = async (type: number) => {
        if (type == 0) {
            const res = await openCamera();
            setImage(res);
            setIsModal(false);
        } else if (type == 1) {
            const res = await openGallery();
            setImage(res);
            setIsModal(false);
        }
    }
    const submit = async () => {
        try {
            if (currentPassword && !newPassword) {
                showError("Please enter a new password");
                return;
            }
            if (newPassword && !currentPassword) {
                showError("Please enter your current password");
                return;
            }
            let isValid = checkName(name);
            if (!isValid) {
                showError(t("EnterCorrectName"));
                return;
            }
            const data = new FormData();
            data.append('name', name);
            if (currentPassword && newPassword) {
                data.append('password', currentPassword);
                data.append('confirm_password', newPassword);
            }
            if (image) {
                data.append('image', {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName || `photo.${image.uri.split('.').pop()}`,
                });
            }
            setIsLoading(true);
            const res = await editProfileApi(data);
            console.log("res==>", res);
        } catch (error) {
            console.log("Error==>", error);
        } finally{
            setIsLoading(false);
        }
    }
    return (
        <WrapperContainer backgroundColor={CommonColors.black} >
            <View style={styles.upperContainer}>
                <Backbutton style={styles.backButton} tintColor={CommonColors.white} />
                <Text style={styles.headline}>{t("EditProfile")}</Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : 'height'}
                keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(64) : verticalScale(0)}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.lowerConatiner}
                >
                    <View style={styles.profile}>
                        <Avatar name={user?.name as string} size={120} imageUri={image?.uri ?? user?.image} />
                        <TouchableOpacity style={styles.cameraIcon} onPress={() => setIsModal(true)}>
                            <MaterialIcons name="photo-camera" size={35} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <UserInput
                        inputContainerStyle={styles.inputContainerStyle}
                        lable={t('Name')}
                        value={name}
                        onChangeText={(text) => updateState('name', text)}
                    />
                    <UserInput
                        inputContainerStyle={styles.inputContainerStyle}
                        lable={t('CurrentPassword')}
                        value={currentPassword}
                        onChangeText={(text) => updateState('currentPassword', text)}
                        secureTextEntry
                    />
                    <UserInput
                        inputContainerStyle={styles.inputContainerStyle}
                        lable={t('NewPassword')}
                        value={newPassword}
                        onChangeText={(text) => updateState('newPassword', text)}
                        secureTextEntry
                    />
                    <Button 
                    isLoading={isLoading}
                    containerStyle={styles.button} 
                    label={t('SaveChanges')} 
                    onPress={submit} />
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomSheetModal visible={isModal} onClose={() => setIsModal(false)}>
                <View style={{ paddingVertical: verticalScale(20) }}>
                    <Text style={styles.title}>{t('ChangeProfilePhoto')}</Text>
                    <Text style={styles.subtitle}>{t('ChooseFrom')}</Text>
                </View>
                <Button
                    containerStyle={{ marginBottom: verticalScale(10) }}
                    label={t('TakePhoto')}
                    onPress={() => selectImage(0)} />
                <Button
                    containerStyle={{ marginBottom: verticalScale(10) }}
                    label={t('ChooseFromLibrary')}
                    onPress={() => selectImage(1)} />
                <Button label={t('Cancel')}
                    onPress={() => setIsModal(false)} />
            </BottomSheetModal>
        </WrapperContainer>
    )
}

export default EditProfile
