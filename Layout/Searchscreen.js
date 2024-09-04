import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = () => {
        axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
            .then(response => setMovies(response.data))
            .catch(error => console.error(error));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <View style={styles.movieContainer}>
                <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.show.name}</Text>
                    <Text numberOfLines={3} style={styles.summary}>{item.show.summary.replace(/<[^>]*>?/gm, '')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for a movie..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={searchMovies}
            />
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.show.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    movieContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    thumbnail: {
        width: 100,
        height: 150,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    summary: {
        color: '#ccc',
        fontSize: 14,
    },
});

export default SearchScreen;
