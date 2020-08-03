import React, { useEffect, useState } from 'react';
import Product from './Product';
import uniqid from 'uniqid';
import { db } from '../services/Firebase';

export default function ProductList() {
    const [prod, setProd] = useState([]);
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
            setProd(tempArr);
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
                prod.map((item) => (<Product image={item.image} name={item.model} info={item.device} price={item.price} key={uniqid()} />))
            }

        </div>

    )
}