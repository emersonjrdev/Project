import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function EditarPedido({ route, navigation }) {
  const { pedido } = route.params;
  const [title, setTitle] = useState(pedido.title);
  const [content, setContent] = useState(pedido.content);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/pedidos/${pedido.id}`, {
        title,
        content,
      });
      alert('Pedido atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      alert('Erro ao atualizar o pedido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Pedido</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
      />
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Conteúdo"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4d94ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
