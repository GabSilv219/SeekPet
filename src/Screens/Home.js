import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { Component, useState } from 'react';
import COLORS from '../constants/colors';
import { Entypo } from '@expo/vector-icons';
import api from '../Services/api';
import User from '../datas/User';
import moment from 'moment';
import ButtonsPost from '../components/ButtonsPost';

posts = [
  { 
    id: "1",
    name: "Kim Batist",
    text: "Recentemente adotei este gatinho de raça indefinida, o chamei de Mr. Oracius, pelo seu olhar calmo e sério, apesar do olhar ele é bem carinhoso e trouxe muita alegria pra dentro de casa, meus filhos o amam e logo traremos mais alguns amiguinhos pra ele. 😊",
    timestamp: [2023, 9, 22,],
    avatar: require("../assets/person1.jpg"),
    image: require("../assets/cat1.jpg")
  },
  {
    id: "2",
    name: "Alexander MacLeod",
    text: '"Pesquisas mostram que ter um animal de estimação, como um cachorro ou um gato, pode ter benefícios significativos para a saúde mental das pessoas. A interação com animais de estimação pode liberar oxitocina, um hormônio associado ao amor e ao vínculo, e reduzir os níveis de cortisol, um hormônio do estresse. Além disso, ter um pet pode proporcionar companhia, reduzir a solidão e até mesmo ajudar a aliviar sintomas de depressão e ansiedade em muitas pessoas. Ter um animal de estimação pode ser uma fonte valiosa de apoio emocional e bem-estar."',
    timestamp: [2023, 9, 21],
    avatar: require("../assets/person2.jpg"),
    image: require("../assets/post2.webp")
  },
  {
    id: "3",
    name: "Petz",
    text: "Ração Hills Science Diet para Cães Adultos de Grande Porte Sabor Frango 12kg 🐕 \n\n - Proteínas de alta qualidade para uma condição corpórea ideal; \n\n - Auxilia a manter a saúde da pele e a beleza da pelagem; \n\n - Sem corantes e saborizantes artificiais para uma refeição nutritiva e saborosa;",
    timestamp: [2023, 9, 20],
    avatar: require("../assets/petz.jpg"),
    image: require("../assets/post3.jpg")
  },
]

export default class Home extends Component {
  
  renderPost = post => {
    return(
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{flex: 1}}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
            </View>

            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={24} color="#73788B" />
            </TouchableOpacity>
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image source={post.image}  style={styles.postImage} resizeMode='cover' />

          <ButtonsPost/>

        </View>
      </View>
    )
  }

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     users: []
  //   }
  // }

  // async componentDidMount(){
  //   const response = await api.get("/");
  //    this.setState({
  //     users: response.data
  //   });
  // }

  render(){
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View> */}

        <FlatList 
          style={styles.feed} 
          data={posts} 
          renderItem={({item}) => this.renderPost(item)} 
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
  
        {/* <FlatList 
          style={styles.feed} 
          data={this.state.users}
          keyExtractor={item => item.id}
          renderItem={({item}) => <User data={item}/>} 
          showsVerticalScrollIndicator={false}
        /> */}
    </View>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginTop: 50,
    marginHorizontal: 16
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