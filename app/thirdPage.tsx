import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from './types'; 

type ThirdPageNavigationProp = StackNavigationProp<RootStackParamList, 'ThirdPage'>;

export default function ThirdPage() {
  const [habit, setHabit] = useState(''); // State to store the user input

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const navigation = useNavigation<ThirdPageNavigationProp>();

  // Function to navigate to the fourth page, passing the habit
  const goToFourthPage = () => {
    console.log('Navigating to FourthPage with habit:', habit); // Debug log
    navigation.navigate('FourthPage', { habit });
  };

  // Function to handle what happens after the user submits their habit
  const handleSubmit = () => {
    console.log('Submitting habit:', habit); // Debug log
    if (habit.trim() === '') {
      return; // Prevent navigation if no habit is entered
    }
    goToFourthPage(); // Navigate to the fourth page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let's create your first habit</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your habit here..."
        placeholderTextColor="#999"
        value={habit} // Bind the input value to the state
        onChangeText={setHabit} // Update the state when the user types
      />
      <Button title="Create Habit" onPress={handleSubmit} color="#333" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5efe6',
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    fontSize: 18,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
    marginBottom: 20,
  },
});
