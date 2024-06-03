import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface MovieCardProps {
  title: string;
  image: string;
  rating: number;
  year: string;
}

const MovieCard: React.FC<MovieCardProps> = ({title, image, rating, year}) => {
  return (
    <View style={styles.container}>
      {year ? <Text style={styles.year}>{year.substring(0, 4)}</Text> : null}
      <View style={styles.cardContainer}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/original/${image}`}}
          style={styles.image}
        />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.rating}>{`${rating.toFixed(1)} \u2605`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '1%',
    width: '48%',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  year: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  cardContainer: {
    padding: 8,
    backgroundColor: '#222222',
    borderRadius: 4,
    elevation: 3,
    height: 305,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    color: '#FFFFFF',
  },
  rating: {
    fontSize: 12,
    marginTop: 4,
    color: '#FFFFFF',
  },
});

export default MovieCard;
