// src/Pages/Acessorios.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Acessorios() {
  const [acessorios, setAcessorios] = useState([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchAcessorios = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/acessorios');
      setAcessorios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAcessorio = async () => {
    if (nome && tipo) {
      try {
        await axios.post('http://10.0.2.2:3000/acessorios', { nome, tipo });
        fetchAcessorios();
        setNome('');
        setTipo('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateAcessorio = async () => {
    if (nome && tipo && editId) {
      try {
        await axios.put(`http://10.0.2.2:3000/acessorios/${editId}`, { nome, tipo });
        fetchAcessorios();
        setNome('');
        setTipo('');
        setEditId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteAcessorio = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/acessorios/${id}`);
      fetchAcessorios();
    } catch (error) {
      console.error(error);
    }
  };

  const editAcessorio = (item) => {
    setNome(item.nome);
    setTipo(item.tipo);
    setEditId(item.id);
  };

  useEffect(() => {
    fetchAcessorios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessórios</Text>
      <FlatList
        data={acessorios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nome} - {item.tipo}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => editAcessorio(item)}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAcessorio(item.id)}>
                <Text style={styles.deleteText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TextInput
        placeholder="Nome do Acessório"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Tipo do Acessório"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />
      <Button
        style={styles.button}
        title={editId ? "Atualizar Acessório" : "Adicionar Acessório"}
        onPress={editId ? updateAcessorio : addAcessorio} color='red'
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
