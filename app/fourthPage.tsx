import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Image, TouchableOpacity, Linking, Button } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import * as ImagePicker from 'expo-image-picker'; 

const googleapikey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const googlecx = process.env.EXPO_PUBLIC_GOOGLE_CX;

type FourthPageRouteProp = RouteProp<RootStackParamList, 'FourthPage'>;
type FourthPageNavigationProp = StackNavigationProp<RootStackParamList, 'FourthPage'>;

interface FourthPageProps {
  route: FourthPageRouteProp;
}

export default function FourthPage({ route }: FourthPageProps) {
  const { habit } = route.params; // Receive the habit from route params
  const [images, setImages] = useState<string[]>([]); // Store fetched image URLs
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Track selected images
  const [fontsLoaded] = useFonts({ PlayfairDisplay_400Regular });
  const navigation = useNavigation<FourthPageNavigationProp>();

  const fetchImages = async () => {
    if (!habit) return;

    const searchTerm = `${habit} inspiration`; // Combine habit with "inspiration"
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&searchType=image&cx=${googlecx}&key=${googleapikey}`
      );
      const imageUrls = response.data.items.map((item: any) => item.link); // Extract image links
      setImages(imageUrls.slice(0, 4)); // Get the top 4 images
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [habit]);

  if (!fontsLoaded) {
    return null;
  }

  // Handle selection and deselection of images
  const toggleImageSelection = (imageUrl: string) => {
    setSelectedImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl) // Deselect if already selected
        : [...prev, imageUrl] // Select if not selected
    );
  };

  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets[0].uri) {
      setSelectedImages((prev) => [...prev, pickerResult.assets[0].uri]); // Add uploaded image to selected images
    }
  };

  const goToFifthPage = () => {
    navigation.navigate('FifthPage', { selectedImages, habit }); // Pass selected images and habit
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>We found these images for your inspiration:</Text>
      {images.length > 0 ? (
        <View style={styles.imagesContainer}>
          {images.map((imageUrl, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleImageSelection(imageUrl)}
            >
              <Image
                source={{ uri: imageUrl }}
                style={[
                  styles.image,
                  selectedImages.includes(imageUrl) && styles.selectedImage, // Apply selected style
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No images found</Text>
      )}
      <Text style={styles.text}>
        Link your{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.pinterest.com')}>
          Pinterest
        </Text>{' '}
        account to integrate your own images and moodboards.
      </Text>
      <Button title="Upload Image" onPress={handleUpload} />

      {selectedImages.length > 0 ? (
        <Text style={styles.text}>You selected {selectedImages.length} images</Text>
      ) : (
        <Text style={styles.text}>No images selected</Text>
      )}

      <TouchableOpacity style={styles.arrowButton} onPress={goToFifthPage}>
        <Animated.View style={styles.arrowContainer}>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.arrowText}>Next</Text>
        </Animated.View>
      </TouchableOpacity>
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
    color: '#E60023',
    textDecorationLine: 'underline',
  },
  image: {
    width: 170,
    height: 170,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedImage: {
    borderColor: '#FFD700', // Gold color for selected images
    borderWidth: 4,
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
    fontSize: 24,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
});
