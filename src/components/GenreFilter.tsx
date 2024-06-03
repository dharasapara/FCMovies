import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {genreType} from '../screens/HomeScreen';

interface GenreFilterProps {
  genres: genreType[];
  selectedGenre: genreType | undefined;
  onSelectGenre: (genre: genreType) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onSelectGenre,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreContainer}>
        {genres.map(genre => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreButton,
              selectedGenre?.id === genre.id && styles.selectedGenreButton,
            ]}
            onPress={() => onSelectGenre(genre)}>
            <Text style={styles.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#222222',
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#3B3B3B',
  },
  selectedGenreButton: {
    backgroundColor: '#FF0000',
  },
  genreText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default GenreFilter;
