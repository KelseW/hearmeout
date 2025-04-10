import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = ({ route, navigation }) => {
  const [logs, setLogs] = useState('');

  const loadLogs = async () => {
    const fileUri = FileSystem.documentDirectory + 'savedfiles/logs.txt';
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        setLogs('No logs found.');
        return;
      }
      const content = await FileSystem.readAsStringAsync(fileUri);
      setLogs(content || 'No logs available.');
    } catch (error) {
      console.error('Error reading logs:', error);
      setLogs('Failed to load logs.');
    }
  };

  const deleteLogs = async () => {
    const fileUri = FileSystem.documentDirectory + 'savedfiles/logs.txt';
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(fileUri);
        setLogs('');
        alert('All logs deleted.');
      } else {
        alert('No logs to delete.');
      }
    } catch (error) {
      console.error('Error deleting logs:', error);
      alert('Failed to delete logs.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MainScreen')}>
        <Icon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.welcomeText}>Welcome Kelsey</Text>

      <TouchableOpacity style={styles.button} onPress={loadLogs}>
        <Text style={styles.buttonText}>Saved logs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteLogs}>
        <Text style={styles.buttonText}>Delete all logs</Text>
      </TouchableOpacity>

      {logs !== '' && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.logsText}>{logs}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logsText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 75,
    left: 20,
  },
});

export default ProfileScreen;