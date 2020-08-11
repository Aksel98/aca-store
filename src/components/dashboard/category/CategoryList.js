import React, {useEffect, useState} from 'react';
import Category from './Category';
import uniqId from 'uniqid';
import {makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {MyButton, ORANGE, WHITE} from "../../main/constants/Constants"
import {db, storage} from "../../services/firebase/Firebase";
import ModalDialog from "../../main/modal/ModalDialog";
import {useTranslation} from "react-i18next";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(() => ({
    categoryView: {
        backgroundColor: WHITE,
        padding: '80px 40px 0',
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
    const [openNewCategory, setOpenNewCategory] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const classes = useStyles();
    const {t} = useTranslation()

    useEffect(() => {
        getAllCategoryInfo();
    }, []);

    function getAllCategoryInfo() {
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

    function addCategory() {
        console.log(image)
        storage.ref(`images/category-images//${image.name}`).put(image).on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                    })
            }
        )
        // db.collection('categories').add({
        //     name: newCategoryName
        // }).then(doc => {
        //     console.log(doc.id)
        // })
    }

    function addFile(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    function addCategoryName(e) {
        setCategoryName(e.target.value)
    }

    function openAddedCategory() {
        setOpenNewCategory(true)
    }

    return (
        <div>
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
            <ModalDialog open={openNewCategory}
                         content={
                             <div>
                                 <div>
                                     <h3 className={classes.newCategoryName}>{t('chooseCategoryName')}</h3>
                                     <TextField value={categoryName} onChange={addCategoryName}/>
                                 </div>
                                 <div>
                                     <h3 className={classes.newCategoryName}>{t('chooseCategoryImage')}</h3>
                                     <input type="file" onChange={addFile}/>
                                 </div>
                             </div>
                         }
                         doneButton={addCategory}
                         doneButtonName={t('add')}
                         close={() => setOpenNewCategory(false)}/>
            <div onClick={openAddedCategory} className={classes.btnParent}>
                <MyButton newcolor={ORANGE} variant="contained">Add Category</MyButton>
            </div>
        </div>
    )
}
