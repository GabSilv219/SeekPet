import React from 'react';
import { View, Modal, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';

export default function Dialog(props){
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
            <Text style={{fontSize: 15}}>{props.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}