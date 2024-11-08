// src/Components/Footer.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function Footer({ currentScreen }) {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          size={28}
          color={currentScreen === 'Home' ? '#000' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
        <Icon
          name="cart"
          size={28}
          color={currentScreen === 'Pedidos' ? '#000' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Icon
          name="person"
          size={28}
          color={currentScreen === 'Perfil' ? '#000' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default Footer;
