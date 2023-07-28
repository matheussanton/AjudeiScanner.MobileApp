import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, Image, TouchableOpacity } from 'react-native';

import { Scanner as ScannerComponent } from '../../components/Scanner';
import Toast from 'react-native-toast-message';

export default function Scanner() {

    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <>
            <View style={styles.helperContainer}>
                <Text style={styles.helperTitle}>Passos</Text>
                <Text style={styles.helperText}>1. Clique em Escanear.</Text>
                <Text style={styles.helperText}>2. Aponte o celular para o QRCode da nota.</Text>
                <Text style={styles.helperText}>3. Clique em ler novamente.</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/qrcodeinstrucao3.png")}
                    style={styles.logo}
                />
            </View>
            <View style={styles.container}>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <ScannerComponent setModalVisible={setModalVisible} />
                    </View>
                    <Toast />
                </Modal>

                <StatusBar style="light" />
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Escanear</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    helperText: {
        fontSize: 16,
        marginBottom: 4
    },
    helperTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#515BBA",
        marginBottom: 24
    },
    helperContainer: {
        top: '10%',
        alignItems: 'center',
    },
    imageContainer: {
        top: '15%',
        alignItems: 'center',
    },
    logo: {
        marginBottom: 36,
        width: 300,
        height: 300,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        justifyContent: 'space-around'
    },
    button: {
        width: '50%',
        height: 40,
        backgroundColor: "#515BBA",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: '7px 7px 14px #444c9c, -7px -7px 14px #5e6ad8',
        marginTop: 24
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFF"
    },
});
