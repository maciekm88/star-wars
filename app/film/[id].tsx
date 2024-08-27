import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MovieDetail() {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const starWarsQuotes = [
    'May the Force be with you.',
    'I am your father.',
    'The Force will be with you, always.',
    'I`ve got a bad feeling about this.',
    'It`s a trap!',
    'Do or do not, there is no try.',
    'In my experience, there is no such thing as luck.',
    'I find your lack of faith disturbing.',
    'The Force is strong with this one.',
    'Help me, Obi-Wan Kenobi, you`re my only hope.',
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * starWarsQuotes.length);
    return starWarsQuotes[randomIndex];
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://swapi.dev/api/films/${id}/`)
        .then((response) => {
          // console.log('Fetched film details:', response.data);
          setMovie(response.data);
          navigation.setOptions({ headerTitle: response.data.title });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching film details:', error);
          setLoading(false);
        });
    }
  }, [id, navigation]);

  if (!movie)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffff00" />
        <Text style={styles.loadingText}>{getRandomQuote()}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.director}>Directed by {movie.director}</Text>
      <Text style={styles.date}>Release date: {movie.release_date}</Text>
      <Text style={styles.crawl}>{movie.opening_crawl}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffe81f',
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    color: '#ffe81f',
    marginBottom: 4,
  },
  director: {
    fontSize: 18,
    color: '#ffe88f',
  },
  date: {
    fontSize: 12,
    color: '#ffebbf',
    marginBottom: 20,
  },
  crawl: {
    fontSize: 16,
    color: '#fff',
  },
});
