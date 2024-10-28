import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Alert } from "react-native";
import axios from "axios";

export default function () {
  const [contatos, setContatos] = useState([]);
  const [faq, setFaq] = useState([]);

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
                setContatos(contatos.filter((contato) => contato.id !== id)); // Remove o contato da lista
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
              <Button title="Excluir" color="red" onPress={() => excluirContato(contato.id)} />
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
    </ScrollView>
  );
}

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
});
