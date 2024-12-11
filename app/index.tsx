import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Define the navigation type
type WelcomePageNavigationProp = StackNavigationProp<RootStackParamList, 'WelcomePage'>;

export default function WelcomePage() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Blinking Arrow Animation (opacity)
  const arrowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 0, // Fade out
          duration: 1000, // Duration for fading out
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: 1, // Fade in
          duration: 1000, // Duration for fading in
          useNativeDriver: true,
        }),
      ])
    ).start(); // Start the blinking loop
  }, [arrowAnim]);

  const navigation = useNavigation<WelcomePageNavigationProp>();

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (username && password) {
      // Mock login success
      alert('Login successful!');
      navigation.navigate('SecondPage');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Muse.</Text>

      <View style={styles.subContainer}>
        {/* New User Arrow */}
        <Text style={styles.subText}>New User</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SecondPage')}>
          <Animated.View style={[styles.arrowContainer, { opacity: arrowAnim }]}>
            <Text style={styles.arrow}>→</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Login Form */}
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5efe6',
  },
  text: {
    fontSize: 64,
    fontWeight: 'normal',
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    letterSpacing: 2,
    color: '#888',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  arrowContainer: {
    marginLeft: 10,
    padding: 10, // Space around the arrow
  },
  arrow: {
    fontSize: 40,
    color: '#888',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#f5efe6', 
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#d9d3c9', // Off-white border
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

