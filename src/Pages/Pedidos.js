import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Utilizando axios para acessar o DB

export default function Pedidos({ navigation }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Carregar os pedidos do DB.json
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pedidos');
        setPedidos(response.data);
      } catch (error) {
        alert('Erro ao carregar os pedidos.');
      }
    };

    fetchPedidos();
  }, []);

  // Função para excluir um pedido
  const deletePedido = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pedidos/${id}`);
      setPedidos(pedidos.filter(pedido => pedido.id !== id)); // Atualiza o estado
    } catch (error) {
      alert('Erro ao excluir o pedido.');
    }
  };

  // Função para editar um pedido
  const editPedido = (pedido) => {
    navigation.navigate('EditarPedido', { pedido });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardContent}>{item.content}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePedido(item.id)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editPedido(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4d94ff',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
