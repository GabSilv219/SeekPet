import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import COLORS from '../constants/colors';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

export default function Pet() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const responsePets = await axios.get('https://api-seekpet-prisma.onrender.com/pets/todos');
      const petsData = responsePets.data;
      const sortedPets = petsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPets(sortedPets);
    } catch (error) {
      console.error('Erro ao buscar dados de pets:', error);
    }
  };
  
  useEffect(() => {
    fetchPets();
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.Title}>Meus Pets</Text>
          <TouchableOpacity style={styles.new} onPress={() => navigation.navigate("RegisterPet")}>
            <Feather name="plus" size={50} color={COLORS.primary} style={{alignSelf: "center"}}/>
          </TouchableOpacity>
        </View>
        
        <FlatList 
          style={styles.feed}
          data={pets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.ids}>
              <TouchableOpacity style={styles.id}>
                <Image style={styles.photo} source={{uri: `https://api-seekpet-prisma.onrender.com/pets/${item.foto}`}}></Image>
                <View style={styles.info}>
                  <View style={[styles.fieldRow, {marginBottom: 0}]}>
                    <Text style={styles.field}>Nome:</Text>
                    <Text style={styles.data}>{item.nome}</Text>
                  </View>
                  <View style={styles.line}/>
                  <View style={styles.fieldRow}>
                    <Text style={styles.field}>Idade:</Text>
                    <Text style={styles.data}>{item.idade}</Text>
                  </View>
                  <View style={styles.fieldRow}>
                    <Text style={styles.field}>Espécie:</Text>
                    <Text style={styles.data}>{item.especie}</Text>
                  </View>
                  <View style={styles.fieldRow}>
                    <Text style={styles.field}>Raça:</Text>
                    <Text style={styles.data}>{item.raca}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  row:{
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 120,
  },
  Title: {
    fontSize:45,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  img: {
    width: 500,
    height: 200,
  },
  new: {
    backgroundColor: COLORS.white,
    width: 70,
    height: 70,
    borderRadius: 5,
    marginVertical: 0,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  ids: {
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  id: {
    backgroundColor: COLORS.white,
    width: 335,
    height: 150,
    borderRadius: 5,
    flexDirection: "row",
    marginVertical: 8,
    elevation: 10
  },
  feed: {
    marginTop: 50,
    marginHorizontal: 16
  },
  photo: {
    width: 100, 
    height: 100, 
    justifyContent: "flex-start",
    alignSelf: "center",
    borderRadius: 80,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.grey
  },
  info: {
    display: 'flex',
    marginLeft: 25,
    marginTop: -10,
    flexDirection: "column",
    justifyContent: "center"
  },
  fieldRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between', 
    marginBottom: 5,
  },
  field: {
    flexDirection: "row",
    fontSize: 15, 
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  data: {
    color: '#838899',
    justifyContent: "flex-end",
    fontWeight: 'bold',
    marginLeft: 10
  },
  line: {
    width: 180,
    height: 1,
    marginBottom: 5,
    backgroundColor: COLORS.lightGrey,
  },
})