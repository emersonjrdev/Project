import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Alert, Modal, TextInput } from "react-native";
import axios from "axios";

export default function () {
  const [contatos, setContatos] = useState([]);
  const [faq, setFaq] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contatoEditado, setContatoEditado] = useState({ id: null, nome: "", telefone: "" });

  // Função para buscar contatos do servidor
  const listContatos = () => {
    axios
      .get("http://10.0.2.2:3000/contatos")
      .then((resposta) => {
        setContatos(resposta.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar contatos", error);
      });
  };

  // Função para buscar FAQ do servidor
  const listFaq = () => {
    axios
      .get("http://10.0.2.2:3000/faq")
      .then((resposta) => {
        setFaq(resposta.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar FAQ", error);
      });
  };

  // Função para excluir um contato
  const excluirContato = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este contato?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            axios
              .delete(`http://10.0.2.2:3000/contatos/${id}`)
              .then(() => {
                Alert.alert("Contato excluído com sucesso");
                setContatos(contatos.filter((contato) => contato.id !== id));
              })
              .catch((error) => {
                console.error("Erro ao excluir contato", error);
                Alert.alert("Erro ao excluir contato");
              });
          },
        },
      ]
    );
  };

  // Função para abrir o modal de edição
  const abrirModalEdicao = (id, nome, telefone) => {
    setContatoEditado({ id, nome, telefone });
    setModalVisible(true);
  };

  // Função para salvar as alterações do contato editado
  const salvarEdicao = () => {
    axios
      .put(`http://10.0.2.2:3000/contatos/${contatoEditado.id}`, {
        nome: contatoEditado.nome,
        telefone: contatoEditado.telefone,
      })
      .then(() => {
        Alert.alert("Contato atualizado com sucesso");
        setContatos(
          contatos.map((contato) =>
            contato.id === contatoEditado.id
              ? { ...contato, nome: contatoEditado.nome, telefone: contatoEditado.telefone }
              : contato
          )
        );
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar contato", error);
        Alert.alert("Erro ao atualizar contato");
      });
  };

  useEffect(() => {
    listContatos();
    listFaq();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Lista de Contatos */}
        <Text style={styles.title}>Lista de Contatos</Text>
        {contatos.length > 0 ? (
          contatos.map((contato) => (
            <View key={contato.id} style={styles.contatoItem}>
              <Text>{contato.nome}</Text>
              <Text>{contato.telefone}</Text>
              <View style={styles.buttonContainer}>
      <Button title="Editar" color="grey" onPress={() => abrirModalEdicao(contato.id, contato.nome, contato.telefone)} />
      <Button title="Excluir" color="red" onPress={() => excluirContato(contato.id)} />
       </View>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Nenhum contato disponível</Text>
        )}

        {/* Lista de FAQ */}
        <Text style={styles.title}>FAQ</Text>
        {faq.length > 0 ? (
          faq.map((item) => (
            <View key={item.id} style={styles.faqItem}>
              <Text style={styles.pergunta}>{item.pergunta}</Text>
              <Text>{item.resposta}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Nenhum FAQ disponível</Text>
        )}
      </View>

      {/* Modal de Edição */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Contato</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={contatoEditado.nome}
              onChangeText={(nome) => setContatoEditado({ ...contatoEditado, nome })}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={contatoEditado.telefone}
              onChangeText={(telefone) => setContatoEditado({ ...contatoEditado, telefone })}
              keyboardType="phone-pad"
            />
            <Button title="Salvar" color='green' onPress={salvarEdicao} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Modifique o estilo do container de cada contato
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  contatoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  faqItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pergunta: {
    fontWeight: "bold",
  },
  noData: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10, // espaçamento entre o texto e os botões
  },
  buttonSpacing: {
    marginRight: 10, // espaçamento entre os botões "Editar" e "Excluir"
  },
});

