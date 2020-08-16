import React, {useState} from "react";
import {BLUE, MyButton, ORANGE} from "../../../main/constants/Constants";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import {db, storage} from "../../../services/firebase/Firebase";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    additionalImage: {
        position: 'relative',
        width: 100,
        height: 100,
    },
    addImage: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    newImage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: `1px dotted ${BLUE}`,
        color: BLUE,
    },
    imageName: {
        fontWeight: 'bold',
        color: ORANGE,
        lineHeight: '30px'
    },
    addBtn: {
        maxWidth: '90%',
        height: 22
    },
})

export default function AddImagesAdmin(props) {
    const {images, setImages, type} = props
    const [newImage, setNewImage] = useState(null);
    const {id} = useParams()
    const {t} = useTranslation()
    const classes = useStyles()


    function addFile(e) {
        if (e.target.files[0]) {
            setNewImage(e.target.files[0])
        }
    }

    function addNewImage() {
        storage.ref(`images/${type}/${newImage.name}`).put(newImage).on(
            "state_changed",
            () => {
            },
            error => {
                console.log(error)
            },
            () => {
                storage.ref(`images/${type}`)
                    .child(newImage.name)
                    .getDownloadURL()
                    .then(url => {
                            const imgs = [...images]
                            imgs.push(url)
                            db.collection('product').doc(id).update({
                                images: imgs
                            }).then(() => {
                                setImages(imgs)
                                setNewImage(null)
                            }).catch(err => console.log(err))
                        }
                    )
            }
        )
    }

    return (
        <div className={`${classes.additionalImage} ${classes.newImage}`}>
            <MyButton className={classes.addImage} component="label">
                <AddIcon/>
                <input
                    type="file"
                    onChange={addFile}
                    style={{display: "none"}}/>
            </MyButton>
            <div className={classes.imageName}>{newImage?.name}</div>
            {newImage?.name && <MyButton className={classes.addBtn}
                                         color="primary"
                                         variant="contained"
                                         onClick={addNewImage}>{t('add')}</MyButton>}
        </div>
    )
}
