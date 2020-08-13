import React, {useState} from "react";
import ModalDialog from "../../main/modal/ModalDialog";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {db, storage} from "../../services/firebase/Firebase";
import {makeStyles} from "@material-ui/core";
import {ORANGE} from "../../main/constants/Constants";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    newCategoryName: {
        color: ORANGE
    }
}))

export default function CategoryListAdmin(props) {
    const {isOpen, open, setUrl, deletePopup, deletedId, setDeletePopup, setIsDelete} = props
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const classes = useStyles()
    const {t} = useTranslation()

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
                                open(false)
                                setCategoryName('')
                            })
                        }
                    )
            })
    }

    function deleteCategory() {
        db.collection('categories').doc(deletedId).delete().then(() => {
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

    return (
        <React.Fragment>
            <ModalDialog open={isOpen}
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
                         close={() => open(false)}/>
            <ModalDialog open={deletePopup}
                         title={t('areYouSure')}
                         doneButton={deleteCategory}
                         doneButtonName={t('yes')}
                         close={() => setDeletePopup(false)}/>
        </React.Fragment>
    )
}
