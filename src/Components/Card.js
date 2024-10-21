import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Card(props) {
  return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <Text style={styles.cardContent}>{props.content}</Text>
        <Button style={styles.button}  title={props.buttonText} onPress={props.onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 30,
        marginTop: 12,
        borderWidth: 4, // Define a largura da borda
        borderColor: "gray", // Adiciona uma cor para a borda
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    cardContent: {
        fontSize: 14,
        marginBottom: 10
    },
    button: {
        backgroundColor: 'gray'
    }
})

