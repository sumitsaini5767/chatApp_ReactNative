import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useCallback} from 'react';
import {WrapperContainer} from '../../components/Componets';
import {styles} from './styles';
import imagepath from '../../constants/imagepath';
import { ChatMessage, User } from '../../constants/Allinterface';
import ChatItem from '../../components/ChatItem/ChatItem';

export default function Home() {
  const statusList: User[] = [
    {
      id: 1,
      image: imagepath.user,
      name: 'My status',
      isMyStatus: true,
    },
    {
      id: 2,
      image: imagepath.user,
      name: 'Adil',
    },
    {
      id: 3,
      image: imagepath.user,
      name: 'Marina',
    },
    {
      id: 4,
      image: imagepath.user,
      name: 'Dean',
    },
    {
      id: 5,
      image: imagepath.user,
      name: 'Max',
    },
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      user: {
        id: 1,
        image: imagepath.user,
        name: 'Alex Linderson',
      },
      message: 'How are you today?',
      timestamp: '2 min ago',
      unreadCount: 3,
    },
    {
      id: 2,
      user: {
        id: 2,
        image: imagepath.user,
        name: 'Team Align',
      },
      message: "Don't miss to attend the meeting.",
      timestamp: '2 min ago',
      unreadCount: 4,
    },
    {
      id: 3,
      user: {
        id: 3,
        image: imagepath.user,
        name: 'John Ahraham',
      },
      message: 'Hey! Can you join the meeting?',
      timestamp: '2 min ago',
      unreadCount: 1,
    },
    {
      id: 4,
      user: {
        id: 4,
        image: imagepath.user,
        name: 'Sabila Sayma',
      },
      message: 'How are you today?',
      timestamp: '2 min ago',
    },
    {
      id: 5,
      user: {
        id: 5,
        image: imagepath.user,
        name: 'John Borino',
      },
      message: 'Have a good day ❤️',
      timestamp: '2 min ago',
    },
  ];

  const renderStatus: ListRenderItem<User> = useCallback(({item}) => {
    return (
      <TouchableOpacity 
        style={styles.statusContainer}
        accessible={true}
        accessibilityLabel={`View ${item.name}'s status`}
        accessibilityRole="button"
      >
        <View style={styles.statusImageContainer}>
          <Image 
            source={item.image} 
            style={styles.statusImage}
          />
          {item.isMyStatus && (
            <View style={styles.addStatusButton}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          )}
        </View>
        <Text style={styles.statusName} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  const renderChatItem : ListRenderItem<ChatMessage> = useCallback(({item}) => {
    return (
      <ChatItem
        user={item.user}
        message={item.message}
        timestamp={item.timestamp}
        unreadCount={item.unreadCount}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: User | ChatMessage) => item.id.toString(), []);

  return (
    <WrapperContainer backgroundColor="#000000">
      <View style={styles.upperContainer}>
        <TouchableOpacity style={styles.searchContainer}>
          <Image source={imagepath.search} style={styles.searchImage} />
        </TouchableOpacity>
        <Text style={styles.headline}>Home</Text>
        <TouchableOpacity>
          <Image source={imagepath.user} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusSection}>
        <FlatList 
          data={statusList}
          renderItem={renderStatus}
          keyExtractor={keyExtractor}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusListContainer}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />
      </View>

      <View style={styles.chatSection}>
        <FlatList 
          data={chatMessages}
          renderItem={renderChatItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatListContainer}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </WrapperContainer>
  );
}
