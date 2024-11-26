import React, { useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display'; 
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from './types'; 

// Define the navigation type
type SecondPageNavigationProp = StackNavigationProp<RootStackParamList, 'SecondPage'>;

export default function SecondPage() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  const [opacity, setOpacity] = useState([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false); // State to track when to show the button

  // Texts to show
  const texts = [
    'Muse believes we are what we do',
    'Habits are built through holistic change',
    'and Muse is here to guide you',
    'Are you ready to take the first step?'
  ];

  const navigation = useNavigation<SecondPageNavigationProp>();

  // Function to navigate to the third page
  const goToThirdPage = () => {
    navigation.navigate('ThirdPage');
  };

  useEffect(() => {
    if (!fontsLoaded) return;

    // Function to start fading in texts one by one
    const fadeInText = () => {
      // Fade in the current sentence
      Animated.timing(opacity[currentIndex], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Update the currentIndex to show the next sentence
      setCurrentIndex((prevIndex) => {
        if (prevIndex === texts.length - 1) {
          setShowButton(true); // Once we are at the last sentence, show the button
          return prevIndex; 
        }
        return prevIndex + 1;
      });
    };

    // Start fading in texts every 3 seconds
    const interval = setInterval(fadeInText, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [fontsLoaded, opacity, currentIndex]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        {texts.map((text, index) => (
          <Animated.Text key={index} style={[styles.text, { opacity: opacity[index] }]}>
            {text}
          </Animated.Text>
        ))}

        {/* Add the "Yes" button beneath the last sentence */}
        {showButton && (
          <TouchableOpacity style={styles.arrowButton} onPress={goToThirdPage}>
            <Animated.View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
              <Text style={styles.arrowText}>Yes</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe6', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textWrapper: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  arrowButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5efe6',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    padding: 10,
  },
  arrow: {
    fontSize: 40,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  arrowText: {
    fontSize: 24, // Adjust font size for the text label
    color: '#333', // White color for contrast
    fontFamily: 'PlayfairDisplay_400Regular',
  },
});
