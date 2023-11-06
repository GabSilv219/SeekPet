import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking  } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import COLORS from '../constants/colors';

const QRCodeScreen = ({ route }) => {
  const { petId } = route.params;

  const handleLinkPress = () => {
    const url = `https://api-seekpet-prisma.onrender.com/pet/${petId}`;

    Linking.openURL(url)
      .catch((error) => console.error(`Erro ao abrir a URL: ${error}`));
  };

  return (
    <View style={styles.container}>
      <QRCode value={`https://api-seekpet-prisma.onrender.com/pet/${petId}`} size={300} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text style={styles.downloadButton}>Download QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleLinkPress}>
        <Text style={[styles.downloadButton, {marginLeft: 50}]}>Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey
  },
  downloadButton: {
    marginTop: 20,
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default QRCodeScreen;
