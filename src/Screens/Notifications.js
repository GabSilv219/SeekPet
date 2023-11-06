import { View, Text, StyleSheet, ScrollView } from 'react-native';
import COLORS from '../constants/colors';
import { Entypo } from '@expo/vector-icons';

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Entypo name="bell" color={COLORS.lightGrey} size={80}/>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  title:{
    fontSize: 25,
    color: COLORS.grey
  }
})