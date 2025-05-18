import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from './styles'; // Create a styles file for ChatScreen
import imagepath from '../../constants/imagepath';

const messages = [
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
    id: '6',
    type: 'voice',
    duration: '00:16',
    time: '09:25 AM',
  },
];

export default function ChatScreen() {
  const inputRef = useRef<TextInput>(null);

  const renderMessage = ({ item }) => {
    if (item.type === 'voice') {
      return (
        <View style={styles.voiceMessageContainer}>
          <TouchableOpacity style={styles.playButton}>
            <Image source={imagepath.play} style={styles.playIcon} />
          </TouchableOpacity>
          <View style={styles.voiceBar} />
          <Text style={styles.voiceDuration}>{item.duration}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      );
    }
    return (
      <View
        style={[
          styles.messageBubble,
          item.type === 'sent' ? styles.sent : styles.received,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={imagepath.back} style={styles.icon} />
        </TouchableOpacity>
        <Image source={imagepath.user} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.username}>Jhon Abraham</Text>
          <Text style={styles.status}>Active now</Text>
        </View>
        <TouchableOpacity>
          <Image source={imagepath.call} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={imagepath.video} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity>
          <Image source={imagepath.attach} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Write your message"
        />
        <TouchableOpacity>
          <Image source={imagepath.camera} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={imagepath.send} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}