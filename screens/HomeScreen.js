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
import { theme } from '../theme';
import { styles } from '../styles/Home';
import { debounce } from 'lodash';
import { fetchLocation, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';
import { getData, storeData } from '../utils/AsyncStorage';

function HomeScreen() {
  const navigation = useNavigation(); // Access the navigation object
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  
    

  // useEffect(() => {
  //   setLocations([]);
  //   setWeather({});
  //   let cityName = 'Rabat';
  //   getData('city').then((myCity) => {
  //     if (myCity) {
  //       cityName = myCity;
  //     }
  //     fetchWeatherForecast({ cityName, days: '7' }).then((data) => {
  //       if (data && data.current && data.location) {
  //         setWeather(data);
  //       }
  //       setLoading(false);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Reverse geocoding to get the city name
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(reverseGeocode);
      // console.log(reverseGeocode[0]?.city);
      let cityName = reverseGeocode[0]?.city || 'Rabat'; // Default to Rabat if no city found

      // Fetch weather data for the detected city
      getData('city').then((myCity) => {
        if (myCity=='Rabat') {
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
  }, []);

  const handleLocation = (location) => {
    setLocations([]);
    setLoading(true);
    fetchWeatherForecast({ cityName: location.name, days: '7' }).then((data) => {
      if (data && data.current && data.location) {
        setWeather(data);
        storeData('city', location.name);
      }
      setLoading(false);
    });
  };

  const handelSearch = (value) => {
    if (value.length > 2) {
      fetchLocation({ cityName: value }).then((data) => setLocations(data));
    }
  };

  const handelTextDebounce = useCallback(debounce(handelSearch, 1200), []);
  const { current, location } = weather || {};


  return (
    <ImageBackground source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
      <StatusBar style="light" />
      {/* Search Section */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' },
            ]}
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
                    <Entypo name="location-pin" size={24} color="grey" />
                    <Text style={styles.locationText}>
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Weather Forecast Section */}
        {current && location && (
          <View style={styles.weatherContainer}>
            <Text style={styles.locationHeading}>
              {location?.name},{' '}
              <Text style={styles.locationSubHeading}>{location?.country}</Text>
            </Text>
            <View style={styles.weatherImageContainer}>
              <Image
                source={weatherImages[current?.condition.text]}
                // source={{
                //   uri: current?.condition
                //     ? `https:${current.condition.icon}`
                //     : null,
                // }}
                style={styles.weatherImage}
              />
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperatureText}>{current?.temp_c}°</Text>
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
                style={[styles.dailyForecastItem, styles.fixedSizeItem]} // Apply consistent width and height
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
                <Text style={styles.dailyForecastTemp}>{item.day.avgtemp_c}°</Text>
              </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
      </ImageBackground>

  );
}

export default HomeScreen;
