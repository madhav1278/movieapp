import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Screen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://api.tvmaze.com/search/shows?q=all')
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Failed to load movies.');
                setLoading(false);
            });
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <View style={styles.movieContainer}>
                <Image 
                    source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/100x150.png?text=No+Image' }} 
                    style={styles.thumbnail} 
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.show.name}</Text>
                    <Text numberOfLines={3} style={styles.summary}>
                        {item.show.summary ? item.show.summary.replace(/<[^>]*>?/gm, '') : 'No summary available.'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for a movie..."
                onFocus={() => navigation.navigate('Search')}
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
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
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default Screen;
