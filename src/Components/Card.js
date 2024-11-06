import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      
      {/* Imagem entre o título e o conteúdo */}
      {props.imageUri && (
        <Image 
          source={{ uri: props.imageUri }} 
          style={styles.cardImage} 
          resizeMode="cover" 
        />
      )}
      
      <Text style={styles.cardContent}>{props.content}</Text>
      <Button style={styles.button} title={props.buttonText} onPress={props.onPress} color='red'/>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: 150, // Ajuste a altura conforme necessário
    borderRadius: 8,
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
});
