import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CuponsContext } from '../contexts/cupons';
import Toast from 'react-native-toast-message';
import { api } from '../services/api';
import { parseDateFormat } from '../utils/stringHelpers';

export const Scanner = ({ setModalVisible }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    var { contextItems, addCupom, getContextItems } = useContext(CuponsContext);

    const [items, setItems] = useState(contextItems);


    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    function scanAgain() {
        setItems(getContextItems());
        setScanned(false);
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        var array = data.split('|');
        console.log(data);
        let code = array[0].replace('CFe', '');
        let date = parseDateFormat(array[1]);
        let amount = array[2];

        var obj = {
            code,
            date,
            amount
        };

        console.log(obj);

        try {
            await api.post('coupons', obj
            )
                .then((response) => {
                    console.log(response.data);
                    addCupom(
                        response.data.id,
                        response.data.code,
                        response.data.date,
                        response.data.amount
                    );

                    Toast.show({
                        type: 'success',
                        text1: 'QRCode Escaneado!',
                        text2: code,
                        visibilityTime: 4000,
                    });
                });
        } catch (error) {
            let subMessage = 'Contate o suporte.';
            if (error.response) {
                subMessage = error.response.data;
            }

            Toast.show({
                type: 'error',
                text1: 'Oops, algo deu errado...',
                text2: subMessage,
                visibilityTime: 6000,
            });
            console.log(error);
        }

    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {/* <Button title={'LOG'} onPress={() => { console.log('------'); console.log(getContextItems()); console.log(getContextItems().length) }} /> */}
            {scanned && <Button title={'Ler novamente'} onPress={() => scanAgain()} />}
            <Button title={'Cancelar'} onPress={() => setModalVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
});
