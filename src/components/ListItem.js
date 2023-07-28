import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useContext, useEffect } from 'react'
import Checkbox from 'expo-checkbox';
import { CuponsContext } from '../contexts/cupons';
import { stringLastFour } from '../utils/stringHelpers';
import { getColorByStatus } from '../utils/colorHelper';

export const ListItem = ({ data, setModalVisible, setItemToDelete }) => {

    const { addSelectedItem, removeSelectedItem } = useContext(CuponsContext);
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if (isChecked) {
            addSelectedItem(data.id);
        } else {
            removeSelectedItem(data.id);
        }
    }, [isChecked]);

    function handleDelete(id) {
        setItemToDelete(id)
        setModalVisible(true);
    }

    var statusColor = getColorByStatus(data.status)
    const blockedSatus = [1, 2].includes(data.status);

    return (
        <View style={styles.container}>
            {data.status > 0 &&
                <View style={{
                    width: 4, height: '200%', backgroundColor: statusColor, position: 'absolute',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                }}></View>}
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#515BBA' : undefined}
                disabled={blockedSatus}
            />
            <Text style={styles.item}>{stringLastFour(data.code)}</Text>
            <Text style={styles.item}>{`R$ ${data.amount}`}</Text>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {data.status == 3 &&
                    <TouchableOpacity onPress={() => setModalVisible(true)} visible={false}
                        style={{ paddingRight: 10 }}>
                        <Ionicons name='ios-eye' size={23} color={'#515BBA'} />
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={() => handleDelete(data.id)} disabled={blockedSatus}>
                    <Ionicons name='ios-trash' size={23} color={blockedSatus ? '#cdd1fa' : '#515BBA'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: "#EAEAEA",
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 4
    },
    item: {
        fontWeight: 'bold',
        fontSize: 16
    }
});
