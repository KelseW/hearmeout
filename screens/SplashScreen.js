import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />

      <View style={styles.middle}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>© Kelsey Wemhoener 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  logo: {
    width: 500,
    height: 500,
    marginTop: -20,
  },
  middle: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#808080',
  },
});

export default SplashScreen;