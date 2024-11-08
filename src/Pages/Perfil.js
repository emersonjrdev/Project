import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';

export default function Perfil() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const phone = await AsyncStorage.getItem('userPhone');
        const profileImage = await AsyncStorage.getItem('userProfileImage');
        
        console.log('Dados recuperados do AsyncStorage:', { name, email, phone, profileImage });

        if (name && email) {
          setUserData({
            name,
            email,
            phone,
            profileImage: profileImage || 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/10/shrek-e1696623069422.jpeg', // Default profile image
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePic}
        source={{ uri: userData.profileImage }}
      />
      <Text style={styles.name}>{userData.name || 'Nome do usuário'}</Text>
      <Text style={styles.info}>Email: {userData.email || 'E-mail não disponível'}</Text>
      <Text style={styles.info}>Telefone: {userData.phone || 'Telefone não disponível'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
});
