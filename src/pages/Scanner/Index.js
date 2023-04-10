import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';

import { Scanner as ScannerComponent } from '../../components/Scanner';

export default function Scanner() {

    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <ScannerComponent />
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>

            <StatusBar style="auto" />
            <Button title="Escanear" onPress={() => setModalVisible(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        justifyContent: 'space-around'
    }
});
