import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { ListItem } from '../../components/ListItem';
import LoadingModal from '../../components/LoadingModal';
import ConfirmModal from '../../components/ConfirmModal';
import { CuponsContext } from '../../contexts/cupons';
import { LoadingContext } from '../../contexts/loading';
import { api } from '../../services/api';
import Ionicons from '@expo/vector-icons/Ionicons';

import Toast from 'react-native-toast-message';

export default function Home() {

    var { contextItems, setContextItems, selectedItems } = useContext(CuponsContext);
    var { loading, setLoading } = useContext(LoadingContext);

    const [modalVisible, setModalVisible] = useState(false);

    const [itemToDelete, setItemToDelete] = useState('');

    useEffect(() => {
        getCoupons();
        console.log(modalVisible);
    }, []);

    async function getCoupons() {
        setLoading(true);
        try {
            await api.get('coupons')
                .then((response) => {
                    console.log(response.data);
                    setContextItems(response.data);
                });

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    async function handleProcess() {
        console.log(selectedItems);
        setLoading(true);
        await sleep(2000).then(() => { setLoading(false) });

        Toast.show({
            type: 'success',
            text1: 'Itens enviados!',
            text2: 'Seus cupons estão sendo processados!',
            visibilityTime: 4000,
        });
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    return (
        <>
            {loading && <LoadingModal />}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/logo1.png")}
                    style={styles.logo}
                />

                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Meus Itens</Text>
                    <TouchableOpacity onPress={getCoupons}>
                        <Ionicons name='ios-reload' size={23} color={'#5e6ad8'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>

                <ConfirmModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    itemToDelete={itemToDelete} />

                <FlatList
                    showsVerticalScrollIndicator={true}
                    style={{ flex: 1, marginTop: 12 }}
                    data={contextItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <ListItem
                            data={item}
                            setModalVisible={setModalVisible}
                            setItemToDelete={setItemToDelete}
                        />}
                />
            </View >
            <View style={styles.sendView}>
                <TouchableOpacity
                    style={[styles.button, { opacity: selectedItems.length > 0 ? 1 : 0.7 }]}
                    onPress={handleProcess}
                    disabled={!(selectedItems.length > 0)}>
                    <Text style={styles.buttonText}>{`Processar ${selectedItems.length > 0 ? `(${selectedItems.length})` : ''}`}</Text>
                </TouchableOpacity>
            </View >
        </>
    );

}

const styles = StyleSheet.create({
    headerContainer: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    imageContainer: {
        top: '5%',
        alignItems: 'center',
        marginBottom: '5%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#515BBA'
    },
    container: {
        flex: 1,
        paddingVertical: '5%',
        paddingHorizontal: '4%',
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
    sendView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%'

    }
});
