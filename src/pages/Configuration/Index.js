import { useState, useContext, useEffect } from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { UserContext } from '../../contexts/user';
import { LoadingContext } from '../../contexts/loading';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';


export default function Configuration() {

    var { userInfo, signOut } = useContext(UserContext);
    var { loading } = useContext(LoadingContext);

    callSignOut = async () => {
        await signOut();
    }

    useEffect(() => {
        async function getConfiguration() {
            await api.get(`configuration/${userInfo.id}`)
                .then((response) => {
                    console.log(response.data);

                    setRegistrationNumber(response.data.charityRegistrationNumber.toString());
                    setMaskedRegistrationNumber(maskCNPJString(response.data.charityRegistrationNumber.toString()));

                    setPassword(response.data.password.toString());
                    setUserRegistrationNumber(maskCPFString(response.data.userRegistrationNumber.toString()));
                })
                .catch(error => {
                    // Manipule o erro aqui
                    console.log(error);
                });
        };

        getConfiguration();
    }, []);

    const [registrationNumber, setRegistrationNumber] = useState('');
    const [maskedRegistrationNumber, setMaskedRegistrationNumber] = useState('');

    const [userRegistrationNumber, setUserRegistrationNumber] = useState('');
    const [password, setPassword] = useState('');

    function handleSave() {
        if (registrationNumber.length < 14) {
            Toast.show({
                type: 'error',
                text1: 'Oops, preencha corretamente o CNPJ!',
                visibilityTime: 6000,
            });

            return;
        };

        Toast.show({
            type: 'success',
            text1: 'Configuração salva com sucesso!',
            visibilityTime: 6000,
        });

        console.log(registrationNumber)
    }

    // Function to mask a string with the pattern ##.###.###/####-##
    function maskCNPJString(input) {
        const numericOnly = input.replace(/\D/g, '');

        let maskedString = '';
        let index = 0;

        // Mask the digits based on the pattern
        for (let i = 0; i < numericOnly.length; i++) {
            if (index === 2 || index === 5) {
                maskedString += '.';
            } else if (index === 8) {
                maskedString += '/';
            } else if (index === 12) {
                maskedString += '-';
            }

            maskedString += numericOnly[i];
            index++;
        }

        console.log(maskedString);
        return maskedString;
    }


    function unmaskString(maskedString) {
        const unmaskedString = maskedString.replace(/\D/g, '');
        return unmaskedString;
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

        return maskedString;
    }


    function handleMask(value) {
        var text = unmaskString(value)
        setRegistrationNumber(text);
        setMaskedRegistrationNumber(maskCNPJString(text))
        console.log(text.length)
    }

    return (
        <>
            {loading && <LoadingModal />}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/configuration.png")}
                    style={styles.logo}
                />

                <Text style={styles.Title}>Configurações</Text>
            </View>

            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o CPF para Login na Fazenda"
                        value={userRegistrationNumber}
                        onChangeText={setUserRegistrationNumber}
                        keyboardType='numeric'
                        disabled={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a Senha para Login na Fazenda"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o CNPJ da Entidade"
                        value={maskedRegistrationNumber}
                        keyboardType='numeric'
                        onChangeText={handleMask}
                    />

                    <TouchableOpacity style={[styles.button, { opacity: registrationNumber.length == 14 ? 1 : 0.7 }]} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <Text style={styles.link}>
                Esqueceu sua senha?
            </Text> */}
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <TouchableOpacity onPress={callSignOut}>
                    <Text style={styles.cadastro}
                    >
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    Title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#515BBA",
        marginBottom: 24
    },
    imageContainer: {
        top: '10%',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 12,
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
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
        boxShadow: '7px 7px 14px #444c9c, -7px -7px 14px #5e6ad8',
        marginTop: 24
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
});
