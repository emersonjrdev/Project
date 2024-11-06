import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Video } from 'expo-av';
import Card from "../Components/Card";

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        {/* Banner promocional com vídeo local */}
        <Text style={styles.tituloPrincipal}>Bem-vindo à Tech Point!</Text>
        <Video
          style={styles.banner}
          source={require('../assets/banner.mp4')}
          resizeMode="contain"
          isLooping
          shouldPlay
        />
        
        <Text style={styles.subtitulo}>A melhor loja de eletrônicos para você!</Text>

        {/* Seção de produtos em destaque */}
        <Text style={styles.tituloInfo}>Produtos em destaque</Text>
        <Card
          title="Smartphones"
          imageUri="https://d8vlg9z1oftyc.cloudfront.net/ailos/image/product/d90363dda3fe8c9e52b46082f5d0c98120230801093146/original/celular-motorola-e22-tela-de-6-5-camera-16-mpx-128gb-4gb-e-cor-preta_6999.png" 
          content="Descubra os últimos lançamentos em smartphones."
          buttonText="Ver Smartphones"
          onPress={() => navigation.navigate('Smartphones')}
        />
        <Card
          title="Notebooks"
          imageUri="https://t17208.vtexassets.com/arquivos/ids/163534/nave_notebook_gamer_i5_rtx_3050_lunar_gm5ageo_Diagonal_Aberto_1000x1000.png?v=638346428925830000" 
          content="Encontre o notebook perfeito para o seu dia a dia."
          buttonText="Ver Notebooks"
          onPress={() => navigation.navigate('Notebooks')}
        />
        <Card
          title="Acessórios"
          imageUri="https://worldshoptb.com/wp-content/uploads/2021/05/img-worldshop-banner-site.png" 
          content="Tudo o que você precisa em acessórios para seu dispositivo."
          buttonText="Ver Acessórios"
          onPress={() => navigation.navigate('Acessorios')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  container: {
    padding: 20,
    backgroundColor: "#ffffffdd",
    borderRadius: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  banner: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  tituloPrincipal: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    color: "#00796b",
    marginVertical: 15,
  },
  subtitulo: {
    fontSize: 18,
    color: "#00695c",
    textAlign: "center",
    marginBottom: 20,
  },
  tituloInfo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#004d40",
    marginVertical: 20,
    textAlign: "left",
  },
});
