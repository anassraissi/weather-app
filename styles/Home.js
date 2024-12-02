import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',

  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 40,
    zIndex: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
  },
  textInput: {
    paddingLeft: 16,
    height: 44,
    flex: 1,
    fontSize: 16,
    color: 'white',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  searchButton: {
    borderRadius: 50,
    padding: 12,
    margin: 4,
  },
  locationSuggestions: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#D1D5DB',
    top: 64,
    borderRadius: 24,
    zIndex: 50,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  locationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#9CA3AF',
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#000',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  locationHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  locationSubHeading: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  weatherImageContainer: {
    marginVertical: 20,
  },
  weatherImage: {
    width: 200,
    height: 200,
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
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherDetailIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  weatherDetailText: {
    fontSize: 16,
    color: 'white',
  },
  dailyForecast: {
    marginTop: 20,
  },
  dailyForecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dailyForecastTitle: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
  dailyForecastScroll: {
    paddingHorizontal: 15,
  },
  dailyForecastItem: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 100, // Ensures a consistent width
    height: 120, // Ensures a consistent height
    justifyContent: 'space-between', // Space out content evenly
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dailyForecastIcon: {
    width: 50, // Adjusted size
    height: 50,
  },
  dailyForecastDay: {
    fontSize: 12, // Smaller font size for consistency
    color: 'white',
    marginTop: 5,
  },
  dailyForecastTemp: {
    fontSize: 14, // Consistent with day text
    color: 'white',
    marginTop: 5,
  },

  myLoca: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002B5B', // Dark background for contrast
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D72F3', // Bright blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, // Space between icon and text
  },
});
