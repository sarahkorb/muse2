import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import axios from 'axios';
import { GOOGLE_API_KEY, GOOGLE_CX } from 'react-native-dotenv';

type FourthPageRouteProp = RouteProp<RootStackParamList, 'FourthPage'>;

interface FourthPageProps {
  route: FourthPageRouteProp;
}

export default function FourthPage({ route }: FourthPageProps) {
  const { habit } = route.params;  // Receive the habit from the route params
  const [images, setImages] = useState<string[]>([]);  // Store image URLs here
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  const fetchImages = async () => {
    if (!habit) return; // Return early if habit is not available

    const searchTerm = `${habit} inspiration`;  // Combine habit with "inspiration"
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&searchType=image&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}`
      );
      const imageUrls = response.data.items.map((item: any) => item.link);  // Extract image links
      setImages(imageUrls.slice(0, 4));  // Get the top 4 images
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Run effect only once when component mounts or when habit changes
  useEffect(() => {
    fetchImages();
  }, [habit]);

  if (!fontsLoaded) {
    return null; // Ensure fonts are loaded before rendering
  }

  const handleImageSelect = (imageUrl: string) => {
    console.log('Selected Image:', imageUrl);  // Log the selected image URL
  };

  const handlePinterestLink = () => {
    Linking.openURL('https://www.pinterest.com');  // Open Pinterest link
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>We found these images for your inspiration:</Text>
      {images.length > 0 ? (
        <View style={styles.imagesContainer}>
          {images.map((imageUrl, index) => (
            <TouchableOpacity key={index} onPress={() => handleImageSelect(imageUrl)}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No images found</Text>
      )}
      <Text style={styles.text}>
        Do you want to integrate your{' '}
        <Text style={styles.link} onPress={handlePinterestLink}>
          Pinterest
        </Text>{' '}
        account?
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
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_400Regular',
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  link: {
    color: '#E60023',  // Pinterest red color
    textDecorationLine: 'underline',
  },
  image: {
    width: 170,
    height: 170,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',  // Added a white border around images
  },
});
