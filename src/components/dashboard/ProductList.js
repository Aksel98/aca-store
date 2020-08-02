import React, { useEffect, useState, useRef } from 'react';
import Product from './Product';
import uniqid from 'uniqid';
import { db } from '../services/Firebase';

export default function ProductList() {

    const [dbtest, setDBtest] = useState([]);
    // {
    //     image: 'url1',
    //     name: 'iphone 5',
    //     info: 'apple iphone 5 64 gb ',
    //     price: '150 usd',
    //     id: uniqid()
    // },
    // {
    //     image: 'url2',
    //     name: 'iphone 11',
    //     info: 'apple iphone 11 64 gb ',
    //     price: '500 usd',
    //     id: uniqid()
    // }
    // ];
    const componentIsMounted = useRef(true);
    useEffect(() => {
        // each useEffect can return a cleanup function
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    useEffect(() => {
        async function getAllProductInfo() {
            try {
                const tempArr = [];
                const getModelInfoRef = await db.collection('product').get()
                    .(docCollection => {
                        docCollection.docs.map(doc => {
                            tempArr.push({ ...doc.data() });
                            if (componentIsMounted.current) {
                                setDBtest(tempArr);
                                console.log(dbtest);
                            }
                        })

                    }  catch (e) {
                        console.log("error on getting the info:", e);
                    }
            }
                getAllProductInfo();
        }, [])

    // (async function getAllProductInfo() {
    //     const getModelInfoRef = await db.collection('product').get()
    //         .then(docCollection => {
    //             docCollection.docs.map(doc => { dbtest.push({ ...doc.data() }); console.log(dbtest) })
    //         })
    //         .catch((e) => console.log("error on getting the info:", e))
    // })();


    return (
        <div style={
            {
                margin: 'auto',
                width: '70%'
            }}>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                    flexFlow: 'wrap',
                }}>
                {
                    dbtest.map((prod) => (<Product image={prod.image} name={prod.name} info={prod.info} price={prod.price} key={prod.id} />))
                }
            </div>
        </div>

    )
}