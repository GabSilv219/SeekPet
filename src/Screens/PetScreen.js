import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import COLORS from '../constants/colors';
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../contexts/auth';
import Dialog from '../components/Dialog';
import DialogWarningFalse from '../components/DialogWarningFalse';
import DialogWarningTrue from '../components/DialogWarningTrue';

// Validations
const schema = yup.object({
  nome: yup.string()
    .required("É necessário informar o nome do pet*")
    .max(30, "Informe um nome válido*"),
  idade: yup.string()
    .required("É necessário a idade*")
    .max(2, "Idade inválida*"),
  especie: yup.string()
    .required("É necessário a espécie do pet*")
    .max(30, "Espécie Inválida*"),
  raca: yup.string()
    .required("É necessário a raça do pet*")
    .max(30, "Raça inválida*"),
  sexo: yup.string()
    .required("É necessário o sexo do pet*")
    .max(5, "Sexo inválido*"),
  doenca: yup.string()
    .max(30, "Doença Inválida*"),
  vacina: yup.string()
    .max(30, "Vacina Inválida*"),
  castrado: yup.string()
    .max(3, "Resposta inválida Inválida*"),
}) 

export default function PetScreen({navigation, route}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const { petData } = route.params;

  const {userInfo} = useContext(AuthContext);

  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const [visibleWarningFalse, setVisibleWarningFalse] = useState(false);
  const [visibleWarningTrue, setVisibleWarningTrue] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [fotoVisible, setFotoVisible] = useState(false);
  const [desaparecido, setDesaparecido] = useState("");
  const [recompensa, setRecompensa] = useState(petData.recompensa || "");
  const [foto, setFoto] = useState(); 
  const [nome, setNome] = useState(petData.nome || "");
  const [idade, setIdade] = useState(petData.idade || "");
  const [especie, setEspecie] = useState(petData.especie || "");
  const [raca, setRaca] = useState(petData.raca || "");
  const [sexo, setSexo] = useState(petData.sexo || "");
  const [doenca, setDoenca] = useState(petData.doenca || "");
  const [vacina, setVacina] = useState(petData.vacina || "");
  const [castrado, setCastrado] = useState(petData.castrado || "");

  const pickFoto = async () => {
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

  const handleConfirmDesaparecido = async () => {
    try {
      const formData = new FormData();

      if(petData.desaparecido !== desaparecido){
        formData.append('desaparecido', desaparecido);
      }
      if(petData.recompensa !== recompensa){
        formData.append('recompensa', recompensa);
      }

      setDesaparecido('true');
      setRecompensa(recompensa);

      const response = await axios.put(`https://api-seekpet-prisma.onrender.com/update-pet/${petData.id}/${userInfo.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('desaparecido:', desaparecido)
      console.log('Resposta da API:', response.data);
      setVisibleWarningTrue(false);

    } catch (error) {
      console.log('Erro ao enviar chamado de desaparecimento', error);
    }
  }

  function sendDataConfirm(){
    handleConfirmDesaparecido();
  }

  const handleCancelDesaparecido = async () => {
    try {
      const formData = new FormData();

      if(petData.desaparecido !== desaparecido){
        formData.append('desaparecido', desaparecido);
      }
      if(petData.recompensa !== recompensa){
        formData.append('recompensa', recompensa);
      }

      setDesaparecido(null);
      setRecompensa(null);

      const response = await axios.put(`https://api-seekpet-prisma.onrender.com/update-pet/${petData.id}/${userInfo.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resposta da API:', response.data);
      setVisibleWarningFalse(false);

    } catch (error) {
      console.log('Erro ao cancelar chamado de desaparecimento', error);
    }
  }

  function sendDataCancel(){
    handleCancelDesaparecido();
  }

  const deletePet = async () => {
    try {
      const response = await axios.delete(`https://api-seekpet-prisma.onrender.com/delete-pet/${petData.id}`);
      console.log('Resposta da API:', response.data);
      navigation.goBack();

    } catch (error) {
      console.error('Erro ao deletar pet', error);
    }
  }

  function deletePetData(){
    deletePet();
  }

  const sendPut = async () => {
    try {
      const formData = new FormData();
      if(petData.nome !== nome){
        formData.append('nome', nome);
      }
      if(petData.idade !== idade){
        formData.append('idade', idade);
      }
      if(petData.especie !== especie){
        formData.append('especie', especie);
      }
      if(petData.raca !== raca){
        formData.append('raca', raca);
      }
      if(petData.sexo !== sexo){
        formData.append('sexo', sexo);
      }
      if(petData.doenca !== doenca){
        formData.append('doenca', doenca);
      }
      if(petData.vacina !== vacina){
        formData.append('vacina', vacina);
      }
      if(petData.castrado !== castrado){
        formData.append('castrado', castrado);
      }

      if(petData.foto !== foto){
        formData.append('foto', {
          uri: foto,
          type: 'image/jpeg',
          name: 'foto.jpg'
        });
      }
  
      const response = await axios.put(`https://api-seekpet-prisma.onrender.com/update-pet/${petData.id}/${userInfo.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta da API:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar o put para a API:', error);
    }
  };

  function sendData(){
    sendPut();
  }  

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>

            <DialogWarningTrue
              visible={visibleWarningTrue}
              title={
                loading ? (
                  <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
                ) : (
                  "Emitir aviso de desaparecimento"
                )
              }
              type={'money'}
              value={recompensa}
              onChangeText={(text) => {setRecompensa(text);}}
              text="Confirmar"
              message={'Informe um valor de recompensa caso necessário:'}
              cancelButton={true} 
              positiveButton={() => sendDataConfirm()}
              negativeButton={() => setVisibleWarningTrue(false)}
            />

            <DialogWarningFalse
              visible={visibleWarningFalse}
              title={
                loading ? (
                  <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
                ) : (
                  "Cancelar Status de Desaparecido"
                )
              }
              text="Confirmar"
              message={`Deseja mesmo cancelar a busca?`}
              cancelButton={true}
              positiveButton={() => sendDataCancel()}
              negativeButton={() => setVisibleWarningFalse(false)}
            />

            {petData.desaparecido == 'true' ? (
                <TouchableOpacity onPress={() => setVisibleWarningFalse(true)}>
                  <Ionicons name='alert-circle-outline' size={30} color={COLORS.error} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setVisibleWarningTrue(true)}>
                  <Ionicons name='alert-circle-outline' size={30} color={COLORS.error} />
                </TouchableOpacity>
              )
            }

            <Dialog
              visible={visibleDelete}
              title={
                loading ? (
                  <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
                ) : (
                  "Excluir carteira do Pet"
                )
              }
              text="Confirmar"
              message={'Deseja mesmo deletar a carteira do pet?'}
              cancelButton={true}
              positiveButton={() => {setVisibleDelete(false); deletePetData()}}
              negativeButton={() => setVisibleDelete(false)}
            />
            <TouchableOpacity style={{marginLeft: 10, marginBottom: 2}} onPress={() => setVisibleDelete(true)} >
              <MaterialCommunityIcons name='trash-can-outline' size={30} color={COLORS.data} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.new}
            onPress={pickFoto}
          >
            <View>
              {fotoVisible ? (
                <Image
                  source={{ uri: foto }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                ) : (
                <Image
                  source={{ uri: `https://api-seekpet-prisma.onrender.com/pets/${petData.foto}`}}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              )}
            </View>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Nome</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 210}]}>Idade</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'nome' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'nome' ? 1 : null,
                    backgroundColor: isFocused === 'nome' ? COLORS.white : '#efeff1',
                    width: 225
                  }]}
              >
                <Controller
                  control={control} 
                  name="nome"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setNome(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('nome')}
                      value={nome}
                      placeholder='Informe o nome do pet'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={50}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'idade' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'idade' ? 1 : null,
                    backgroundColor: isFocused === 'idade' ? COLORS.white : '#efeff1',
                    width: 115,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="idade"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setIdade(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('idade')}
                      value={idade}
                      placeholder='Idade'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='number-pad'
                      style={{width: "100%"}}
                      maxLength={2}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.nome && <Text style={styles.labelError}>{errors.nome?.message}</Text>} 
            {errors.idade && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.nome ? 72 : 250}
                ]}>
                {errors.idade?.message}
              </Text>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Espécie</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 130}]}>Raça</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'especie' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'especie' ? 1 : null,
                    backgroundColor: isFocused === 'especie' ? COLORS.white : '#efeff1',
                    width: 170
                  }]}
              >
                <Controller
                  control={control} 
                  name="especie"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setEspecie(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('especie')}
                      value={especie}
                      placeholder='Espécie'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'raca' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'raca' ? 1 : null,
                    backgroundColor: isFocused === 'raca' ? COLORS.white : '#efeff1',
                    width: 170,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="raca"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setRaca(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('raca')}
                      value={raca}
                      placeholder='Raça'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>
              
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.especie && <Text style={styles.labelError}>{errors.especie?.message}</Text>} 
            {errors.raca && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.especie ? 80 : 224}
                ]}>
                {errors.raca?.message}
              </Text>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Sexo</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 95}]}>Doenças</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'sexo' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'sexo' ? 1 : null,
                    backgroundColor: isFocused === 'sexo' ? COLORS.white : '#efeff1',
                    width: 110
                  }]}
              >
                <Controller
                  control={control} 
                  name="sexo"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      type={'zip-code'}
                      onChangeText={(text) => {setSexo(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('sexo')}
                      value={sexo}
                      placeholder='Sexo'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={5}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'doenca' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'doenca' ? 1 : null,
                    backgroundColor: isFocused === 'doenca' ? COLORS.white : '#efeff1',
                    width: 225,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="doenca"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setDoenca(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('doenca')}
                      value={doenca}
                      placeholder='Doenças'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.sexo && <Text style={styles.labelError}>{errors.sexo?.message}</Text>} 
            {errors.doenca && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.sexo ? 60 : 206}
                ]}>
                {errors.doenca?.message}
              </Text>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Vacinas</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 210}]}>Castrado</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'vacina' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'vacina' ? 1 : null,
                    backgroundColor: isFocused === 'vacina' ? COLORS.white : '#efeff1',
                    width: 225
                  }]}
              >
                <Controller
                  control={control} 
                  name="vacina"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setVacina(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('vacina')}
                      value={vacina}
                      placeholder='Vacinas'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'castrado' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'castrado' ? 1 : null,
                    backgroundColor: isFocused === 'castrado' ? COLORS.white : '#efeff1',
                    width: 115,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="castrado"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setCastrado(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('castrado')}
                      value={castrado}
                      placeholder='Castrado'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default' 
                      style={{width: "100%", textTransform: 'uppercase'}}
                      maxLength={3}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.vacina && <Text style={styles.labelError}>{errors.vacina?.message}</Text>} 
            {errors.castrado && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.vacina ? 60 : 239}
                ]}>
                {errors.castrado?.message}
              </Text>
            }
          </View>

          {/* Button Component*/}
          <Button
              onPress={handleSubmit (() => {
                setLoading(true);
                sendData();
              })}
              filled
              title={
                loading ? (
                  <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
                ) : (
                  "Enviar"
                )}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              disabled={loading}
            >
            </Button>

        </View>
      </Pressable>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 75
  },
  header: {
    flex: 1,
    marginHorizontal: 22,
  },
  header2: {
    // marginVertical: 30,
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  form: {
    marginBottom: 12,
    elevation: 10,
  },
  foto:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  new: {
    backgroundColor: '#efeff1',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  }
})