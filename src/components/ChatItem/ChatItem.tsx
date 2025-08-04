import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './style';
import { ChatMessage } from '../../constants/Allinterface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigations/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import imagepath from '../../constants/imagepath';
import { joinRoom } from '../../utils/sockets';
import { DateTimeConversion } from '../../utils/helperFunction';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Chat'>;

const ChatItem = (item: ChatMessage) => {
  const navigation = useNavigation<NavigationProp>();
  const user = useSelector((state: RootState) => state.userDetail);
  const handleChatPress = () => {
    const roomId = [user?._id, item?.user?._id].sort().join('_');
    navigation.navigate('Chat', {
      roomId: roomId,
      currentUser: user,
      targetUser: item?.user
    });
    joinRoom(roomId);
  };
  let formattedDate=DateTimeConversion(`${item?.timestamp}`);
  return (
    <TouchableOpacity style={styles.chatItemContainer} onPress={handleChatPress}>
      <Image source={imagepath.Profile} style={styles.chatUserImage} resizeMode='contain' />
      <View style={styles.chatContentContainer}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatUserName}>{item?.user?.name}</Text>
          <Text style={styles.chatTimestamp}>{formattedDate}</Text>
        </View>
        <View style={styles.chatMessageContainer}>
          <Text style={styles.chatMessage} numberOfLines={1}>{item?.lastMessage}</Text>
          {item?.unreadCount && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item?.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatItem