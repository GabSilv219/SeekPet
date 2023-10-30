import { View, Text, SafeAreaView ,StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import COLORS from '../constants/colors';

export default function Post({navigation}) {
  const [image, setImage] = useState();
  const [text, setText] = useState("");

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const sendPost = async () => {
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
  
      const response = await axios.post('https://api-seekpet-prisma.onrender.com/create-post/1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Resposta da API:', response.data);
      // Você pode tratar a resposta da API aqui
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar o post para a API:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='md-arrow-back' size={24} color={COLORS.grey} />
        </TouchableOpacity>

        <TouchableOpacity onPress={sendPost}>
          <Text style={{ fontWeight: "500" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={require("../assets/person1.jpg")} style={styles.avatar} />
        <TextInput 
          value={text}
          onChangeText={setText}
          autoFocus={true} 
          multiline={true} 
          numberOfLines={4} 
          style={{ flex: 1 }} 
          placeholder='O que deseja compartilhar?'
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.photo} onPress={this.pickImage} >
        <Ionicons name='md-camera' size={32} color='#D8D8DB' />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        <Image source={{uri: image}} style={styles.postImage} resizeMode='cover'></Image>
      </View>
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    marginTop: 40 
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16 
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  },
  postImage: {
    width: undefined,
    height: 250,
    borderRadius: 5,
    marginVertical: 16,
  }
})