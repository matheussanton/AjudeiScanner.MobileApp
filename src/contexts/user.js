import React, { useState, createContext, useContext } from 'react';
import Toast from 'react-native-toast-message';
import { LoadingContext } from './loading';

export const UserContext = createContext();

function UserProvider({ children }) {

    const { setLoading } = useContext(LoadingContext);

    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async function signIn({ cpf, password }) {
        setLoading(true);
        await sleep(1000).then(() => { setLoading(false) });
        console.log(cpf, password);
        if (cpf != '51604636823' || password != '123') {
            Toast.show({
                type: 'error',
                text1: 'Usuário não encontrado!',
                text2: 'Tente novamente',
                visibilityTime: 4000,
            });
            return;
        }

        setUserInfo({
            name: 'Usuario Demo',
            email: 'demouser@email.com',
            cpf: '51604636823',
            id: '180af53b-93bf-45d9-82c8-3ed03e509695'
        });

        setIsAuthenticated(true);
    }

    async function signOut() {
        setLoading(true);
        await sleep(1000).then(() => { setLoading(false) });
        setUserInfo({
            name: '',
            email: '',
            cpf: '',
            id: ''
        });
        setUserInfo({});
        setIsAuthenticated(false);
    }


    return (
        <UserContext.Provider value={{ userInfo, signIn, isAuthenticated, signOut }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
