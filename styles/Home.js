import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 50,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
    borderRadius: 50,
  },
  locationSuggestions: {
    marginTop: 10,
    backgroundColor: theme.bgWhite(0.3),
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor:'#1d222a'
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  locationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.bgWhite(0.2),
  },
  locationText: {
    color: 'white',
    marginLeft: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  locationHeading: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  locationSubHeading: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.bgWhite(0.6),
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 16,
  },
  weatherImageContainer: {
    marginVertical: 20,
  },
  weatherImage: {
    width: 150,
    height: 150,
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherDescription: {
    fontSize: 24,
    fontWeight: '400',
    color: theme.bgWhite(0.7),
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  weatherDetailText: {
    color: 'white',
    fontSize: 14,
  },
  dailyForecast: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  dailyForecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dailyForecastTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  dailyForecastScroll: {
    paddingHorizontal: 16,
  },
  dailyForecastItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingVertical: 10,
    marginRight: 16,
    backgroundColor: theme.bgWhite(0.2),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.bgWhite(0.4),
  },
  fixedSizeItem: {
    width: 100,
    height: 120,
  },
  dailyForecastIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  dailyForecastDay: {
    fontSize: 14,
    color: theme.bgWhite(0.9),
    textAlign: 'center',
  },
  dailyForecastTemp: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  myLoca: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.bgWhite(0.3),
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  favoritesButton: {
    backgroundColor: theme.bgWhite(0.3),
    padding: 8,
    borderRadius: 50,
  },
});
