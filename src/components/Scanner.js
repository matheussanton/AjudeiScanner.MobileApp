import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CuponsContext } from '../contexts/cupons';

export const Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const { initItems, addCupom } = useContext(CuponsContext);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        var array = data.split('|');
        console.log(data);
        let code = array[0];
        let date = array[1];
        let amount = array[2];
        let registrationNumber = array[3];

        let nextId = Math.max(...initItems.map((item) => Number(item.id))) + 1 ?? 1;
        console.log(nextId);

        addCupom(nextId,
            code,
            date,
            amount,
            registrationNumber
        );

        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        //Mostrar um alert
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
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
});
