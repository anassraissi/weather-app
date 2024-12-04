import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';
import { useNavigation } from '@react-navigation/native';

function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const [weatherData, setWeatherData] = useState({});

  const navigation = useNavigation(); // Use navigation to handle the back action

  useEffect(() => {
    async function fetchWeatherForFavorites() {
      const weatherResults = {};
      for (const item of favorites) {
        const data = await fetchWeatherForecast({ cityName: item.name, days: '7' });
        if (data) {
          weatherResults[item.name] = data;
        }
      }
      setWeatherData(weatherResults);
    }
    fetchWeatherForFavorites();
  }, [favorites]);

  const renderFavoriteCard = ({ item }) => {
    const weather = weatherData[item.name];

    return (
      <View style={styles.card}>
        {/* Left Side: Image and Weather Details */}
        <View style={styles.leftSection}>
          <Image
            source={weatherImages[weather?.current?.condition?.text]}
            style={styles.weatherImage}
          />
          <View style={styles.weatherDetails}>
            <Text style={styles.dailyForecastTemp}>{weather?.current?.temp_c} °C</Text>
            <Text style={styles.dailyForecastCondition}>{weather?.current?.condition?.text}</Text>
          </View>
        </View>

        {/* Right Side: Place Details and Button */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.country}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => toggleFavorite(item)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Favorites Place</Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={renderFavoriteCard}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites selected!</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingLeft:50,
    paddingRight:50,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  backArrow: {
    fontSize: 30,
    color: 'black',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 12,
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 3,
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80, // Ensure a fixed width for alignment
  },
  weatherImage: {
    height: 80,
    width: 80,
    marginBottom: 1,
    marginLeft:30
  },
  weatherDetails: {
    alignItems: 'center',
  },
  dailyForecastTemp: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft:15
  },
  dailyForecastCondition: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    marginLeft:20,
    
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 60,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});



export default FavoritesScreen;
