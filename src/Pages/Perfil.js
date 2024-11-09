import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

export default function Perfil() {
  const navigation = useNavigation(); // Hook para navegação

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const phone = await AsyncStorage.getItem('userPhone');
        const profileImage = await AsyncStorage.getItem('userProfileImage');
        
        setUserData({
          name: name || 'Nome do usuário',
          email: email || 'E-mail não disponível',
          phone: phone || 'Telefone não disponível',
          profileImage: profileImage || 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/10/shrek-e1696623069422.jpeg',
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('userName', userData.name);
      await AsyncStorage.setItem('userPhone', userData.phone);
      await AsyncStorage.setItem('userProfileImage', userData.profileImage);
      
      await axios.put('http://10.0.2.2:3000/users/43f7', {
        name: userData.name,
        phone: userData.phone,
        profileImage: userData.profileImage,
      });
      
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setIsEditing(false);
      navigation.goBack(); // Retorna para a tela anterior (Home)
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear(); // Limpa todos os dados do usuário
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] }); // Redireciona para a página de boas-vindas
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.profilePic} 
        source={{ uri: userData.profileImage || 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png' }} 
      />

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="URL da Imagem do Perfil"
            value={userData.profileImage}
            onChangeText={(text) => setUserData((prev) => ({ ...prev, profileImage: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={userData.name}
            onChangeText={(text) => setUserData((prev) => ({ ...prev, name: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={userData.phone}
            onChangeText={(text) => setUserData((prev) => ({ ...prev, phone: text }))}
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.info}>Email: {userData.email}</Text>
          <Text style={styles.info}>Telefone: {userData.phone}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </>
      )}
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff0048',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
