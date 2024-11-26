import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';

export default function ThirdPage() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  const [habit, setHabit] = useState('');

  if (!fontsLoaded) {
    return null; // Ensure the font is loaded before rendering
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let's create your first habit</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your habit here..."
        placeholderTextColor="#aaa"
        value={habit}
        onChangeText={setHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe6', // Same background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: '#333',
    backgroundColor: '#fff',
  },
});
