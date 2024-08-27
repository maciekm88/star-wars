import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import { Formik } from 'formik';
import _ from 'lodash';

interface Movie {
  title: string;
  id: string;
  release_date: string;
}

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('https://swapi.dev/api/films/')
      .then((response) => {
        const results = response.data.results
          .map(
            (film: any): Movie => ({
              id: film.url.split('/').filter(Boolean).pop() || '', // using this instead of film.episode_id - because episode_id is not in chronological order
              title: film.title,
              release_date: film.release_date,
            }),
          )
          .sort(
            (a: Movie, b: Movie) =>
              new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
          ); // sorting movies chronologically
        // console.log('Fetched movies:', results);
        setMovies(results);
        setFilteredMovies(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching films:', error);
        setLoading(false);
      });
  }, []);

  const debouncedSearch = useCallback(
    _.debounce((searchTerm: string) => {
      if (!searchTerm) {
        setFilteredMovies(movies);
      } else {
        const filtered = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredMovies(filtered);
      }
    }, 300),
    [movies],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ searchTerm: '' }}
        onSubmit={(values) => {
          debouncedSearch(values.searchTerm);
        }}>
        {({ handleChange, values }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Search movies"
              placeholderTextColor="#ffe81f"
              onChangeText={(text) => {
                handleChange('searchTerm')(text);
                debouncedSearch(text);
              }}
              value={values.searchTerm}
            />
          </View>
        )}
      </Formik>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffff00" />
          <Text style={styles.loadingText}>May the Force be with you..</Text>
        </View>
      ) : filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MovieCard id={item.id} title={item.title} />}
        />
      ) : (
        <Text style={styles.noResults}>No movies found.</Text>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  loadingText: {
    fontSize: 24,
    color: '#ffe81f',
    marginVertical: 5,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#636363',
    color: '#DAA520',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noResults: {
    marginTop: 20,
    fontSize: 18,
    color: '#da2055',
    textAlign: 'center',
  },
});
