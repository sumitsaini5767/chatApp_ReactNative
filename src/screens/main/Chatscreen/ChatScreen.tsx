import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from './styles';
import imagepath from '../../../constants/imagepath';
import { WrapperContainer } from '../../../components/Componets';
import Backbutton from '../../../components/backbutton/Backbutton';
import { height } from '../../../styles/commonStyle';
import { CommonColors } from '../../../styles/Colors';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import {
  leaveRoom,
  offEvent,
  onMessageReceived,
  sendMessage,
} from '../../../utils/sockets';
import { getMessages } from '../../../Redux/actions/userDetail';
import { DateTimeConversion } from '../../../utils/helperFunction';

interface Message {
  receiver: string;
  sender: string;
  message: string;
  timestamp?: string;
}

type RouteParams = {
  roomId: string;
  currentUser: any;
  targetUser: any;
};

export default function ChatScreen() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { t } = useTranslation();
  const route = useRoute();
  const { roomId, currentUser, targetUser } = route.params as RouteParams;
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    onMessageReceived((data: any) => {
      setChatMessages((prev) => [...prev, data]);
      scrollToEnd();
    });
    return () => {
      offEvent('receive_message');
      leaveRoom(roomId, currentUser?._id);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let data = await getMessages({ roomId });
      setChatMessages(data?.messages)
    })()
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
      scrollToEnd();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSend = () => {
    if (messageText.trim().length === 0) return;

    const messageData: Message = {
      receiver: targetUser?._id,
      sender: currentUser?._id,
      message: messageText.trim(),
      timestamp: new Date().toISOString(),
    };
    sendMessage(messageData);
    setChatMessages((prev) => [...prev, messageData]);
    setMessageText('');
    scrollToEnd();
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender === currentUser?._id;
    const formatted = DateTimeConversion(`${item?.timestamp}`);
    return (
      <View style={[styles.messageBubble, isCurrentUser ? styles.sent : styles.received]}>
        <Text style={[styles.messageText, isCurrentUser ? styles.sent : styles.received]}>
          {item.message}
        </Text>
        <Text style={[styles.time, isCurrentUser ? styles.sent : styles.received]}>
          {formatted}
        </Text>
      </View>
    );
  };

  return (
    // <WrapperContainer useScroll={true}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.mainContainer}
    >
      <View style={{ height: isKeyboardVisible ? height - keyboardHeight : height }}>
        <View style={styles.header}>
          <Backbutton />
          <Image source={imagepath.user} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.username}>{targetUser?.name || 'User'}</Text>
            <Text style={styles.status}>Active now</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            renderItem={renderMessage}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContainer}
            onContentSizeChange={scrollToEnd}
            onLayout={scrollToEnd}
          />
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
    //  </WrapperContainer>
  );
}
