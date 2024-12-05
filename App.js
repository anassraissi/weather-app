import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import ScreenDetails from './screens/ScreenDetails';
import FavoritesScreen from './screens/FavoritesScreen';
import ConfigScreen from './screens/ConfigScreen';

// Context
import { FavoritesProvider } from './context/FavoritesContext';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScreenDetails"
        component={ScreenDetails}
        options={{ title: 'Details', headerShown: false }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ title: 'Favorites', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Config') {
                iconName = 'settings';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Config"
            component={ConfigScreen}
            options={{ title: 'Config', headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
