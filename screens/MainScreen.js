import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Pressable, Dimensions, Platform, Alert, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Voice from '@react-native-voice/voice';
import * as FileSystem from 'expo-file-system';

const { height: screenHeight } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleExport = async () => {
    try {
      if (!text.trim()) {
        Alert.alert('Nothing to export', 'Please enter or dictate some text first.');
        return;
      }
  
      await Share.share({
        message: text,
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while exporting.');
      console.error('Share error:', error);
    }
  };

  const handleSave = async () => {
    const dirUri = FileSystem.documentDirectory + 'savedfiles';
    const fileUri = dirUri + '/logs.txt';
  
    try {
      const dirInfo = await FileSystem.getInfoAsync(dirUri);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      }
  
      const timestamp = new Date().toISOString();
      const entry = `\n[${timestamp}]\n${text}\n`;
  
      // Read existing contents
      let existing = '';
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        existing = await FileSystem.readAsStringAsync(fileUri);
      }
  
      // Append and write the full content back
      const newContent = existing + entry;
      await FileSystem.writeAsStringAsync(fileUri, newContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
  
      Alert.alert('Saved', 'Log saved successfully.');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save the log.');
    }
  };

  // Voice setup
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    const spokenText = event.value[0];
    setText(spokenText);
  };

  const onSpeechError = (error) => {
    console.error('Speech error:', error);
    Alert.alert('Error', 'Something went wrong with speech recognition.');
    setIsRecording(false);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-GB'); // or 'en-US'
      setIsRecording(true);
    } catch (error) {
      console.error('Start error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Stop error:', error);
    }
  };

  const handleRecordPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleDelete = () => setText('');

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Icon name="save" size={30} color="#000" />
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleExport}>
          <Icon name="share" size={30} color="#000" />
          <Text style={styles.headerButtonText}>Export</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="user" size={30} color="#000" />
          <Text style={styles.headerButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      
      <TextInput
        style={styles.textBox}
        placeholder="Type something or use the microphone..."
        placeholderTextColor="#666"
        value={text}
        onChangeText={setText}
        multiline
      />

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Icon name="trash-2" size={30} color="#000" />
          <Text style={styles.footerButtonText}>Clear</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.button} onPress={handleRecordPress}>
          <Icon name="mic" size={30} color={isRecording ? 'red' : '#000'} />
          <Text style={styles.footerButtonText}>{isRecording ? 'Stop' : 'Record'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon name="volume-2" size={30} color="#000" />
          <Text style={styles.footerButtonText}>Speak</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textBox: {
    width: '95%',
    height: screenHeight * 0.7,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  footerContainer: {
    width: '100%',
    height: screenHeight * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 14,
    marginTop: 5,
    color: '#000',
  },
  headerContainer: {
    width: '100%',
    height: screenHeight * 0.125, // thinner than footer
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerButtonText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
  },
});

export default MainScreen;