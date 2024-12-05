import React from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function ConfigScreen() {
  const { Screentheme:theme, toggleTheme, temperatureUnit, changeTemperatureUnit } = useAppContext();
  

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkMode]}>
      <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
        Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={toggleTheme}
      />
      
      <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
        Temperature Unit: {temperatureUnit === 'C' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Set to °C"
          onPress={() => changeTemperatureUnit('C')}
        />
        <Button
          title="Set to °F"
          onPress={() => changeTemperatureUnit('F')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5fafdd',
  },
  darkMode: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  darkText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});
