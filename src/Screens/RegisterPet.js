import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function RegisterPet({navigation}){
  const [foto, setFoto] = useState();
  const [fotoVisible, setFotoVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [doenca, setDoenca] = useState("");
  const [vacina, setVacina] = useState("");
  const [castrado, setCastrado] = useState("");

  pickFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1
    })

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
      setFotoVisible(true);
    }
  }

  const sendPost = async () => {
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('idade', idade);
      formData.append('especie', especie);
      formData.append('raca', raca);
      formData.append('sexo', sexo);
      formData.append('doenca', doenca);
      formData.append('vacina', vacina);
      formData.append('castrado', castrado);
      
      formData.append('foto', {
        uri: foto,
        type: 'image/jpeg',
        name: 'foto.jpg'
      });
  
      const response = await axios.post('https://api-seekpet-prisma.onrender.com/registrar-pet/1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Resposta da API:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar o post para a API:', error);
    }
  };

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
            <Text style={styles.title}>Registrar Pet</Text>
            <Text style={styles.text}>Dê uma identidade ao seu pet! 🐕</Text>
          </View>

          <TouchableOpacity
            style={styles.new}
            onPress={() => {
              if (!fotoVisible) {
                this.pickFoto();
              }
              this.pickFoto();
            }}
          >
          <View>
            {fotoVisible ? (
              <Image
                source={{ uri: foto }}
                style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
              />
            ) : (
              <Ionicons name='md-camera' size={32} color='#D8D8DB' />
            )}
          </View>
        </TouchableOpacity>

          {/* Form */}
          {/* Name Input */}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Nome</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setNome}
                value={nome}
                placeholder='Digite o nome do pet'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Idade</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setIdade}
                value={idade}
                placeholder='Digite a idade'  
                placeholderTextColor={COLORS.grey}
                keyboardType='numeric'
                style={{width: "100%"}}
                maxLength={2}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Espécie</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setEspecie}
                value={especie}
                placeholder='Digite a Espécie'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Raca</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setRaca}
                value={raca}
                placeholder='Digite a raça'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Sexo</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setSexo}
                value={sexo}
                placeholder='Digite o sexo'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Doenca</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setDoenca}
                value={doenca}
                placeholder='Possui alguma doença?'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Vacina</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setVacina}
                value={vacina}
                placeholder='Já tomou alguma vacina?'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Castrado</Text>
            <View style={styles.input}>
              <TextInput 
                onChangeText={setCastrado}
                value={castrado}
                placeholder='É castrado?'  
                placeholderTextColor={COLORS.grey}
                keyboardType='email-address'
                style={{width: "100%"}}
                maxLength={80}
              />
            </View>
          </View>


          {/* Button Component*/}
          <Button
          onPress={sendPost}
          title="Cadastrar"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          />

        </View>
      </Pressable>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, 
    marginTop: -20,
  },
  header: {
    flex: 1,
    marginHorizontal: 22,
  },
  header2: {
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
  },
  foto:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  new: {
    backgroundColor: '#f8f9fa',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 16,
  },
  form: {
    marginBottom: 12,
  },
  emailTitleText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 48, 
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  inputNumber: {
    width: '100%',
    height: 48,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
  },
  viewPwd: {
    position: "absolute",
    right: 12,
  },
  checkbox: {
    flexDirection: "row",
    marginVertical: 6,
  },
  lines: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical:  20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: 10
  },
  othersButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    marginRight: 4,
    borderRadius: 10
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center"
  },
  imagesButton: {
    height: 36,
    width: 36,
    marginRight: 8
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22
  },
  loginNavigate: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.error,
    marginTop: 8,
  }
})