import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, { useCallback } from 'react';
import { WrapperContainer } from '../../../components/Componets';
import { styles } from './styles';
import imagepath from '../../../constants/imagepath';
import { ChatMessage, User } from '../../../constants/Allinterface';
import ChatItem from '../../../components/ChatItem/ChatItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigations/types';
import { chatMessages, statusList } from '../../../constants/DummyData';
import { CommonColors } from '../../../styles/Colors';
import { useTranslation } from 'react-i18next';
type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'UserStatus'>;
export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const {t}=useTranslation();
  const renderStatus: ListRenderItem<User> = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.statusContainer}
        accessible={true}
        accessibilityLabel={`View ${item.name}'s status`}
        accessibilityRole="button"
        onPress={() => { navigation.navigate('UserStatus') }}
      >
        <View style={styles.statusImageContainer}>
          <View style={styles.statusBar}>
            <Image
              source={item.image}
              style={styles.statusImage}
            />
          </View>
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
    <WrapperContainer backgroundColor={CommonColors.black}>
      <View style={styles.upperContainer}>
        <TouchableOpacity style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchUser')}>
          <Image source={imagepath.search} style={styles.searchImage} />
        </TouchableOpacity>
        <Text style={styles.headline}>{t("Home")}</Text>
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
