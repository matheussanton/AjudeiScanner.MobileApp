import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useContext } from 'react'
import Checkbox from 'expo-checkbox';
import { CuponsContext } from '../contexts/cupons';
import { stringLastFour } from '../utils/stringHelpers';

export const ListItem = ({ data }) => {

    const { removeCupom } = useContext(CuponsContext);
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.item}>{stringLastFour(data.code)}</Text>
            <Text style={styles.item}>{`R$ ${data.amount}`}</Text>
            <TouchableOpacity onPress={() => removeCupom(data.id)}>
                <Ionicons name='ios-trash' size={23} color='#FF3F4b' />
            </TouchableOpacity>
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
