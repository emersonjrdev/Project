import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosConfirmados, setPedidosConfirmados] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/pedidos');
        setPedidos(response.data);

        const responseConfirmados = await axios.get('http://10.0.2.2:3000/pedidosConfirmados');
        setPedidosConfirmados(responseConfirmados.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const deletePedido = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/pedidos/${id}`);
      setPedidos(pedidos.filter(pedido => pedido.id !== id));
      Alert.alert("Sucesso", "Pedido excluído com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      Alert.alert("Erro", "Não foi possível excluir o pedido.");
    }
  };

  const confirmarPedido = async (pedido) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/pedidos/${pedido.id}`);
      await axios.post('http://10.0.2.2:3000/pedidosConfirmados', { ...pedido, status: 'Confirmado' });

      setPedidos(pedidos.filter(p => p.id !== pedido.id));
      setPedidosConfirmados([...pedidosConfirmados, { ...pedido, status: 'Confirmado' }]);
      Alert.alert("Confirmado", "Pedido confirmado com sucesso!");
    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
      Alert.alert("Erro", "Não foi possível confirmar o pedido.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Realizados</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.pedidoContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.pedidoImage} />
            <View style={styles.pedidoInfo}>
              <Text style={styles.pedidoTitle}>{item.title}</Text>
              <Text>Status: {item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmarPedido(item)}>
              <Icon name="checkmark-circle-outline" size={24} color="green" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePedido(item.id)}>
              <Icon name="trash-outline" size={24} color="red" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Seção de Pedidos Confirmados */}
      <Text style={styles.confirmadosTitle}>Pedidos Confirmados</Text>
      <FlatList
        data={pedidosConfirmados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.pedidoContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.pedidoImage} />
            <View style={styles.pedidoInfo}>
              <Text style={styles.pedidoTitle}>{item.title}</Text>
              <Text>Status: Confirmado</Text>
            </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmadosTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  pedidoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pedidoImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  pedidoInfo: {
    flex: 1,
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
});
