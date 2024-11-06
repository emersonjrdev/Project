import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchNotebooks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/notebooks');
      setNotebooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNotebook = async () => {
    if (marca && modelo) {
      try {
        await axios.post('http://10.0.2.2:3000/notebooks', { marca, modelo });
        fetchNotebooks();
        setMarca('');
        setModelo('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateNotebooks = async () => {
    if (marca && modelo && editId) {
      try {
        await axios.put(`http://10.0.2.2:3000/notebooks/${editId}`, { marca, modelo });
        fetchNotebooks();
        setMarca('');
        setModelo('');
        setEditId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteNotebook = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/notebooks/${id}`);
      fetchNotebooks();
    } catch (error) {
      console.error(error);
    }
  };

  const editNotebook = (item) => {
    setMarca(item.marca);
    setModelo(item.modelo);
    setEditId(item.id);
  };

  useEffect(() => {
    fetchNotebooks();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Notebooks</Text>
        <FlatList
          data={notebooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.marca} - {item.modelo}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => editNotebook(item)} style={styles.editButton}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNotebook(item.id)} style={styles.deleteButton}>
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
        <TouchableOpacity style={styles.addButton} onPress={editId ? updateNotebooks : addNotebook}>
          <Text style={styles.addButtonText}>{editId ? "Atualizar Notebook" : "Adicionar Notebook"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Fundo com gradiente
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffffee',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#E53935',
    borderRadius: 5,
    padding: 5,
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
