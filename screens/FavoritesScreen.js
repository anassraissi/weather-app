import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';

function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const [weather, setWeather] = useState({});


  useEffect(()=>{
    fetchWeatherForecast({ cityName: "Rabat", days: '7' }).then((data) => {
      if (data) {
        setWeather(data);
        // storeData('city', location.name);
      }
      console.log(weather?.current?.condition?.text);
      
      // setLoading(false);
    });
  },[favorites.length])


  const renderFavoriteCard = ({ item }) => (


    <View style={styles.card}>
              {/* <Image
                source={weatherImages[weather?.current?.condition?.text]}
                // source={{
                //   uri: current?.condition
                //     ? `https:${current.condition.icon}`
                //     : null,
                // }}
                style={styles.weatherImage}
              /> */}
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

  return (
    <View style={styles.container}>
      <Text style={{color:'red',fontSize:20}}> Favorites place </Text>

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
    padding:50,
    marginTop:50
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
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
