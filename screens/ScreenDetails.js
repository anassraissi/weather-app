import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ScreenDetails({ route }) {
  const navigation = useNavigation(); // Use navigation to handle the back action
  const { item, dayName } = route.params;

  return (
    <View style={styles.container}>
      {/* Custom Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/images/bg.png')}
        style={styles.backgroundImage}
        blurRadius={5}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Hourly Forecast for {dayName}</Text>
        <ScrollView contentContainerStyle={styles.hourlyList}>
          {item?.hour.map((hourData, idx) => (
            <View key={idx} style={styles.hourlyItem}>
              <Text style={styles.hourText}>{hourData.time.split(' ')[1]}</Text>
              <Image
                source={{
                  uri: hourData?.condition?.icon
                    ? `https:${hourData.condition.icon}`
                    : null,
                }}
                style={styles.hourIcon}
              />
              <Text style={styles.tempText}>{hourData.temp_c}°C</Text>
              <Text style={styles.conditionText}>{hourData.condition.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    color: '#fff',
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
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  hourlyList: {
    paddingBottom: 16,
  },
  hourlyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  hourText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
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
    color: '#fff',
    textAlign: 'center',
  },
  conditionText: {
    flex: 2,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

