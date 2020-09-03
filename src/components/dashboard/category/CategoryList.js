import React, {useContext, useEffect, useState} from 'react';
import Category from './Category';
import {makeStyles} from '@material-ui/core';
import {MyButton, ORANGE, WHITE} from "../../main/constants/constants"
import {db} from "../../services/firebase/Firebase";
import CategoryListAdmin from "./CategoryListAdmin";
import {TypeContext} from "../../main/contexts/typeContext";

const useStyles = makeStyles(() => ({
    categoryView: {
        backgroundColor: WHITE,
        minHeight: 180,
        padding: '40px 40px 0',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        justifyContent: 'space-around'
    },
    btnParent: {
        width: 'fit-content',
        margin: '20px auto'
    },
    newCategoryName: {
        color: ORANGE
    }
}))

export default function CategoryList() {
    const [category, setCategory] = useState([]);
    const [modal, setModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [url, setUrl] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const [id, setId] = useState('');
    const isAdmin = useContext(TypeContext)
    const classes = useStyles();

    useEffect(() => {
        getAllCategoryInfo();
    }, []);

    useEffect(() => {
        getAllCategoryInfo();
    }, [url, isDelete]);

    function getAllCategoryInfo() {
        try {
            const tempArr = [];
            db.collection('categories').get().then(snapshot => {
                snapshot.docs.forEach((doc) => {
                    let temp = doc.data();
                    tempArr.push({...temp, id: doc.id});
                });
                setCategory(tempArr);
            });
        } catch (e) {
            console.log(e);
        }
    }

    function openAddedCategory(val) {
        setModal(val)
    }

    function openDeletePopup(val, id) {
        setIsDelete(false)
        setId(id)
        setDeletePopup(val)
    }

    return (
        <div>
            <div className={classes.categoryView}>{
                category.map((item) => {
                        return (<div key={item.id}
                                     style={{textDecoration: 'none', margin: '5px', marginTop: '10px'}}>
                                <Category id={item.id} name={item.name} image={item.image} onDelete={openDeletePopup}/>
                            </div>
                        )
                    }
                )
            }
            </div>
            <CategoryListAdmin isOpen={modal}
                               open={openAddedCategory}
                               setUrl={setUrl}
                               setDeletePopup={setDeletePopup}
                               setIsDelete={setIsDelete}
                               deletePopup={deletePopup}
                               deletedId={id}/>
            {isAdmin && <div onClick={openAddedCategory} className={classes.btnParent}>
                <MyButton newcolor={ORANGE} variant="contained">Add Category</MyButton>
            </div>}
        </div>
    )
}
