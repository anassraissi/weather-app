import LottieView from 'lottie-react-native';

export const apiKey='7c64f8178e9e4133bfc200538242811';
    export const weatherImages = {
        'Partly cloudy': require('../assets/animations/cloudy.json'),
        'Partly Cloudy': require('../assets/animations/cloudy.json'),
        'Moderate rain': require('../assets/animations/rainy.json'),
        'Moderate snow': require('../assets/animations/snow.json'),
        'Patchy rain possible': require('../assets/animations/rainy.json'),
        'Sunny': require('../assets/animations/sun.json'),
        'Clear': require('../assets/animations/sun.json'),
        'Overcast': require('../assets/animations/cloudy.json'),
         'Cloudy': require('../assets/animations/cloudy.json'),
         'Mist': require('../assets/animations/cloudy.json'),
         'Light rain': require('../assets/animations/rainy.json'),
         'Moderate rain at times':require('../assets/animations/rainy.json'),
         'Heavy rain': require('../assets/animations/rainy.json'),
         'Heavy rain at times':require('../assets/animations/rainy.json'),
         'Moderate or heavy freezing rain':require('../assets/animations/rainy.json'),
         'Moderate or heavy rain shower':require('../assets/animations/rainy.json'),
         'Moderate or heavy rain with thunder' :require('../assets/animations/rainy.json'),
         'other':require('../assets/animations/rainy.json'),
         'freez':require('../assets/animations/frezzing.json'),
         'Light snow':require('../assets/animations/snow.json'),
         'patchy Light snow':require('../assets/animations/snow.json')
         }



// Function to get the appropriate animation based on the condition text
export const getWeatherAnimation = (conditionText) => {
  const normalizedText = conditionText?.toLowerCase().trim(); // Normalize the text
  const keys = Object.keys(weatherImages).map(key => key.toLowerCase());

  // Find the matching key
  const match = keys.find(key => key === normalizedText);
  
  // Return the corresponding animation or default to 'other'
  return match 
    ? weatherImages[Object.keys(weatherImages).find(key => key.toLowerCase() === match)] 
    : weatherImages['other'];
};