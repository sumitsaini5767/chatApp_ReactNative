import React, { use } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { styles } from './styles';
import imagepath from '../../../constants/imagepath';
import Backbutton from '../../../components/backbutton/Backbutton';
import { height } from '../../../styles/commonStyle';
import { CommonColors } from '../../../styles/Colors';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DateTimeConversion } from '../../../utils/helperFunction';
import { useChatMessages } from '../../../hooks/useChatMessages';
import { useChatMessageSocket } from '../../../hooks/useSocket';
import { Avatar } from '../../../components/Componets';
import ChatShimmer from '../../../components/shimmers/ChatShimmer';
import { useAppStatus } from '../../../hooks/useAppStatus';

interface Message {
  _id?: string;
  receiver: string;
  sender: string;
  message: string;
  timestamp?: string;
  isRead?: boolean
}

type RouteParams = {
  roomId: string;
  currentUser: any;
  targetUser: any;
};

export default function ChatScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const appState = useAppStatus();
  const colorScheme = useColorScheme();
  const {
    chatMessages,
    isLoadingMore,
    isKeyboardVisible,
    keyboardHeight,
    currentUser,
    targetUser,
    messageText,
    viewabilityConfig,
    flatListRef,
    isLoding,
    loadMoreMessages,
    handleMessageSeen,
    scrollToEnd,
    handleSend,
    setMessageText,
    onViewableItemsChanged,
    setChatMessages
  } = useChatMessages(route.params, appState);

  const {
    roomActiveUsers,
    isTyping,
  } = useChatMessageSocket(route.params, appState,setChatMessages,scrollToEnd,handleMessageSeen);

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender === currentUser?._id;
    const formatted = DateTimeConversion(`${item?.timestamp}`);
    return (
      <View style={[styles.messageBubble, isCurrentUser ? styles.sent : styles.received]}>
        <Text style={[styles.messageText, isCurrentUser ? styles.sent : styles.received]}>
          {item.message}
        </Text>
        <View style={[styles.messageStatus, isCurrentUser ?
          { justifyContent: 'flex-end' }
          : { justifyContent: 'flex-start' }]}>
          <Text style={[styles.time, isCurrentUser ? styles.sent : styles.received]}>
            {formatted}
          </Text>
          {(isCurrentUser && item?.isRead) && <Image
            source={imagepath.seen}
            style={styles.seenImage}
          />}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.mainContainer}
    >
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
        translucent={Platform.OS === 'ios'}
      />
      <View style={{ height: isKeyboardVisible ? height - keyboardHeight : height }}>
        <View style={styles.header}>
          <Backbutton />
          <Avatar name={targetUser?.name as string} size={45} imageUri={targetUser?.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.username}>{targetUser?.name || 'User'}</Text>
            {isTyping ? <Text style={styles.status}>Typing...</Text>
              : roomActiveUsers.includes(targetUser?._id) && <Text style={styles.status}>online</Text>}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {isLoding ? <ChatShimmer /> : <FlatList
            ref={flatListRef}
            data={chatMessages}
            renderItem={renderMessage}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() =>
              isLoadingMore ? <ActivityIndicator size="small" color="#000" /> : null
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContainer}
            onScroll={({ nativeEvent }) => {
              if (nativeEvent.contentOffset.y <= 0 && !isLoadingMore) {
                loadMoreMessages();
              }
            }}
            scrollEventThrottle={16}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          }
        </View>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder={t('WriteYourMessage')}
            placeholderTextColor={CommonColors.black}
            value={messageText}
            onChangeText={setMessageText}
          />
          <TouchableOpacity onPress={handleSend}>
            <Image source={imagepath.send} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
