import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import { styles } from './styles'; // Create a styles file for ChatScreen
import imagepath from '../../constants/imagepath';
import { Backbutton, WrapperContainer } from '../../components/Componets';
import { height } from '../../styles/commonStyle';
import { CommonColors } from '../../styles/Colors';

interface Message {
  id: string;
  type: 'sent' | 'received';
  text: string;
  time: string;
}

const messages: Message[] = [
  {
    id: '1',
    type: 'sent',
    text: 'Hello! Jhon abraham',
    time: '09:25 AM',
  },
  {
    id: '2',
    type: 'received',
    text: 'Hello ! Nazrul How are you?',
    time: '09:25 AM',
  },
  {
    id: '3',
    type: 'sent',
    text: 'You did your job well!',
    time: '09:25 AM',
  },
  {
    id: '4',
    type: 'received',
    text: 'Have a great working week!!',
    time: '09:25 AM',
  },
  {
    id: '5',
    type: 'received',
    text: 'Hope you like it',
    time: '09:25 AM',
  },
  {
    id: '4',
    type: 'received',
    text: 'Have a great working week!!',
    time: '09:25 AM',
  },
  {
    id: '5',
    type: 'received',
    text: 'Hope you like it',
    time: '09:25 AM',
  },
];

export default function ChatScreen() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setIsKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
        scrollToEnd();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.messageBubble,
          item.type === 'sent' ? styles.sent : styles.received,
        ]}
      >
        <Text style={[
          styles.messageText,
          item.type === 'sent' ? styles.sent : styles.received,
        ]}>{item.text}</Text>
        <Text style={[styles.time,
        item.type === 'sent' ? styles.sent : styles.received,
        ]}>{item.time}</Text>
      </View>
    );
  };

  return (
    <WrapperContainer>
      {/* Header */}
      <View style={{ height: isKeyboardVisible ? height - keyboardHeight : height }}>
        <View style={styles.header}>
          <Backbutton />
          <Image source={imagepath.user} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.username}>Jhon Abraham</Text>
            <Text style={styles.status}>Active now</Text>
          </View>
        </View>
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Write your message"
            placeholderTextColor={CommonColors.black}
          />
          <TouchableOpacity>
            <Image source={imagepath.send} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
}