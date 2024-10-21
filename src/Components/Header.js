import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
  return (
    <View style={styles.topo}>
        <Text style={styles.tituloHeader}>InfoSass</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    topo: {
        width: "100%",
        height: 120,
        backgroundColor: "gray",
    },
    tituloHeader: {
        width: "100%",
        textAlign: "center",
        color: "white",
        paddingTop: 60,
        fontWeight: "bold",
        fontSize: 20
    }
})
