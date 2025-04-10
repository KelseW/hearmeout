import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? 55 : 120}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image source={require('../images/logo.png')} style={styles.logo} />

          <View style={styles.middle}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainScreen', { username })}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© Kelsey Wemhoener 2025</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
  flex: 1,
  backgroundColor: '#ADD8E6', // Main screen bg
},
container: {
  flexGrow: 1,
  backgroundColor: '#ADD8E6', // ScrollView content area
},
inner: {
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#ADD8E6', // Inner content wrapper
  paddingHorizontal: 20,
  paddingTop: 30,
  paddingBottom: 20,
},
  logo: {
    width: 500,
    height: 500,
    marginTop: -20,
  },
  middle: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#808080',
  },
});

export default LoginScreen;