import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import Card from "../Components/Card";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {
  const navigation = useNavigation();

  // Lista de celulares populares
  const celularesPopulares = [
    {
      id: '1',
      title: "Samsung S23 Ultra",
      imageUri: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/422462/Smartphone-Samsung-Galaxy-S23-Ultra-5G-256GB-12GB-RAM-Octa-Core-C-mera-Qu-drupla-200MP-Selfie-12MP-Tela-6-8-Caneta-S-Pen-Verde_1723226702_g.jpg",
      content: "Samsung",
    },
    {
      id: '2',
      title: "Samsung S24 Ultra",
      imageUri: "https://images.samsung.com/is/image/samsung/p6pim/pt/2401/gallery/pt-galaxy-s24-s928-489596-sm-s928bzoheub-539355002?$650_519_PNG$",
      content: "Samsung",
    },
    {
      id: '3',
      title: "iPhone 14 Pro",
      imageUri: "https://lwcenter.com.br/wp-content/uploads/2023/02/14-branco.png",
      content: "Apple",
    },
  ];

  // Lista de acessórios populares
  const acessoriosPopulares = [
    {
      id: '1',
      title: "Fone de Ouvido Bluetooth",
      imageUri: "https://www.eletronicafaria.com.br/3889-large_default/fone-de-ouvido-bluetooth-airdots-2-xiaomi.jpg",
      content: "Qualidade de som incrível",
    },
    {
      id: '2',
      title: "Carregador Portátil",
      imageUri: "https://tudosobreprodutos.com.br/img/carregador-portatil-samsung-eb-p000b-10-00mah_1_.png",
      content: "Carregamento rápido e eficiente",
    },
  ];

  return (
    <ScrollView style={styles.background}>
      <View style={styles.header}>
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/10/shrek-e1696623069422.jpeg' }}
        />
        <Text style={styles.greeting}>Olá, Emerson!</Text>
        <Icon name="search" size={24} color="#333" style={styles.searchIcon} />
      </View>

      {/* Seção de celulares populares */}
      <Text style={styles.sectionTitle}>Celulares populares</Text>
      <FlatList
        horizontal
        data={celularesPopulares}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 10 }}>
            <Card
              title={item.title}
              imageUri={item.imageUri}
              content={item.content}
              buttonText="Detalhes"
              onPress={() => navigation.navigate('DetalhesCelular', { ...item })}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Seção de acessórios populares */}
      <Text style={styles.sectionTitle}>Acessórios populares</Text>
      <View style={styles.cardList}>
        {acessoriosPopulares.map(item => (
          <View key={item.id} style={{ marginBottom: 20 }}>
            <Card
              title={item.title}
              imageUri={item.imageUri}
              content={item.content}
              buttonText="Detalhes"
              onPress={() => navigation.navigate('DetalhesAcessorio', { ...item })}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardList: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
