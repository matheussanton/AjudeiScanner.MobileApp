import React, { useContext } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { CuponsContext } from '../contexts/cupons';

const ConfirmModal = ({
    modalVisible,
    setModalVisible,
    itemToDelete
}) => {

    const { removeCupom } = useContext(CuponsContext);

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
        // onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modal}>

                <View style={styles.modalContent}>
                    <View style={styles.modalContentTop}>
                        <Text style={styles.buttonText}>Deseja mesmo exluir este item?</Text>
                    </View>
                    <View style={styles.modalContentBot}>
                        <TouchableOpacity
                            onPress={() => { removeCupom(itemToDelete); setModalVisible(false) }}>
                            <Text style={styles.btnYes}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.btnCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <Toast />
        </Modal >
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        height: 150,
        width: 280,
        backgroundColor: '#f2f2f2',
        display: 'flex',


        flexDirection: 'column',
        borderRadius: 4,
    },
    modalContentTop: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%',
    },
    modalContentBot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: '25%',
        borderTopWidth: 1,
        borderTopColor: '#515BBA'
    },
    btnCancel: {
        color: '#515BBA',
    }
});

export default ConfirmModal;
