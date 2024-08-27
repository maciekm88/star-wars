import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface MovieCardProps {
  id: string;
  title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title }) => {
  const router = useRouter();

  const handlePress = () => {
    // console.log('Navigating to film with ID:', id);
    router.push(`/film/${id}`);
  };

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#2a5a97',
    borderRadius: 5,
    borderColor: '#ffe81f',
    borderWidth: 1,
  },
  title: {
    color: '#ffe81f',
    fontSize: 18,
  },
});

export default MovieCard;
