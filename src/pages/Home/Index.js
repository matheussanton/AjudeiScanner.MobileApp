import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { ListItem } from '../../components/ListItem';
import { CuponsContext } from '../../contexts/cupons';
import { api } from '../../services/api';

export default function Home() {

    var { initItems, setInitItems } = useContext(CuponsContext);
    useEffect(() => {
        async function getCoupons() {
            try {
                await api.get('coupons')
                    .then((response) => {
                        console.log(response.data);
                        setInitItems(response.data);
                    });

            } catch (error) {
                console.log(error);
            }
        };

        getCoupons();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={true}
                style={{ flex: 1, marginTop: 12 }}
                data={initItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <ListItem
                        data={item}
                    />}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '5%',
        paddingHorizontal: '4%'
    }
});
