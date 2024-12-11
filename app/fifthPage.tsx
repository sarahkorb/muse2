import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Checkbox } from 'expo-checkbox'; // Import from expo-checkbox

const spotifyclientid = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const spotifyclientsecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

console.log('Client id:', spotifyclientid);
console.log('Client secret:', spotifyclientsecret);

type FifthPageRouteProp = RouteProp<RootStackParamList, 'FifthPage'>;
type FifthPageNavigationProp = StackNavigationProp<RootStackParamList, 'FifthPage'>;

interface FifthPageProps {
  route: FifthPageRouteProp;
}

export default function FifthPage({ route }: FifthPageProps) {
  const { habit, selectedImages } = route.params; // Receive the habit from the route params
  const [songs, setSongs] = useState<any[]>([]); // Store song details (name, artist, id)
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]); // Store selected songs
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });
  const navigation = useNavigation<FifthPageNavigationProp>();
  
  const goToSixthPage = () => {
    navigation.navigate('SixthPage', {
      images: selectedImages, // Pass the images
      habit: habit,           // Pass the habit
      selectedSongs: selectedSongs, // Pass the selected songs
    });
  };
  
  const fetchSpotifySongs = async () => {
    try {
      // Step 1: Get Spotify access token
      const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${spotifyclientid}:${spotifyclientsecret}`)}`,
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Step 2: Search Spotify for playlists related to the habit (refined query: [habit] playlist)
      const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: `${habit} playlist`,  // Refined query: "[habit] playlist"
          type: 'playlist',
          limit: 5, // Fetch the first batch of results
        },
      });

      console.log('Search response:', searchResponse.data);

      // Check if the response contains valid playlists
      let playlists = searchResponse.data.playlists.items.filter(item => item !== null); // Remove null items
      if (playlists.length === 0) {
        // If no playlists, try fetching the next page of results
        const nextUrl = searchResponse.data.playlists.next;
        if (nextUrl) {
          const nextPageResponse = await axios.get(nextUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log('Next page response:', nextPageResponse.data);
          playlists = nextPageResponse.data.playlists.items.filter(item => item !== null); // Remove null items
        }
      }

      // If we found playlists, fetch tracks from the first playlist
      if (playlists.length > 0) {
        const playlistId = playlists[0]?.id;
        console.log('Found playlist ID:', playlistId);
        fetchTracksForPlaylist(playlistId, accessToken);
      } else {
        console.log('No playlists found.');
        setSongs([]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Unexpected error:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  const fetchTracksForPlaylist = async (playlistId: string, accessToken: string) => {
    try {
      // Step 3: Get tracks from the playlist
      const tracksResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Map over the tracks and extract both the song name and artist name
      const trackData = tracksResponse.data.items.map((item: any) => ({
        songName: item.track.name,
        artistName: item.track.artists.map((artist: any) => artist.name).join(', '), // In case there are multiple artists
        id: item.track.id, // Store track id for selection
      }));

      // Update state with the track data
      setSongs(trackData.slice(0, 4)); // Extract top 4 songs
    } catch (error) {
      console.error('Error fetching tracks for playlist:', error);
    }
  };

  useEffect(() => {
    if (habit) {
      fetchSpotifySongs(); // Fetch songs when habit is available
    }
  }, [habit]);

  if (!fontsLoaded) {
    return null; // Ensure fonts are loaded before rendering
  }

  const handleSongSelection = (songId: string) => {
    setSelectedSongs(prevSelected => {
      if (prevSelected.includes(songId)) {
        return prevSelected.filter(id => id !== songId); // Remove song from selection
      } else {
        return [...prevSelected, songId]; // Add song to selection
      }
    });
  };

  const handleSpotifyLink = () => {
    Linking.openURL('https://www.spotify.com'); // Open Spotify link
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>We found these songs for your habit:</Text>
      {songs.length > 0 ? (
        <View style={styles.songsContainer}>
          {songs.map((track, index) => (
            <View key={index} style={styles.songContainer}>
              <TouchableOpacity onPress={() => handleSongSelection(track.id)}>
                <Text style={styles.song}>
                  {track.songName} by {track.artistName}
                </Text>
                <Checkbox
                  value={selectedSongs.includes(track.id)}
                  onValueChange={() => handleSongSelection(track.id)} // Handle toggle
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No songs found</Text>
      )}
      <Text style={styles.text}>
        Connect your{' '}
        <Text style={styles.link} onPress={handleSpotifyLink}>
          Spotify
        </Text>{' '}
        account to listen to these songs.
      </Text>

      <TouchableOpacity style={styles.arrowButton} onPress={goToSixthPage}>
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
  songsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#1DB954',  // Spotify green color
    textDecorationLine: 'underline',
  },
  song: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 25,
    color: '#1DB954',  // Spotify green color
  },
  arrowText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
});
