import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function SixthPage({ route }) {
    // Extract images, habit, and songs from route params
    const { images, habit, selectedSongs } = route.params;

    const streakCount = 5; // Example streak count
    
    // Mock data for song images (in a real scenario, you might pass image URLs with the songs)
    const songImages = {
        'Song 1': 'https://example.com/song1.jpg',
        'Song 2': 'https://example.com/song2.jpg',
        'Song 3': 'https://example.com/song3.jpg',
        'Song 4': 'https://example.com/song4.jpg',
    };

    // State for the current image index for moodboard
    const [currentIndex, setCurrentIndex] = useState(0);

    // Change image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3000ms = 3 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <View style={styles.container}>
            {/* Habit Title */}
            <Text style={styles.title}>{habit}</Text>

            <View style={styles.mainContent}>
                {/* Moodboard with Rotating Images */}
                <View style={styles.moodboard}>
                    <Image
                        source={{ uri: images[currentIndex] }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Playlist Scrollable on the Right */}
                <ScrollView
                    contentContainerStyle={styles.playlist}
                    showsVerticalScrollIndicator={false}
                >
                    {selectedSongs.map((songName, index) => (
                        <View key={index} style={styles.track}>
                            {/* Display image for the song */}
                            <Image
                                source={{ uri: songImages[songName] }}
                                style={styles.songImage}
                                resizeMode="contain"
                            />
                            <View style={styles.songDetails}>
                                <Text style={styles.songName}>{songName}</Text>
                                <Text style={styles.artistName}>{`Artist ${index + 1}`}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Streak Counter at the Bottom */}
            <View style={styles.streakContainer}>
                <Text style={styles.streakText}>Streak: {streakCount} days</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5efe6',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    moodboard: {
        flex: 1, // Allow the container to grow
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Take full width of the screen
        aspectRatio: 1.5, // Adjust this based on your image's natural aspect ratio (e.g., 1.5 for 3:2)
        marginBottom: 20, // Optional spacing
    },
    image: {
        width: '100%', // Image will scale to fit the container
        height: '100%', // Preserve height relative to container
        borderRadius: 10, // Optional for rounded corners
        resizeMode: 'contain', // Ensures the full image is visible
    },
    playlist: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '45%',
    },
    track: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    songDetails: {
        flexDirection: 'column',
    },
    songName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    artistName: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#888',
    },
    streakContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    streakText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
