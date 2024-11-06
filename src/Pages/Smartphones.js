import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Smartphones() {
  const [smartphones, setSmartphones] = useState([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchSmartphones = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/smartphones');
      setSmartphones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addSmartphone = async () => {
    if (marca && modelo) {
      try {
        await axios.post('http://10.0.2.2:3000/smartphones', { marca, modelo });
        fetchSmartphones();
        setMarca('');
        setModelo('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateSmartphone = async () => {
    if (marca && modelo && editId) {
      try {
        await axios.put(`http://10.0.2.2:3000/smartphones/${editId}`, { marca, modelo });
        fetchSmartphones();
        setMarca('');
        setModelo('');
        setEditId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteSmartphone = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/smartphones/${id}`);
      fetchSmartphones();
    } catch (error) {
      console.error(error);
    }
  };

  const editSmartphone = (item) => {
    setMarca(item.marca);
    setModelo(item.modelo);
    setEditId(item.id);
  };

  useEffect(() => {
    fetchSmartphones();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smartphones</Text>

      <FlatList
        data={smartphones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.marca} - {item.modelo}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => editSmartphone(item)}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteSmartphone(item.id)}>
                <Text style={styles.deleteText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
        style={styles.input}
      />
      <TextInput
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
        style={styles.input}
      />

      <Button 
        title={editId ? "Atualizar Smartphone" : "Adicionar Smartphone"}
        onPress={editId ? updateSmartphone : addSmartphone} color='red'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 20, // Adiciona uma margem superior
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 140, // Adiciona espaço extra na parte inferior da lista
  },
});

