import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';

export interface genreType {
  id: number;
  name: string;
}

const HomeScreen: React.FC = () => {
  const allGenre: genreType = {
    id: -1,
    name: 'All',
  };

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<genreType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<genreType>(allGenre);
  const [year, setYear] = useState<number>(2012);
  const [fetching, setFetching] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchGenres();
    fetchMovies(selectedGenre, year, true);
  }, []);

  const getGenresUrl = () => {
    return 'https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d';
  };

  const getMoviesURL = (genre: genreType = allGenre, year: number) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&page=1&vote_count.gte=100`;
    url += `&primary_release_year=${year}`;

    if (genre.id !== allGenre.id) {
      url += `&with_genres=${genre.id}`;
    }

    return url;
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(getGenresUrl());
      setGenres([allGenre, ...response.data.genres]);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMovies = async (
    genre: genreType,
    year: number,
    forceRefresh: boolean = false,
  ) => {
    if (fetching) return;
    try {
      setFetching(true);
      const response = await axios.get(getMoviesURL(genre, year));
      const newList = response.data.results.slice(0, 20);

      newList[0] = {
        year: newList[0].release_date,
        ...newList[0],
      };

      if (forceRefresh) {
        setMovies([]);
        setMovies(newList);
      } else {
        setMovies(oldList => [...oldList, ...newList]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setFetching(false);
      setLoading(false);
    }
  };

  const handleGenreSelect = async (genre: genreType) => {
    try {
      setLoading(true);
      fetchMovies(genre, 2012, true);
      setSelectedGenre(genre);
      setYear(2012);
    } catch (error) {
      console.error('Error fetching genre selection:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMovieItem = ({item}: {item: any}) => (
    <MovieCard
      title={item.title}
      image={item.poster_path}
      rating={item.vote_average}
      year={item.year}
    />
  );

  const handleEndReached = async () => {
    if (!fetching) {
      fetchMovies(selectedGenre, year + 1, false);
      setYear(year + 1);
    }
  };

  return (
    <View>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={handleGenreSelect}
      />
      {loading ? (
        <ActivityIndicator />
      ) : movies.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={movies}
          numColumns={2}
          contentContainerStyle={styles.movieList}
          renderItem={renderMovieItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          style={styles.flatList}
        />
      ) : (
        <Text>No movies found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#000000',
  },
  movieList: {
    justifyContent: 'space-between',
    padding: '1%',
    paddingBottom: 150,
  },
});

export default HomeScreen;
