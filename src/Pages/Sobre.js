import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
          contatos.map((contato, index) => (
            <View key={index} style={styles.contatoItem}>
              <Text>{contato.nome}</Text>
              <Text>{contato.telefone}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Nenhum contato disponível</Text>
        )}

        {/* Lista de FAQ */}
        <Text style={styles.title}>FAQ</Text>
        {faq.length > 0 ? (
          faq.map((item, index) => (
            <View key={index} style={styles.faqItem}>
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
