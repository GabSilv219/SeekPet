import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView, TextInput } from 'react-native';
import COLORS from '../constants/colors';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../components/Button';

const schema = yup.object({
  nome: yup.string()
    .required("É necessário informar seu nome*")
    .trim()
    .min(3, "É necessário informar seu nome*"),
  email: yup.string()
    .required("É necessário informar um e-mail*")
    .email("É necessário informar um e-mail válido*"),
  data_nasc: yup.string()
    .required("É necessário Informar a data de nascimento*")
    .max(10, "Infome uma data válida"),
  cpf: yup.string()
    .required("É necessário informar um CPF*")
    .max(14, "Informe um CPF válido*"),
  tel: yup.string()
    .required("É necessário informar um número de telefone*")
    .max(15, "Informe um número de telefone válido*"),
  cep: yup.string()
    .required("É necessário informar um cep*")
    .max(9, "Informe um cep válido*"),
  bairro: yup.string()
    .required("É necessário informar o bairro*")
    .max(30, "É nessário informar um bairro válido*"),
  rua: yup.string()
    .required("É necessário informar o nome da rua*")
    .max(50, "É necessário informar um nome válido*"),
  numero: yup.string()
    .required("É necessário o número*")
    .max(5, "É necessário o número*"),
  complemento: yup.string()
    .max(30, "Limite máximo de caracteres atingido!*"),
  cidade: yup.string()
    .required("É necessário informar sua cidade*")
    .max(50, "É necessário informar um nome válido*"),
  estado: yup.string()
    .required("É necessário informar o Estado*")
    .max(30, "É necessário informar um válido*"),
  senha: yup.string()
    .required("É necessário informar uma senha de acesso*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*"),
  confirmarSenha: yup.string()
    .required("É necessário repetir a senha*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*")
    .oneOf([yup.ref("senha")],"As senhas devem ser iguais*").required("Confirme sua senha*"),
}) 

