import React, { useState, useEffect } from 'react';
import { db } from '../services/Firebase';
import Category from './Category';
import uniqid from 'uniqid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    categoryView: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '10%',
        marginBottom: '5%',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        justifyContent: 'space-around'
    }
}))

export default function CategoryList() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getAllCategoryInfo();
    }, []);
    async function getAllCategoryInfo() {
        try {
            const tempArr = [];
            const getCategory = (await db.collection('categories').get()).docs;
            getCategory.forEach((doc) => {
                let temp = doc.data(); tempArr.push({ ...temp });
            });
            setCategory(tempArr);

        } catch (e) {
            console.log("can not  get the docs:", e);
        }
    }
    const classes = useStyles();
    return (
        <div className={classes.categoryView} >
            {
                category.map((item) => {
                    return (
                        <Category key={uniqid()} name={item.name} image={item.image} />
                    )
                }
                )
            }

        </div>
    )
}