import React, { useCallback, useMemo, useState } from 'react';
import {
  View, Text, Image, TextInput,
  TouchableOpacity, FlatList, ListRenderItem
} from 'react-native';
import { Backbutton, WrapperContainer } from '../../../components/Componets';
import { CommonColors } from '../../../styles/Colors';
import imagepath from '../../../constants/imagepath';
import { styles } from './styles';
import { chatMessages } from '../../../constants/DummyData';
import { ChatMessage, User } from '../../../constants/Allinterface';
import ChatItem from '../../../components/ChatItem/ChatItem';
import { useTranslation } from 'react-i18next';
import { searchUser } from '../../../Redux/actions/userDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
 
const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay = 300
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };// ✅ import debounce

const SearchUser = () => {
  const [search, setSearch] = useState('');
  const user = useSelector((state: RootState) => state.userDetail);
  const [searchUsers,setSearchUsers]=useState([]);
  const { t } = useTranslation();

  const handleSearch = async(text: string) => {
    try {
       const res = await searchUser(`?userId=${user?._id}&search=${text}`);
       setSearchUsers(res?.result);
    } catch (error) {
        console.log(error,"error==>");
    }
  };

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500),
    []
  );

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
            setSearch(text);
            debouncedSearch(text); // ✅ correct way
          }}
        />
        <TouchableOpacity style={styles.crossImageContainer} onPress={() => setSearch('')}>
          <Image
            source={imagepath.cross}
            style={styles.crossImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchUsers}
        renderItem={renderChatItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatListContainer}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        ListHeaderComponent={() => (
          <Text style={styles.heading}>{t('People')}</Text>
        )}
      />
    </WrapperContainer>
  );
};

export default SearchUser;