export default function EditProfile({navigation}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const {userInfo} = useContext(AuthContext);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);

  const [AvatarVisible, setAvatarVisible] = useState(false);
  const [avatar, setAvatar] = useState();
  const [nome, setNome] = useState(userInfo.nome || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [cpf, setCpf] = useState(userInfo.cpf || "");
  const [data_nasc, setData_nasc] = useState(userInfo.data_nasc || "");
  const [tel, setTel] = useState(userInfo.tel || "");
  const [cep, setCep] = useState(userInfo.cep || "");
  const [bairro, setBairro] = useState(userInfo.bairro || "");
  const [rua, setRua] = useState(userInfo.rua || "");
  const [numero, setNumero] = useState(userInfo.numero || "");
  const [complemento, setComplemento] = useState(userInfo.complemento || "");
  const [cidade, setCidade] = useState(userInfo.cidade || "");
  const [estado, setEstado] = useState(userInfo.estado || "");
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const pickAvatar = async () => {
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

  const sendPut = async () => {
    try {
      const formData = new FormData();
      if(userInfo.nome !== nome){
        formData.append('nome', nome);
      }
      if(userInfo.email !== email){
        formData.append('email', email);
      }
      if(userInfo.cpf !== cpf){
        formData.append('cpf', cpf);
      }
      if(userInfo.data_nasc !== data_nasc){
        formData.append('data_nasc', data_nasc);
      }
      if(userInfo.tel !== tel){
        formData.append('tel', tel);
      }
      if(userInfo.cep !== cep){
        formData.append('cep', cep);
      }
      if(userInfo.bairro !== bairro){
        formData.append('bairro', bairro);
      }
      if(userInfo.rua !== rua){
        formData.append('rua', rua);
      }
      if(userInfo.numero !== numero){
        formData.append('numero', numero);
      }
      if(userInfo.complemento !== complemento){
        formData.append('complemento', complemento);
      }
      if(userInfo.cidade !== cidade){
        formData.append('cidade', cidade);
      }
      if(userInfo.estado !== estado){
        formData.append('estado', estado);
      }
      if(userInfo.senha !== senha){
        formData.append('senha', senha);
      }
      if(userInfo.confirmarSenha !== confirmarSenha){
        formData.append('confirmarSenha', confirmarSenha);
      }

      if(userInfo.avatar !== avatar){
        formData.append('avatar', {
          uri: avatar,
          type: 'image/jpeg',
          name: 'avatar.jpg'
        });
      }
      
      const response = await axios.put(`https://api-seekpet-prisma.onrender.com/update-user/${userInfo.id}`, formData, {
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

  const sendData = async () => {
    setLoading(true);
    await sendPut();
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '150%'}}>
            <Text style={{fontSize: 15, marginLeft: 20, marginBottom: 10, color: COLORS.black, fontWeight: 'bold'}}>Dados Pessoais</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={pickAvatar}
        >
          <View>
            {AvatarVisible ? (
              <Image 
                source={{uri: avatar}}
                style={{width: 100, height: 100, borderRadius: 50, marginLeft: 125, borderWidth: 1, borderColor: COLORS.secondary}}
              />
            ) : (
              <Image 
              source={{uri: `https://api-seekpet-prisma.onrender.com/users/${userInfo.avatar}`}}
              style={{width: 100, height: 100, borderRadius: 50, marginLeft: 125, borderWidth: 1, borderColor: COLORS.secondary}}
            />
            )}
            <Text style={{fontSize: 15, fontWeight: '400', color: COLORS.secondary, marginLeft: 155, marginTop: 10}}>Editar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: -60, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '60%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo name="user" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="nome"
            render={({ field: { onChange } }) => (
              <TextInput 
                placeholder='Insira seu nome'
                keyboardType={'default'}
                maxLength={30}
                onChangeText={(text) => {setNome(text); onChange(text)}}
                value={nome}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '75%',
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.nome && <Text style={styles.labelError}>{errors.nome.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo name="mail" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="email"
            render={({ field: { onChange } }) => (
              <TextInput 
                placeholder='Insira o email'
                keyboardType={'email-address'}
                onChangeText={(text) => {setEmail(text); onChange(text)}}
                value={email}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '45%',
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.email && <Text style={styles.labelError}>{errors.email.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="idcard" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="cpf"
            render={({ field: { onChange } }) => (
              <TextInputMask
                type={'cpf'} 
                placeholder='___.___.___-__'
                keyboardType={'numeric'}
                maxLength={14}
                onChangeText={(text) => {setCpf(text); onChange(text)}}
                value={cpf}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.cpf && <Text style={styles.labelError}>{errors.cpf.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="calendar" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="data_nasc"
            render={({ field: { onChange } }) => (
              <TextInputMask
                type={'datetime'} 
                placeholder='dd/mm/aaaa'
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => {setData_nasc(text); onChange(text)}}
                value={data_nasc}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.data_nasc && <Text style={styles.labelError}>{errors.data_nasc.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="phone" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="tel"
            render={({ field: { onChange } }) => (
              <TextInputMask
                type={'cel-phone'} 
                placeholder='Insira seu telefone'
                keyboardType={'numeric'}
                maxLength={15}
                onChangeText={(text) => {setTel(text); onChange(text)}}
                value={tel}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.tel && <Text style={styles.labelError}>{errors.tel.message}</Text>}
      <View>
        <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '60%'}}>
          <Text style={{fontSize: 15, marginLeft: 20, marginBottom: 10, color: COLORS.black, fontWeight: 'bold'}}>Informações de endereço</Text>
        </View>
      </View>
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>CEP:</Text>
          <Controller
            control={control} 
            name="cep"
            render={({ field: { onChange } }) => (
              <TextInputMask
                type={'zip-code'} 
                placeholder='Informe o cep'
                keyboardType={'numeric'}
                maxLength={9}
                onChangeText={(text) => {setCep(text); onChange(text)}}
                value={cep}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.cep && <Text style={styles.labelError}>{errors.cep.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>Bairro:</Text>
          <Controller
            control={control} 
            name="bairro"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe o bairro'
                keyboardType={'default'}
                maxLength={50}
                onChangeText={(text) => {setBairro(text); onChange(text)}}
                value={bairro}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.bairro && <Text style={styles.labelError}>{errors.bairro.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>Rua:</Text>
          <Controller
            control={control} 
            name="rua"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe o nome da rua'
                keyboardType={'default'}
                maxLength={30}
                onChangeText={(text) => {setRua(text); onChange(text)}}
                value={rua}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.rua && <Text style={styles.labelError}>{errors.rua.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>N°:</Text>
          <Controller
            control={control} 
            name="numero"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe o número'
                keyboardType={'numeric'}
                maxLength={5}
                onChangeText={(text) => {setNumero(text); onChange(text)}}
                value={numero}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.numero && <Text style={styles.labelError}>{errors.numero.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>Complemento:</Text>
          <Controller
            control={control} 
            name="complemento"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe um complemento'
                keyboardType={'default'}
                maxLength={50}
                onChangeText={(text) => {setComplemento(text); onChange(text)}}
                value={complemento}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.complemento && <Text style={styles.labelError}>{errors.complemento.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>Cidade:</Text>
          <Controller
            control={control} 
            name="cidade"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe a Cidade'
                keyboardType={'default'}
                maxLength={30}
                onChangeText={(text) => {setCidade(text); onChange(text)}}
                value={cidade}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.cidade && <Text style={styles.labelError}>{errors.cidade.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 20, marginRight: -10, marginBottom: 10, marginTop: -5, color: COLORS.grey}}>Estado:</Text>
          <Controller
            control={control} 
            name="estado"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe o Estado'
                keyboardType={'default'}
                maxLength={30}
                onChangeText={(text) => {setEstado(text); onChange(text)}}
                value={estado}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
        </View>
      </View>
      {errors.estado && <Text style={styles.labelError}>{errors.estado.message}</Text>}
      <View>
        <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '60%'}}>
          <Text style={{fontSize: 15, marginLeft: 20, marginBottom: 10, color: COLORS.black, fontWeight: 'bold'}}>Redefinir Senha</Text>
        </View>
      </View>
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="lock-closed" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="senha"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Informe a senha'
                keyboardType={'default'}
                maxLength={30}
                secureTextEntry={isPasswordShown}
                onChangeText={(text) => {setSenha(text); onChange(text)}}
                value={senha}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
          <TouchableOpacity 
            style={styles.viewPwd}
            onPress={() => setIsPasswordShown(!isPasswordShown)}
          >
            {
              isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.grey}/>
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.grey}/>
              )
            }
          </TouchableOpacity>
        </View>
      </View>
      {errors.senha && <Text style={styles.labelError}>{errors.senha.message}</Text>}
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons name="lock-closed-outline" color={COLORS.lightGrey} size={25} style={{marginLeft: 15, marginBottom: 10, marginTop: -5}}/>
          <Controller
            control={control} 
            name="confirmarSenha"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder='Confirme a senha'
                keyboardType={'default'}
                maxLength={30}
                secureTextEntry={isPasswordShown}
                onChangeText={(text) => {setConfirmarSenha(text); onChange(text)}}
                value={confirmarSenha}
                style={{
                  fontSize: 15, 
                  marginLeft: 20,
                  marginBottom: 10, 
                  marginTop: -5,
                  color: COLORS.black,
                  width: '100%'
                }}
              />
            )}
          />
          <TouchableOpacity 
            style={styles.viewPwd}
            onPress={() => setIsPasswordShown(!isPasswordShown)}
          >
            {
              isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.grey}/>
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.grey}/>
              )
            }
          </TouchableOpacity>
        </View>
      </View>
      {errors.confirmarSenha && <Text style={styles.labelError}>{errors.confirmarSenha.message}</Text>}

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
          marginBottom: 20,
          width: '80%',
          alignSelf: 'center',
          // marginLeft: 50
        }}
        disabled={loading}
      >
          </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%'
  },
  line: {
    width: 180,
    height: 1,
    marginBottom: 5,
    backgroundColor: COLORS.lightGrey,
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.error,
    marginTop: 8,
  },
  viewPwd: {
    position: "absolute",
    right: 20,
    bottom: 10
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 20,
    color: COLORS.error,
    marginTop: 8,
  }
})
