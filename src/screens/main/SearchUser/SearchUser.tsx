import React, { useCallback, useMemo, useState } from 'react';
import {
  View, Text, Image, TextInput,
  TouchableOpacity, FlatList, ListRenderItem,
  ActivityIndicator
} from 'react-native';
import { Backbutton, WrapperContainer, ChatItem, ChatUserShimmer } from '../../../components/Componets';
import { CommonColors } from '../../../styles/Colors';
import imagepath from '../../../constants/imagepath';
import { styles } from './styles';
import { ChatMessage, User } from '../../../constants/Allinterface';
import { useTranslation } from 'react-i18next';
import { searchUser } from '../../../Redux/actions/userDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { debounce } from '../../../utils/helperFunction';
import { moderateScale, verticalScale } from '../../../styles/scaling';

const SearchUser = () => {
  const [search, setSearch] = useState('');
  const user = useSelector((state: RootState) => state.userDetail);
  const [searchUsers, setSearchUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSearch = async (text: string) => {
    try {
      if (!text) return;
      setIsLoading(true);
      const res = await searchUser(`?userId=${user?._id}&search=${text}`);
      setSearchUsers(res?.result);
    } catch (error) {
      console.log(error, "error==>");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  const renderChatItem: ListRenderItem<ChatMessage> = useCallback(({ item }) => {
    return (
      <ChatItem
        user={item.user}
        lastMessage={item.lastMessage}
        timestamp={item.timestamp}
        unreadCount={item.unreadCount}
      />
    );
  }, []);

  const keyExtractor = useCallback(
    (item: User | ChatMessage) => (item._id ? item._id.toString() : ''),
    []
  );

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
          value={search}
          onChangeText={(text) => {
            setSearch(text.trim());
            debouncedSearch(text.trim()); // ✅ correct way
          }}
        />
        {!!search && <TouchableOpacity style={styles.crossImageContainer} onPress={() => setSearch('')}>
          <Image
            source={imagepath.cross}
            style={styles.crossImage}
            resizeMode="contain"
          />
        </TouchableOpacity>}
      </View>
      {isLoading ?
        <View style={{ marginTop: verticalScale(30) }}>
          <ChatUserShimmer />
          <ChatUserShimmer style={{ marginTop: verticalScale(20) }} />
          <ChatUserShimmer style={{ marginTop: verticalScale(20) }} />
          <ChatUserShimmer style={{ marginTop: verticalScale(20) }} />
        </View>
        : <FlatList
          data={searchUsers}
          renderItem={renderChatItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatListContainer}
          ItemSeparatorComponent={() => <View style={{ height: moderateScale(18) }} />}
          ListHeaderComponent={() => (
            searchUsers?.length > 0 && <Text style={styles.heading}>{t('People')}</Text>
          )}
          ListEmptyComponent={() => (
            <Image source={imagepath.emptySearch} style={styles.emptyImage} />
          )}
        />}
    </WrapperContainer>
  );
};

export default SearchUser;
