import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de carregamento

  const handleLogin = async () => {
    // Verifica se os campos de email e senha foram preenchidos
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos.');
      return;
    }
  
    setIsLoading(true); // Ativa o loading enquanto a requisição é feita
  
    try {
      // Busca o usuário no JSON Server pelo email
      const response = await axios.get(`http://10.0.2.2:3000/users?email=${email}`);
      const user = response.data[0];
      console.log('Resposta do backend:', response.data); // Adicionado para depuração
  
      if (user) {
        console.log('Usuário encontrado:', user); // Adicionado para depuração
        // Verifica se a senha está correta
        if (user.password === password) {
          console.log('Login bem-sucedido:', user);
  
          // Armazena o ID ou outros dados do usuário localmente, se necessário
          await AsyncStorage.setItem('userId', user.id.toString());
          await AsyncStorage.setItem('userEmail', user.email);
          if (user.profileImage) {
            await AsyncStorage.setItem('userProfileImage', user.profileImage);
          }
  
          // Navega para a tela Home após login bem-sucedido
          navigation.navigate('Home');
        } else {
          Alert.alert('Erro', 'Senha incorreta.');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setIsLoading(false); // Desativa o loading após o processamento
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoFocus
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonOutlineText}>Não tem uma conta? Cadastrar</Text>
      </TouchableOpacity>
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
  title: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
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
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#000',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonOutlineText: {
    color: '#000',
    fontSize: 18,
  },
});