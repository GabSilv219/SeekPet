import { View, Text, StyleSheet, ScrollView } from 'react-native';
import COLORS from '../constants/colors';

import { Entypo } from '@expo/vector-icons'

export default function ButtonNew({ size, color, focused }) {
  return (
    <View style={[styles.container, { backgroundColor: focused ? COLORS.primary : '#E8E131' }]}>
      <Entypo name='plus' size={size} color={ focused ? COLORS.white : "#f8f8f8" } ></Entypo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
})