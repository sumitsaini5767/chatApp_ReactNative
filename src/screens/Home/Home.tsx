import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useCallback} from 'react';
import {WrapperContainer} from '../../components/Componets';
import {styles} from './styles';
import imagepath from '../../constants/imagepath';

interface User {
  id: number;
  image: any; // Replace 'any' with proper image type from your imagepath
  name: string;
}

export default function Home() {
  const users: User[] = [
    {
      id: 1,
      image: imagepath.user,
      name: 'Alice Johnson',
    },
    {
      id: 2,
      image: imagepath.user,
      name: 'Bob Smith',
    },
    {
      id: 3,
      image: imagepath.user,
      name: 'Charlie Davis',
    },
    {
      id: 4,
      image: imagepath.user,
      name: 'Charlie Davis',
    },
  ];

  const renderUsers: ListRenderItem<User> = useCallback(({item}) => {
    return (
      <TouchableOpacity 
        style={styles.statusContainer}
        accessible={true}
        accessibilityLabel={`View ${item.name}'s status`}
        accessibilityRole="button"
      >
        <Image 
          source={item.image} 
          style={styles.statusImage}
        />
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  return (
    <WrapperContainer backgroundColor="#000000">
      {/* Upper Header */}
      <View style={styles.upperContainer}>
        <TouchableOpacity style={styles.searchContainer}>
          <Image source={imagepath.search} style={styles.Searchimage} />
        </TouchableOpacity>
        <Text style={styles.headline}>Home</Text>
        <TouchableOpacity>
          <Image source={imagepath.user} style={styles.Userimage} />
        </TouchableOpacity>
      </View>
      {/* users Status */}
      <View>
      <FlatList 
        data={users}
        renderItem={renderUsers}
        keyExtractor={keyExtractor}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.Userstatusbar}
        contentContainerStyle={styles.flatlistContainer}
        ItemSeparatorComponent={() => <View style={{ width: 13 }} />} 
      />
      </View>
      {/* Lower Chat Container */}
      <ScrollView style={styles.lowerContainer}>
      </ScrollView>
    </WrapperContainer>
  );
}
