import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import COLORS from '../constants/colors';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import ButtonsPost from '../components/ButtonsPost';
import { AuthContext } from '../contexts/auth';
import axios from 'axios';

export default function Home({ route }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {userInfo} = useContext(AuthContext);

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

  // const reversedUsers = [...users].reverse();

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers(10);
    fetchPosts(10);
    setRefreshing(false);
  }

  return (  
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed SeekPet</Text>
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        style={styles.feed}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          style={{
            marginTop: -20,
          }}
          horizontal={true}
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <View style={[styles.header, {paddingRight: 10, paddingLeft: 10}]}>
              <View style={styles.header2}>
                <Image 
                  source={{uri: `https://api-seekpet-prisma.onrender.com/users/${item.avatar}`}} 
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                  }} 
                />
                <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 12, fontWeight: '500', color: "#454D65"  }}>{item.nome}</Text>
              </View>
            </View>
          )}
        />
        }
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
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 10,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginTop: 5,
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