import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/Feather';
import { db } from '../firebaseConfig';
import { collection, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ProfileScreen = ({ route, navigation }) => {
  const { username } = route.params || { username: 'Guest' };
  const [logs, setLogs] = useState('');

  const loadLogs = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      alert('You must be logged in to load logs.');
      return;
    }

    try {
      const q = query(
        collection(db, 'transcriptions'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setLogs('No logs found.');
        return;
      }

      const allLogs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return `[${data.createdAt.toDate().toLocaleString()}]\n${data.text}`;
      }).join('\n\n');

      setLogs(allLogs);
    } catch (error) {
      console.error('Error loading logs from Firebase:', error);
      setLogs('Failed to load logs.');
    }
  };

  const deleteLogs = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      alert('You must be logged in to delete logs.');
      return;
    }

    try {
      const q = query(
        collection(db, 'transcriptions'),
        where('uid', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setLogs('');
      alert('All logs deleted from Firebase.');
    } catch (error) {
      console.error('Error deleting logs from Firebase:', error);
      alert('Failed to delete logs.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.welcomeText}>Welcome {username}</Text>

      <TouchableOpacity style={styles.button} onPress={loadLogs}>
        <Text style={styles.buttonText}>Saved logs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteLogs}>
        <Text style={styles.buttonText}>Delete all saved logs</Text>
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