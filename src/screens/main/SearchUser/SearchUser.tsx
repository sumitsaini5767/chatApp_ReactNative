import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ListRenderItem
} from 'react-native'
import React, { useCallback } from 'react'
import { Backbutton, WrapperContainer } from '../../../components/Componets'
import { CommonColors } from '../../../styles/Colors'
import imagepath from '../../../constants/imagepath'
import { styles } from './styles'
import { chatMessages } from '../../../constants/DummyData'
import { ChatMessage, User } from '../../../constants/Allinterface'
import ChatItem from '../../../components/ChatItem/ChatItem'
import { useTranslation } from 'react-i18next'
const SearchUser = () => {
    const{t}=useTranslation();
    const renderChatItem: ListRenderItem<ChatMessage> = useCallback(({ item }) => {
        return (
            <ChatItem
                user={item.user}
                message={item.message}
                timestamp={item.timestamp}
                unreadCount={item.unreadCount}
            />
        );
    }, []);
    const keyExtractor =
        useCallback((item: User | ChatMessage) => item.id ? item.id.toString() : '', []);
    return (
        <WrapperContainer>
            <Backbutton tintColor={CommonColors.black} />
            <View style={styles.searchContainer}>
                <Image
                    source={imagepath.search}
                    tintColor={CommonColors.black}
                    style={styles.searchIcon}
                    resizeMode="contain"
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('search')}
                    placeholderTextColor={CommonColors.black}
                />
                <TouchableOpacity style={styles.crossImageContainer}>
                    <Image source={imagepath.cross}
                        style={styles.crossImage}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={chatMessages}
                renderItem={renderChatItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.chatListContainer}
                ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
                ListHeaderComponent={() => {
                    return <Text style={styles.heading}>
                        {t("People")}
                    </Text>
                }}
            />
        </WrapperContainer>
    )
}

export default SearchUser;