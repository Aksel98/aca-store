import React, { useEffect, useState } from 'react';
import Product from './Product';
import uniqid from 'uniqid';
import { db } from '../services/Firebase';

export default function ProductList(props) {

    const [dbtest, setDBtest] = useState([]);

    useEffect(() => {
        getAllProductInfo();
    }, []);
    async function getAllProductInfo() {
        try {
            const tempArr = [];
            const getModelInfoRef = (await db.collection('product').get()).docs;
            getModelInfoRef.forEach(doc => {
                let temp = doc.data();
                tempArr.push({ ...temp })
            });
            setDBtest(tempArr);
        } catch (e) {
            console.log("can not  get the docs:", e);
        }
    }



    return (
        <div style={
            {
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexFlow: 'wrap',
            }}>

            {
                dbtest.map((prod) => (<Product image={prod.image} name={prod.model} info={prod.device} price={prod.price} key={uniqid()} />))
            }

        </div>

    )
}