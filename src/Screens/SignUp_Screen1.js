import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons"; 
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

// Validations
const schema = yup.object({
  nome: yup.string()
    .required("É necessário informar seu nome*")
    .trim()
    .min(3, "É necessário informar seu nome*"),
  email: yup.string()
    .required("É necessário informar um e-mail*")
    .email("É necessário informar um e-mail válido*"),
}) 

export default function SignUp({navigation, route}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  //Show or hide password digits
  const [isFocused, setIsFocused] = useState(null);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [avatar, setAvatar] = useState();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1
    })

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setAvatarVisible(true);
    }
  }

  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  
  const nextStep = () => {
    console.log(`nome: ${nome}, email: ${email}, avatar: ${avatar}`);
    navigation.navigate('SignUp_Screen2', {nome, email, avatar});
  }

  function handleSignIn(){
    nextStep();
  }  

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
            <Text style={styles.title}>Dados Pessoais 🗒️</Text>
            <Text style={styles.text}>{`Preencha os campos abaixo para criar sua \nconta SeekPet 😉`}</Text>
          </View>

          <TouchableOpacity
            style={styles.new}
            onPress={this.pickAvatar}
          >
            <View>
              {avatarVisible ? (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
                />
              ) : (
                <Ionicons name='md-camera' size={32} color='#D8D8DB' />
              )}
            </View>
        </TouchableOpacity>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Nome</Text>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'nome' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'nome' ? 1 : null,
                    backgroundColor: isFocused === 'nome' ? COLORS.white : '#efeff1'
                  }]}
              >
                <Controller
                  control={control} 
                  name="nome"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setNome(text); onChange(text)}}
                      onBlur={handleBlur}
                      value={nome}
                      onFocus={() => handleFocus('nome')}
                      placeholder='Digite seu nome'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={80}
                    />
                  )}
                />
              </View>
              {errors.nome && <Text style={styles.labelError}>{errors.nome?.message}</Text>}
          </View>
      
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>E-mail</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.username ? COLORS.error : isFocused === 'email' ? COLORS.primary : null,
                  borderWidth: errors.username ? 1 : isFocused === 'email' ? 1 : null,
                  backgroundColor: isFocused === 'email' ? COLORS.white : '#efeff1'
                }]}
            >
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value}}) => (
                  <TextInput
                    onChangeText={(text) => {setEmail(text); onChange(text)}}
                    onBlur={handleBlur}
                    value={email}
                    onFocus={() => handleFocus('email')}
                    placeholder='@gmail.com'
                    placeholderTextColor={COLORS.grey}
                    keyboardType='email-address'
                    style={{width: "100%"}}
                  />  
                )}
              />
            </View>
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}
          </View>

          <Button
            onPress={handleSubmit(handleSignIn)}
            title="Avançar"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />

          <View style={styles.footer}>
            <Text style={{fontSize: 16, color: COLORS.black}}>Já possui uma conta?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginNavigate}> 
                Faça Login
              </Text>
            </Pressable>
          </View>

        </View>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 78
  },
  header: {
    flex: 1,
    marginHorizontal: 22,
  },
  header2: {
    marginVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    justifyContent: 'center',
    color: COLORS.darkGrey,
  },
  new: {
    backgroundColor: '#efeff1',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30
  },
  form: {
    marginBottom: 12,
    elevation: 10,
  },
  emailTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    borderRadius: 8,
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