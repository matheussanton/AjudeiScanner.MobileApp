import React, { useState, useContext, createContext } from 'react';
import { LoadingContext } from './loading';


export const CuponsContext = createContext();


function CuponsProvider({ children }) {

    var { setLoading } = useContext(LoadingContext);

    const [contextItems, setContextItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    function addCupom(id,
        code,
        date,
        amount,
        registrationNumber) {
        setContextItems([...contextItems, {
            id,
            code,
            date,
            amount,
            registrationNumber
        }]);
    }

    function getContextItems() {
        return contextItems;
    }

    async function removeCupom(id) {
        setLoading(true);
        await sleep(500).then(() => { setLoading(false) });
        setContextItems(contextItems.filter((item) => item.id !== id));
    }

    function addSelectedItem(id) {
        setSelectedItems([...selectedItems, id]);
    }

    function removeSelectedItem(id) {
        setSelectedItems(selectedItems.filter((item) => item !== id));
    }


    return (
        <CuponsContext.Provider value={{
            contextItems,
            addCupom,
            removeCupom,
            setContextItems,
            getContextItems,
            selectedItems,
            addSelectedItem,
            removeSelectedItem
        }}>
            {children}
        </CuponsContext.Provider>
    );
}

export default CuponsProvider;
