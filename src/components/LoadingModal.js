import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = () => {
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalBackground}>
                <ActivityIndicator size="large" color="#343a78" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalBackground: {
        padding: 20,
        borderRadius: 10,
    },
});

export default LoadingModal;
