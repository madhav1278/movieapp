import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Detailsscreen = ({ route }) => {
    const { movie } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: movie.image?.original }} style={styles.image} />
            <Text style={styles.title}>{movie.name}</Text>
            <Text style={styles.details}>{movie.summary.replace(/<[^>]*>?/gm, '')}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 10,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        color: '#ccc',
        fontSize: 16,
    },
});

export default Detailsscreen;
