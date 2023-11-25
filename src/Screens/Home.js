import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import COLORS from '../constants/colors';
import { Entypo, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import ButtonsPost from '../components/ButtonsPost';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../contexts/auth';

export default function Home({navigation }) {
  const {userInfo} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const fetchPosts = async () => {
    try {
      const responsePosts = await axios.get('https://api-seekpet-prisma.onrender.com/posts/todos');
      const postsData = responsePosts.data;
      const sortedPosts = postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // const userPosts = sortedPosts.filter((posts) => posts.userId === userInfo.id);
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Erro ao buscar dados de posts:', error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const responseUsers = await axios.get('https://api-seekpet-prisma.onrender.com');
      const usersData = responseUsers.data;

      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar dados de usuarios:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers(10);
    fetchPosts(10);
    setRefreshing(false);
  }

  return (  
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image 
            style={styles.drawerImage}
            source={{uri: `https://api-seekpet-prisma.onrender.com/users/${userInfo.avatar}`}}
          />
        </TouchableOpacity>
        <View style={styles.input}>
          <Ionicons name='search-outline' size={20} color={COLORS.grey} style={{marginRight: 10, marginLeft: 5, marginTop: 3}}/>
          <TextInput
            placeholder='Pesquisar'
            style={{width: '90%'}}
          />
        </View>
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        style={styles.feed}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <Image source={{ uri: `https://api-seekpet-prisma.onrender.com/users/${item.user.avatar}` }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={styles.name}>{item.user.nome}</Text>
                  <Text style={styles.timestamp}>{moment(item.createdAt).fromNow()}</Text>
                </View>
                <TouchableOpacity style={{marginRight: 20, marginTop: -10}}>
                  <Entypo name="dots-three-horizontal" size={24} color="#73788B" />
                </TouchableOpacity>
              </View>
              <Text style={styles.post}>{item.text}</Text>
              <Image source={{ uri: `https://api-seekpet-prisma.onrender.com/posts/${item.image}` }} style={styles.postImage} resizeMode='cover' />
              <ButtonsPost />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 13,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 10,
    zIndex: 10,
    flexDirection: 'row'
  },
  drawerImage: {
    width: 40, 
    height: 40, 
    borderRadius: 30, 
    marginLeft: 15, 
    borderWidth: 1, 
    borderColor: COLORS.primary,
    marginTop: 5
  },
  input: {
    flexDirection: 'row', 
    backgroundColor: COLORS.background, 
    marginLeft: 10, 
    width: '80%', 
    padding: 5, borderRadius: 10, 
    marginTop: 5
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 3,
  },
  feedItem: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 200,
    borderRadius: 5,
    marginVertical: 16,
  }
})