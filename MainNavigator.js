import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/Pages/Home';
import Sobre from './src/Pages/Sobre';
import Contato from './src/Pages/Contato';
import Smartphones from './src/Pages/Smartphones';
import Notebooks from './src/Pages/Notebooks';
import Acessorios from './src/Pages/Acessorios';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Sobre" component={Sobre}/>
        <Stack.Screen name="Contato" component={Contato}/>
        <Stack.Screen name="Smartphones" component={Smartphones} options={{ title: "Smartphones" }}/>
        <Stack.Screen name="Notebooks" component={Notebooks} options={{ title: "Notebooks" }}/>
        <Stack.Screen name="Acessorios" component={Acessorios} options={{ title: "Acessórios" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
