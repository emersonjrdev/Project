import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.topo}>
      <Text style={styles.tituloHeader}>TechPoint</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topo: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#192f6a', // Borda inferior para dar estilo
  },
  tituloHeader: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Sombra no texto
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: "monospace",
    marginTop: 25
  },
});
