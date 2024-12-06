import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

export default function ScreenDetails({ route }) {
  const navigation = useNavigation();
  const { item, dayName } = route.params;
  const { Screentheme, toggleTheme } = useAppContext(); // Use theme and toggle function

  const themeStyles = Screentheme === 'light' ? styles.lightTheme : styles.darkTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={[styles.backArrow, themeStyles.text]}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>

        <Text style={[styles.title, themeStyles.text]}>Hourly Forecast for {dayName}</Text>

        {/* Hourly Forecast */}
        <ScrollView contentContainerStyle={styles.hourlyList}>
          {item?.hour.map((hourData, idx) => (
            <View key={idx} style={[styles.hourlyItem, themeStyles.card]}>
              <Text style={[styles.hourText, themeStyles.text]}>
                {hourData.time.split(' ')[1]}
              </Text>
              <Image
                source={{
                  uri: hourData?.condition?.icon
                    ? `https:${hourData.condition.icon}`
                    : null,
                }}
                style={styles.hourIcon}
              />
              <Text style={[styles.tempText, themeStyles.text]}>{hourData.temp_c}°C</Text>
              <Text style={[styles.conditionText, themeStyles.text]}>
                {hourData.condition.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 1,
    zIndex: 1,
    padding: 10,
  },
  backArrow: {
    fontSize: 40,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  hourlyList: {
    paddingBottom: 16,
  },
  hourlyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  hourText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  hourIcon: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tempText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  conditionText: {
    flex: 2,
    fontSize: 14,
    textAlign: 'center',
  },
  themeButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Theme Styles
  lightTheme: {
    container: { backgroundColor: '#5fafdd' },
    text: { color: '#000' },
    button: { backgroundColor: '#ddd' },
    card: { backgroundColor: '#fff' },
  },
  darkTheme: {
    container: { backgroundColor: '#121212' },
    text: { color: '#fff' },
    button: { backgroundColor: '#333' },
    card: { backgroundColor: '#1e1e1e' },
  },
});
