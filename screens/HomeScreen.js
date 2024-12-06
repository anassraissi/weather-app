import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import * as Location from 'expo-location'; // For Expo users
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../theme'; // Assuming theme contains colors
import { styles } from '../styles/Home';
import { debounce } from 'lodash';
import { fetchLocation, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';
import { getData, removeData, storeData } from '../utils/AsyncStorage';
import { useAppContext } from '../context/AppContext'; // Use your context

function HomeScreen() {
  const navigation = useNavigation(); // Access the navigation object
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, Screentheme, temperatureUnit, changeTemperatureUnit } = useAppContext(); // Access context values
  
  useEffect(() => {
    myLocalisation();
  }, []);
  
  const myLocalisation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      let cityName = reverseGeocode[0]?.city || 'Rabat';

      getData('city').then((myCity) => {
        if (myCity === 'Rabat') {
          cityName = myCity;
        }
        fetchWeatherForecast({ cityName, days: '7' }).then((data) => {
          if (data && data.current && data.location) {
            setWeather(data);
          }
          setLoading(false);
        });
      });
    })();
  };

  const currentLocalisation = () => {
    removeData('city');
    myLocalisation();
  };

  const handleLocation = (location) => {
    setLocations([]);
    setLoading(true);
    fetchWeatherForecast({ cityName: location.name, days: '7' }).then((data) => {
      if (data && data.current && data.location) {
        setWeather(data);
        storeData('city', location.name);
      }
      setLoading(false);
      toggleSearch(false);
    });
  };

  const handelSearch = (value) => {
    if (value.length > 2) {
      fetchLocation({ cityName: value }).then((data) => setLocations(data));
    }
  };

  const handelTextDebounce = useCallback(debounce(handelSearch, 1200), []);
  const { current, location } = weather || {};

  const currentPlace = {
    name: location?.name,
    country: location?.country,
  };

  const convertTemperature = (tempCelsius) => {
    if (temperatureUnit === 'F') {
      return (tempCelsius * 9) / 5 + 32; // Celsius to Fahrenheit
    }
    return tempCelsius; // Celsius
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Screentheme === 'dark' ? '#000' : '#5fafdd' }]}>
      <View style={styles.searchContainer}>
        <View
          style={[styles.searchBar, { backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }]}
        >
          {showSearch && (
            <TextInput
              onChangeText={handelTextDebounce}
              placeholder="Search city"
              placeholderTextColor="lightgray"
              style={styles.textInput}
            />
          )}
          <TouchableOpacity
            onPress={() => toggleSearch(!showSearch)}
            style={[styles.searchButton, { backgroundColor: theme.bgWhite(0.3) }]}
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Location Suggestions */}
        {showSearch && locations.length > 0 && (
          <View style={styles.locationSuggestions}>
            {locations.map((loc, index) => {
              const showBorder = index + 1 !== locations.length;

              return (
                <TouchableOpacity
                  onPress={() => handleLocation(loc)}
                  key={index}
                  style={[styles.locationItem, showBorder && styles.locationItemBorder]}
                >
                  <Entypo name="location-pin" size={24} color="white" />
                  <Text style={styles.locationText}>
                    {loc?.name}, {loc?.country}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* My Location Button */}
      {!showSearch && (
        <View style={styles.myLoca}>
          <TouchableOpacity style={styles.button} onPress={currentLocalisation}>
            <Entypo name="location-pin" size={15} color="#fff" />
            <Text style={styles.buttonText}>My Location</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.favoritesButton} onPress={() => toggleFavorite(currentPlace)}>
<Entypo
  name={
    favorites.some((fav) => fav.name === currentPlace.name)
      ? 'heart'
      : 'heart-outlined'
  }
  size={32}
  color={
    favorites.some((fav) => fav.name === currentPlace.name)
      ? 'red'
      : 'white'
  }
/>
</TouchableOpacity>


        </View>
      )}

      {/* Weather Section */}
      {current && location && (
        <View style={styles.weatherContainer}>
          <Text style={styles.locationHeading}>
            {location?.name},{' '}
            <Text style={styles.locationSubHeading}>{location?.country}</Text>
          </Text>





          <View style={styles.weatherImageContainer}>
            <Image
              source={weatherImages[current?.condition.text]}
              style={styles.weatherImage}
            />
          </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>
              {convertTemperature(current?.temp_c).toFixed(1)}°{temperatureUnit}
            </Text>
            <Text style={styles.weatherDescription}>{current?.condition.text}</Text>
          </View>
        </View>
      )}

      {/* Additional Weather Data */}
      {current && (
        <View style={styles.weatherDetails}>
          <View style={styles.weatherDetailItem}>
            <Image
              source={require('../assets/icons/wind.png')}
              style={styles.weatherDetailIcon}
            />
            <Text style={styles.weatherDetailText}>{current?.wind_kph} km/h</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Image
              source={require('../assets/icons/humidite.png')}
              style={styles.weatherDetailIcon}
            />
            <Text style={styles.weatherDetailText}>{current?.humidity} %</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Image
              source={require('../assets/icons/sun.png')}
              style={styles.weatherDetailIcon}
            />
            <Text style={styles.weatherDetailText}>
              {weather.forecast?.forecastday[0].astro?.sunrise}
            </Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Image
              source={require('../assets/icons/sunset.png')}
              style={styles.weatherDetailIcon}
            />
            <Text style={styles.weatherDetailText}>
              {weather.forecast?.forecastday[0].astro?.sunset}
            </Text>
          </View>
        </View>
      )}

      {/* Daily Forecast */}
      <View style={styles.dailyForecast}>
        <View style={styles.dailyForecastHeader}>
          <AntDesign name="calendar" size={24} color="white" />
          <Text style={styles.dailyForecastTitle}>Daily Forecast</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.dailyForecastScroll}
          showsHorizontalScrollIndicator={false}
        >
          {weather?.forecast?.forecastday?.map((item, index) => {
            let date = new Date(item.date);
            let option = { weekday: 'long' };
            let dayName = date.toLocaleDateString('en-US', option);
            return (
              <TouchableOpacity
                style={[styles.dailyForecastItem, styles.fixedSizeItem]}
                key={index}
                onPress={() => navigation.navigate('ScreenDetails', { item, dayName })}
              >
                <Image
                  source={{
                    uri: item.day?.condition?.icon
                      ? `https:${item.day.condition.icon}`
                      : null,
                  }}
                  style={styles.dailyForecastIcon}
                />
                <Text style={styles.dailyForecastDay}>{dayName}</Text>
                <Text style={styles.dailyForecastTemp}>
                  {convertTemperature(item.day.avgtemp_c).toFixed(1)}°{temperatureUnit}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
