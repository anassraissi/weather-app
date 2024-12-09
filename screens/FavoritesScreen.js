import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchWeatherForecast } from '../api/weather';
import { getWeatherAnimation, weatherImages } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import LottieView from 'lottie-react-native';

function FavoritesScreen() {
  const { favorites, toggleFavorite, Screentheme } = useAppContext();
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
      <View style={[styles.card, Screentheme === 'dark' && styles.cardDark]}>
        {/* Left Side: Image and Weather Details */}
        <View style={styles.leftSection}>
          <LottieView 
          style={styles.weatherImage}
          source={getWeatherAnimation(weather?.current?.condition?.text)}
          autoPlay
          loop
          />
          <View style={styles.weatherDetails}>
            <Text style={[styles.dailyForecastTemp, Screentheme === 'dark' && styles.textDark]}>
              {weather?.current?.temp_c} °C
            </Text>
            <Text
              style={[styles.dailyForecastCondition, Screentheme === 'dark' && styles.textDark]}
            >
              {weather?.current?.condition?.text}
            </Text>
          </View>
        </View>

        {/* Right Side: Place Details and Button */}
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, Screentheme === 'dark' && styles.textDark]}>
            {item.name}
          </Text>
          <Text style={[styles.cardSubtitle, Screentheme === 'dark' && styles.textDark]}>
            {item.country}
          </Text>
          <TouchableOpacity
            style={[styles.removeButton, Screentheme === 'dark' && styles.removeButtonDark]}
            onPress={() => toggleFavorite(item)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        Screentheme === 'dark' ? styles.containerDark : styles.containerLight,
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={[styles.backArrow, Screentheme === 'dark' && styles.textDark]}>←</Text>
      </TouchableOpacity>
      <Text style={[styles.headerText, Screentheme === 'dark' && styles.textDark]}>
        Favorites Place
      </Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={renderFavoriteCard}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={[styles.noFavoritesText, Screentheme === 'dark' && styles.textDark]}>
          No favorites selected!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  containerLight: {
    backgroundColor: '#5fafdd',
  },
  containerDark: {
    backgroundColor: '#333',
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
    color: 'black',
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
  cardDark: {
    backgroundColor: '#444',
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  weatherImage: {
    height: 80,
    width: 80,
    marginBottom: 1,
  },
  weatherDetails: {
    alignItems: 'center',
  },
  dailyForecastTemp: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  dailyForecastCondition: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 20,
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
  removeButtonDark: {
    backgroundColor: '#c0392b',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  textDark: {
    color: '#fff',
  },
});

export default FavoritesScreen;
