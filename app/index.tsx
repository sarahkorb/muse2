import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Import the navigation types

// Define the navigation type
type WelcomePageNavigationProp = StackNavigationProp<RootStackParamList, 'WelcomePage'>;

export default function WelcomePage() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Muse.</Text>
      <Text style={styles.subText}>
        Become your own Muse
        <TouchableOpacity onPress={() => navigation.navigate('SecondPage')}>
          <Animated.View
            style={[styles.arrowContainer, { opacity: arrowAnim }]}>
            <Text style={styles.arrow}>→</Text>
          </Animated.View>
        </TouchableOpacity>
      </Text>
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
  subText: {
    fontSize: 16,
    letterSpacing: 2,
    color: '#888',
    fontFamily: 'PlayfairDisplay_400Regular',
    flexDirection: 'row',
    alignItems: 'center',
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
});
