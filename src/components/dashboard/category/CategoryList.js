import React, {useEffect, useState} from 'react';
import Category from './Category';
import uniqId from 'uniqid';
import {makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {WHITE} from "../../main/constants/Constants"
import {db} from "../../services/firebase/Firebase";

const useStyles = makeStyles(() => ({
    categoryView: {
        backgroundColor: WHITE,
        padding: '80px 40px',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        justifyContent: 'space-around'
    },

}))

export default function CategoryList() {
    const [category, setCategory] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllCategoryInfo();
    }, []);

    async function getAllCategoryInfo() {
        try {
            const tempArr = [];
            db.collection('categories').get().then(snapshot => {
                snapshot.docs.forEach((doc) => {
                    let temp = doc.data();
                    tempArr.push({...temp});
                });
                setCategory(tempArr);
            });
        } catch (e) {
            console.log("can not  get the docs:", e);
        }
    }

    return (
        <div className={classes.categoryView}>{
            category.map((item) => {
                    return (<Link to={{pathname: `/categories/${item.name}`}}
                                  key={uniqId()}
                                  style={{textDecoration: 'none', margin: '5px', marginTop: '10px'}}>
                            <Category key={uniqId()} name={item.name} image={item.image}/>
                        </Link>
                    )
                }
            )
        }
        </div>
    )
}
