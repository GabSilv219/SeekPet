import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function ButtonsPost() {
  const [isLiked, setIsLiked] = useState(true);
  return (
    <View style={{flexDirection: 'row',}}>
      <TouchableOpacity 
        onPress={() => setIsLiked(!isLiked)}
      >
        {
          isLiked == true ? (
            <Entypo name="heart-outlined" size={24} color="#73788B" style={{ marginRight: 16 }} />
          ) : (
            <Entypo name="heart" size={24} color="#ff3040" style={{ marginRight: 16 }} />
          )
        }
      </TouchableOpacity>

      <TouchableOpacity>
        <Entypo name="message" size={24} color="#73788B"  style={{ marginRight: 16 }}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Entypo name="reply" size={24} color="#73788B"/>
      </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  Title: {
    fontSize:22,
    fontWeight: 'bold',
  }
})