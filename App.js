import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ScreenDetails from './screens/ScreenDetails';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesScreen from './screens/FavoritesScreen';


const Stack = createStackNavigator();

export default function App() { 
  return (
    <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }} // No header for HomeScreen
        />
        <Stack.Screen
          name="ScreenDetails"
          component={ScreenDetails}
          options={{ headerShown: false }} // No header for ScreenDetails
        />
        <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </FavoritesProvider>
  );
}
