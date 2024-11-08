import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/Pages/Home';
import DetalhesCelular from './src/Pages/DetalhesCelular';
import DetalhesAcessorio from './src/Pages/DetalhesAcessorio';
import Perfil from './src/Pages/Perfil';
import Pedidos from './src/Pages/Pedidos';
import WelcomeScreen from './src/Pages/WelcomeScreen';
import LoginScreen from './src/Pages/LoginScreen';
import RegisterScreen from './src/Pages/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Tela de Boas-vindas sem cabeçalho */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />

        {/* Tela de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Tela de Registro */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />

        {/* Tela Inicial */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        
        {/* Outras telas com cabeçalho padrão */}
        <Stack.Screen name="DetalhesCelular" component={DetalhesCelular} options={{ title: 'Detalhes do Celular' }} />
        <Stack.Screen name="DetalhesAcessorio" component={DetalhesAcessorio} options={{ title: 'Detalhes do Acessório' }} />
        <Stack.Screen name="Pedidos" component={Pedidos} options={{ title: 'Pedidos Realizados' }} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
