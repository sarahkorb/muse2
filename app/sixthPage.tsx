import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';  // Import the updated types
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type SixthPageRouteProp = RouteProp<RootStackParamList, 'SixthPage'>;

interface SixthPageProps {
    route: SixthPageRouteProp;
}

const screenWidth = Dimensions.get('window').width;

export default function SixthPage({ route }: SixthPageProps) {
    const { images, habit, selectedSongs } = route.params;

    // Streak counter state and weekly log state
    const [streak, setStreak] = useState<number>(0);
    const [habitLogged, setHabitLogged] = useState<boolean>(false);

    // Simulate a week's habit logs, where 1 means the habit is done, 0 means not done.
    const [weekLogs, setWeekLogs] = useState<number[]>(new Array(7).fill(0));  // Default to no habit logged for any day

    // Handle logging the habit
    const handleLogHabit = () => {
        if (!habitLogged) {
            const newStreak = streak + 1;
            setStreak(newStreak);

            // Update the weekLogs with the current day's streak
            const currentDay = new Date().getDay(); // Get the current day of the week (0-6)
            const updatedWeekLogs = [...weekLogs];
            updatedWeekLogs[currentDay] = 1;  // Mark the current day as habit done (1)
            setWeekLogs(updatedWeekLogs);

            setHabitLogged(true);
        }
    };

    // Reset streak at the start of a new week (example: every 7 days)
    const handleResetStreak = () => {
        setStreak(0);
        setHabitLogged(false);
        setWeekLogs(new Array(7).fill(0));  // Reset the logs for the new week
    };
    const chartConfig = {
        backgroundColor: '#f5efe6',
        backgroundGradientFrom: '#f5efe6',
        backgroundGradientTo: '#f5efe6',
        decimalPlaces: 1, // No decimal places
        color: (opacity = 1) => `rgba(27, 163, 112, ${opacity})`, // Green for bars
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black for labels
        style: {
            borderRadius: 10, // Slightly rounded edges for the chart container
        },
        barPercentage: 0.6, // Slightly narrower bars
        useShadowColorFromDataset: false, // Removes shadow effect
    };

    const chartData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                data: weekLogs,
                color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Cyan bars
                strokeWidth: 2, // Moderate bar thickness
            },
        ],
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>{habit}</Text>

                <View style={styles.contentContainer}>
                    {/* Left side for images */}
                    <View style={styles.imagesContainer}>
                        <Text style={styles.subtitle}>{habit} Inspo Images:</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: image }}
                                        style={styles.image}
                                    />
                                ))
                            ) : (
                                <Text style={styles.text}>Add some inspirational images!</Text>
                            )}
                        </ScrollView>
                    </View>

                    {/* Right side for songs */}
                    <View style={styles.songsContainer}>
                        <Text style={styles.subtitle}>{habit} Playlist:</Text>
                        <TouchableOpacity style={styles.playButton} onPress={() => console.log('Play button pressed')}>
                            <Ionicons name="play-circle" size={24} color="#1DB954" />
                        </TouchableOpacity>
                        <ScrollView>
                            {selectedSongs.length > 0 ? (
                                selectedSongs.map((song, index) => (
                                    <View key={index} style={styles.songContainer}>
                                        <Text style={styles.song}>
                                            {song.songName} by {song.artistName}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.text}>Curate a habit playlist!</Text>
                            )}
                        </ScrollView>
                    </View>
                </View>

                {/* Weekly Dashboard Section */}
                <View style={styles.dashboardContainer}>
                    <Text style={styles.dashboardTitle}>Your Weekly {habit} Dashboard</Text>
                    <View style={styles.streakContainer}>
                        <Text style={styles.streakText}>
                            Streak: {streak} {streak === 1 ? 'day' : 'days'}
                        </Text>
                        <TouchableOpacity
                            style={styles.logButton}
                            onPress={handleLogHabit}
                            disabled={habitLogged}
                        >
                            <Text style={styles.logButtonText}>
                                {habitLogged ? 'Habit Logged Today! :) ' : 'Log Habit for Today'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bar Chart */}
                    <View style={styles.chartContainer}>
                        <BarChart
                            data={chartData}
                            width={screenWidth - 40}
                            height={220}
                            chartConfig={chartConfig}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // Use steps of 1 for better readability
                            fromZero={true} // Start the Y-axis at 0
                            style={{
                                marginVertical: 10,
                                borderRadius: 10,
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleResetStreak}
                    >
                        <Text style={styles.resetButtonText}>Reset Streak</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5efe6',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    imagesContainer: {
        flex: 1,
        marginRight: 20,
        alignItems: 'center',
    },
    imagesContainerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    image: {
        width: 150,
        height: 150,
        marginRight: 10,
        borderRadius: 10,
    },
    songsContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: 20,
        shadowColor: '#000',
        borderRadius: 10,
    },
    songContainer: {
        marginBottom: 10,
        marginLeft: 20,
    },
    song: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    text: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    dashboardContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f5efe6',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    dashboardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    streakContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    streakText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    logButton: {
        backgroundColor: '#87bd84',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    logButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    chartContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    chart: {
        marginVertical: 10,
        borderRadius: 16,
    },
    resetButton: {
        backgroundColor: '#e66963',
        padding: 10,
        borderRadius: 5,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    playButton: {
        marginLeft: 10,
    }

});
