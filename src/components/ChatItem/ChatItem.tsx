import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {styles} from './style';
import { ChatMessage } from '../../constants/Allinterface';



const ChatItem = (item:ChatMessage) => {
  return (
    <TouchableOpacity style={styles.chatItemContainer}>
            <Image source={item?.user?.image} style={styles.chatUserImage} />
            <View style={styles.chatContentContainer}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatUserName}>{item?.user?.name}</Text>
                <Text style={styles.chatTimestamp}>{item?.timestamp}</Text>
              </View>
              <View style={styles.chatMessageContainer}>
                <Text style={styles.chatMessage} numberOfLines={1}>{item?.message}</Text>
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