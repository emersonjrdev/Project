import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DetalhesCelular({ route, navigation }) {
  // Desestruturando os dados do celular passados pela navegação
  const { title, imageUri, content } = route.params;

  return (
    <View style={styles.container}>
      {/* Barra superior com ícones */}
      <View style={styles.topBar}>
        <Icon name="arrow-back" size={24} color="#333" onPress={() => navigation.goBack()} />
        <Icon name="bookmark-outline" size={24} color="#333" />
      </View>

      {/* Imagem do celular */}
      <Image source={{ uri: imageUri }} style={styles.image} />

      {/* Título do celular */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{content}</Text>

      {/* Avaliação */}
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>4.5</Text>
        <Icon name="star" size={18} color="#FFD700" />
        <Text style={styles.ratingTotal}>/ 5.0</Text>
      </View>

      {/* Descrição */}
      <Text style={styles.description}>
        Um smartphone de alto desempenho, ideal para quem busca uma experiência completa com câmeras poderosas e tela de alta resolução.
      </Text>

      {/* Botões de ações */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avaliações</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de comprar */}
      <TouchableOpacity style={styles.buyButton}>
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
    height: 220,
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
  author: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingTotal: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
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
