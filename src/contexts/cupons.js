import React, { useState, createContext } from 'react';

export const CuponsContext = createContext();

var devItems = [
    // {
    //     id: '1',
    //     name: "Item 1",
    // },
    // {
    //     id: '2',
    //     name: "Item 2",
    // },
    // {
    //     id: '3',
    //     name: "Item 3",
    // },
    // {
    //     id: '4',
    //     name: "Item 4",
    // }
];

function CuponsProvider({ children }) {

    const [initItems, setInitItems] = useState([]);

    function addCupom(id,
        code,
        date,
        amount,
        registrationNumber) {
        setInitItems([...initItems, {
            id,
            code,
            date,
            amount,
            registrationNumber
        }]);
        // devItems.push({
        //     id: id,
        //     name: name,
        // });
    }

    function removeCupom(id) {
        setInitItems(initItems.filter((item) => item.id !== id));
    }


    return (
        <CuponsContext.Provider value={{ initItems, addCupom, removeCupom, setInitItems }}>
            {children}
        </CuponsContext.Provider>
    );
}

export default CuponsProvider;
