import React, {useState} from 'react';
import { View, Modal, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import COLORS from '../constants/colors';
import { InputLogin } from './Inputs';
import { TextInputMask } from 'react-native-masked-text';

export default function DialogWarningTrue(props){
  []
  return(
    <Modal transparent visible={props.visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <View 
          style={{
            width: '85%',
            padding: 15,
            borderRadius: 8,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'flex-center',
          }}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10, alignSelf: 'flex-start'}}
          >{props.title}</Text>

          <View style={{
            width: '100%',
            height: 0.5,
            marginBottom: 10,
            backgroundColor: COLORS.lightGrey,
            alignSelf: 'flex-start'
          }}
          ></View>

          <Text style={{marginBottom: 20, alignSelf: 'flex-start'}}>{props.message}</Text>

          <View 
            style={{
              width: "100%"
            }}
          >
              <TextInputMask
                type={props.type}
                style={{marginLeft: 5}}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder='R$00,00'
                keyboardType='numeric'
                maxLength={11}
              />
              <View 
                style={{
                  borderBottomColor: "#8A8F9E",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 10
                }}
              />
          </View>

          {props.cancelButton && <TouchableOpacity
            onPress={props.negativeButton}
            style={{
              backgroundColor: COLORS.error,
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 5,
              margin: 5
            }}
          >
            <Text style={{fontSize: 15}}>Cancelar</Text>
          </TouchableOpacity>}

          <TouchableOpacity
            onPress={props.positiveButton}
            style={{
              backgroundColor: COLORS.primary,
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 5,
              margin: 5
            }}
          >
            <Text style={{fontSize: 15}}>{props.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}