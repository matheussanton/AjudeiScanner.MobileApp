import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import { UserContext } from '../../contexts/user'
import { LoadingContext } from '../../contexts/loading';
import LoadingModal from '../../components/LoadingModal';

export default function SignIn() {

    var { loading } = useContext(LoadingContext);

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(UserContext);

    async function handleLogin() {
        if (cpf == '' || password == '') return;

        let unMaskedCPF = unmaskString(cpf);
        console.log('unMaskedCPF', unMaskedCPF);
        await signIn({ cpf: unMaskedCPF, password });
    }


    function maskCPFString(cpf) {
        const numericOnly = cpf.replace(/\D/g, '');

        let maskedString = '';
        let index = 0;

        //516.230.000-00
        // Mask the digits based on the pattern
        for (let i = 0; i < numericOnly.length; i++) {
            if (index === 3 || index === 6) {
                maskedString += '.';
            } else if (index === 9) {
                maskedString += '-';
            }

            maskedString += numericOnly[i];
            index++;
        }

        setCpf(maskedString);
    }

    function unmaskString(maskedString) {
        const unmaskedString = maskedString.replace(/\D/g, '');
        return unmaskedString;
    }

    return (
        <>
            {loading && <LoadingModal />}
            <View style={styles.container}>
                <Image
                    source={require("../../assets/logo2.png")}
                    style={styles.logo}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu CPF"
                        keyboardType='numeric'
                        value={cpf}
                        onChangeText={maskCPFString}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        {/* {loadingAuth ? (
                        <ActivityIndicator size={25} color="#000" />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )
                    } */}
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>

                    <Text style={styles.link}>
                        Esqueceu sua senha?
                    </Text>

                </View>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={styles.cadastro}>
                    Ainda não tem uma conta? Crie aqui
                </Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginBottom: 18,
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 34,
        paddingHorizontal: 14
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: "#EAEAEA",
        marginBottom: 12,
        borderRadius: 2,
        paddingHorizontal: 8,
        color: "#000"
    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: "#515BBA",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: '7px 7px 14px #444c9c, -7px -7px 14px #5e6ad8'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFF"
    },
    link: {
        marginTop: 12,
        color: "#515BBA",
    },
    cadastro: {
        bottom: 16,
        color: "#515BBA"
    }
})
