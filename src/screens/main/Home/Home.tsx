import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback } from 'react';
import { Avatar, ChatItem, ChatUserShimmer, WrapperContainer } from '../../../components/Componets';
import { styles } from './styles';
import imagepath from '../../../constants/imagepath';
import { ChatMessage, User } from '../../../constants/Allinterface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigations/types';
import { CommonColors } from '../../../styles/Colors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { useChats } from '../../../hooks/useChat';
import { useSocket } from '../../../hooks/useSocket';
import Feather from 'react-native-vector-icons/Feather';
import { verticalScale } from '../../../styles/scaling';
import { useAppStatus } from '../../../hooks/useAppStatus';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'UserStatus'>;
export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.userDetail);
  const appState = useAppStatus();
  const {
    allUsers,
    isLoading,
    refreshing,
    handleRefresh,
    loadMoreChats,
    setAllusers,
  } = useChats(user?._id, appState);

  useSocket(user?._id, setAllusers);

  // const renderStatus: ListRenderItem<User> = useCallback(({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.statusContainer}
  //       accessible={true}
  //       accessibilityLabel={`View ${item.name}'s status`}
  //       accessibilityRole="button"
  //       onPress={() => { navigation.navigate('UserStatus') }}
  //     >
  //       <View style={styles.statusImageContainer}>
  //         <View style={styles.statusBar}>
  //           <Image
  //             source={item.image}
  //             style={styles.statusImage}
  //           />
  //         </View>
  //         {item.isMyStatus && (
  //           <View style={styles.addStatusButton}>
  //             <Text style={styles.plusIcon}>+</Text>
  //           </View>
  //         )}
  //       </View>
  //       <Text style={styles.statusName} numberOfLines={1}>{item.name}</Text>
  //     </TouchableOpacity>
  //   );
  // }, []);
  const renderChatItem: ListRenderItem<ChatMessage> = useCallback(({ item }) => {
    return (
      <ChatItem
        user={item?.user}
        lastMessage={item.lastMessage}
        timestamp={item.timestamp}
        unreadCount={item.unreadCount}
      />
    );
  }, []);
  const keyExtractor =
    useCallback((item: User | ChatMessage) => item._id ? item._id.toString() : '', []);
  return (
    <WrapperContainer backgroundColor={CommonColors.black}>
      <View style={styles.upperContainer}>
        <TouchableOpacity style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchUser')}>
          <Image source={imagepath.search} style={styles.searchImage} />
        </TouchableOpacity>
        <Text style={styles.headline}>{t("Home")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Avatar name={user?.name as string} imageUri={user?.image} />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.statusSection}>
        <FlatList
          data={statusList}
          renderItem={renderStatus}
          keyExtractor={keyExtractor}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusListContainer}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />
      </View> */}
      <View style={styles.chatSection}>
        {isLoading ?
          <View>
            <ChatUserShimmer />
            <ChatUserShimmer style={{ marginTop: verticalScale(20) }} />
            <ChatUserShimmer style={{ marginTop: verticalScale(20) }} />
            <ChatUserShimmer style={{ marginTop: verticalScale(20) }} />
          </View>
          : <FlatList
            data={allUsers}
            renderItem={renderChatItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatListContainer}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            onEndReached={loadMoreChats}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ListFooterComponent={
              isLoading ? <ChatUserShimmer /> : null
            }
            ListEmptyComponent={() =>
              <View style={styles.emptyContainer}>
                <Image source={imagepath.emptyMessage} style={styles.emptyImage} />
                <Text style={styles.emptyText}>No messages yet!</Text>
                <Text style={styles.emptyText}>Start chatting with your friends now.</Text>
              </View>}
          />}
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('SearchUser')}>
        <Feather name="plus" size={30} color="white" />
      </TouchableOpacity>
    </WrapperContainer>
  );
}
