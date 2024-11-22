import React, { useCallback, useState } from 'react';
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
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../theme';
import { styles } from '../styles/Home';
import { debounce, set } from "lodash"
import { fetchLocation, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';


function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather,setWeather]=useState([]);
  
  const handleLocation = (location) => {
    console.log('Selected location: ' + location);
    setLocations([]);
    fetchWeatherForecast({
      cityName:location.name,
      days:'7',
    }).then(data=>{
      setWeather(data)
      console.log('weather: ', weather.forecast.forecastday);
    })
  };
  const handelSearch=(value)=>{
    if(value.length>2){
      fetchLocation({cityName:value}).then(data=>{setLocations(data)});
      console.log(locations);
    }
  }
  
  
  const handelTextDebounce=useCallback(debounce(handelSearch,1200),[])
  const {current,location}=weather;
 
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        style={styles.backgroundImage}
      />

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
                    <Text style={styles.locationText}>{loc?.name}, {loc?.country}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Weather Forecast Section */}
        <View style={styles.weatherContainer}>
          {/* Location Heading */}
          <Text style={styles.locationHeading}>
          {location?.name}, <Text style={styles.locationSubHeading}>{location?.country}</Text>
          </Text>

          {/* Weather Image */}
          <View style={styles.weatherImageContainer}>
            <Image
              source={weatherImages[current?.condition.text]}
              style={styles.weatherImage}
            />
          </View>

          {/* Temperature */}
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>{current?.temp_c}°</Text>
            <Text style={styles.weatherDescription}>{current?.condition.text}</Text>
          </View>
        </View>

        {/* Additional Weather Data */}
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
              source={require('../assets/icons/drop.png')}
              style={styles.weatherDetailIcon}
            />
            <Text style={styles.weatherDetailText}>{current?.humidity} %</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Image
              source={require('../assets/icons/sun.png')}
              style={styles.weatherDetailIcon}
            />
            <Text style={styles.weatherDetailText}>7:30 AM</Text>
          </View>
        </View>

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
            {weather?.forecast?.forecastday?.map((item,index)=>{
              return (
                <View style={styles.dailyForecastItem}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  style={styles.dailyForecastIcon}
                />
                <Text style={styles.dailyForecastDay}>{item.date}</Text>
                <Text style={styles.dailyForecastTemp}>23°</Text>
              </View>
                 ) 
            })}

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;
