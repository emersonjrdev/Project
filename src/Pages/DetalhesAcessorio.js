import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Importando o axios para requisições HTTP

export default function DetalhesAcessorio({ route, navigation }) {
  const { title, imageUri, content } = route.params;

  const handleBuy = async () => {
    try {
      // Endereço da API (verifique se o endereço está correto para o seu emulador ou dispositivo)
      const url = 'http://10.0.2.2:3000/pedidos'; // Use o IP local se estiver em um dispositivo físico
      
      // Envia o pedido para o DB.json
      const response = await axios.post(url, {
        title,
        imageUri,
        content,
        status: 'Em andamento', // Status inicial do pedido
      });
      
      // Verifica a resposta para garantir que o pedido foi adicionado com sucesso
      if (response.status === 201) {
        alert('Pedido realizado com sucesso!');
      } else {
        alert('Erro ao realizar o pedido.');
      }
      
      navigation.goBack(); // Volta para a página anterior
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
      alert('Erro ao realizar o pedido. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra superior com ícones */}
      <View style={styles.topBar}>
        <Icon name="arrow-back" size={24} color="#333" onPress={() => navigation.goBack()} />
        <Icon name="bookmark-outline" size={24} color="#333" />
      </View>

      {/* Imagem do acessório */}
      <Image source={{ uri: imageUri }} style={styles.image} />

      {/* Título e conteúdo */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      {/* Descrição */}
      <Text style={styles.description}>
        Aproveite a alta qualidade e o design inovador desse acessório, perfeito para o seu smartphone.
      </Text>

      {/* Botão de ação */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyButtonText}>Comprar Agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
