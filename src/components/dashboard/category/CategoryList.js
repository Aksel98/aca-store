import React, {useEffect, useState} from 'react';
import Category from './Category';
import uniqId from 'uniqid';
import {makeStyles} from '@material-ui/core';
import {MyButton, ORANGE, WHITE} from "../../main/constants/Constants"
import {db, storage} from "../../services/firebase/Firebase";
import ModalDialog from "../../main/modal/ModalDialog";
import {useTranslation} from "react-i18next";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(() => ({
    categoryView: {
        backgroundColor: WHITE,
        minHeight: 180,
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
    const [openModal, setOpenModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [url, setUrl] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [id, setId] = useState('');
    const classes = useStyles();
    const {t} = useTranslation()

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
            console.log("can not  get the docs:", e);
        }
    }

    function addCategory() {
        setDisabled(true)
        storage.ref(`images/category-images/${image.name}`).put(image).on(
            "state_changed",
            () => {
            },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("images/category-images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                            setUrl(url)
                            db.collection('categories').add({
                                name: categoryName,
                                image: url
                            }).then(() => {
                                setDisabled(false)
                                setOpenModal(false)
                            })
                        }
                    )
            })
    }

    function deleteCategory() {
        db.collection('categories').doc(id).delete().then(() => {
            setDeletePopup(false)
            setIsDelete(true)
        }).catch(err => console.log(err))
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
        setOpenModal(true)
    }

    function openDeletePopup(val, id) {
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
            <ModalDialog open={openModal}
                         content={
                             <div>
                                 <div>
                                     <h3 className={classes.newCategoryName}>{t('chooseCategoryName')}</h3>
                                     <TextField value={categoryName} onChange={addCategoryName}/>
                                 </div>
                                 <div>
                                     <h3 className={classes.newCategoryName}>{t('chooseCategoryImage')}</h3>
                                     <Fab color="primary" component="label">
                                         <CloudUploadIcon/>
                                         <input
                                             type="file"
                                             onChange={addFile}
                                             style={{display: "none"}}/>
                                     </Fab>
                                 </div>
                                 <h3 className={classes.newCategoryName}>{image?.name}</h3>
                             </div>
                         }
                         disabled={!categoryName || !image || disabled}
                         doneButton={addCategory}
                         doneButtonName={t('add')}
                         close={() => setOpenModal(false)}/>
            <ModalDialog open={deletePopup}
                         title={t('areYouSure')}
                         doneButton={deleteCategory}
                         doneButtonName={t('yes')}
                         close={() => setDeletePopup(false)}/>
            <div onClick={openAddedCategory} className={classes.btnParent}>
                <MyButton newcolor={ORANGE} variant="contained">Add Category</MyButton>
            </div>
        </div>
    )
}
