import { StyleSheet, Text, View } from 'react-native'
import MainNavigator from './MainNavigator'
import Header from './src/Components/Header'

export default function App() {
  return (
    <>
    <Header />
      <MainNavigator/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
