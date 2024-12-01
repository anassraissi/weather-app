import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')} // Replace with your default background image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay for readability
  },
});

export default ScreenWrapper;
