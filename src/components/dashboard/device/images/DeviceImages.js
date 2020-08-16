import React from "react";
import uniqId from "uniqid";
import {makeStyles} from "@material-ui/core/styles";
import {BLUE, MyButton, ORANGE} from "../../../main/constants/Constants";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {db} from "../../../services/firebase/Firebase";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    additionalImagesParent: {
        width: 100,
        borderBottom: '3px solid transparent',
        cursor: 'pointer',
        '&:hover': {
            borderBottom: `3px solid ${BLUE}`
        }
    },
    additionalImage: {
        position: 'relative',
        width: 100,
        height: 100,
    },
    deleteBtn: {
        position: 'absolute',
        zIndex: 1
    },
    btn: {
        fontSize: 7,
        maxWidth: '95%',
        margin: '5px 0px'
    },
    displayFlex: {
        display: 'flex'
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    relative: {
        position: 'relative'
    },
    padding: {
        padding: 0
    }
})

export default function DeviceImages(props) {
    const {changeImage, images, setImages, openDeletePopup} = props
    const {id} = useParams()
    const {t} = useTranslation()
    const classes = useStyles()

    function changeMainImage(img) {
        const newImages = [...images]
        const currentIndex = newImages.indexOf(img)
        newImages[currentIndex] = newImages[0]
        newImages[0] = img
        db.collection('product').doc(id).update({
            images: newImages
        }).then(() => {
            setImages(newImages)
            changeImage(img)
        }).catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            {images?.map(image => {
                return (
                    <div key={uniqId()} className={classes.additionalImagesParent}>
                        <div onClick={() => openDeletePopup(true, image)} className={classes.deleteBtn}>
                            <MyButton className={classes.padding} newcolor={ORANGE}><HighlightOffIcon/></MyButton>
                        </div>
                        <div onClick={() => changeImage(image)}>
                            <img src={image} className={classes.additionalImage} alt=""/>
                        </div>
                        {<MyButton className={classes.btn}
                                   variant="contained"
                                   color="primary"
                                   onClick={() => changeMainImage(image)}>{t('makeMain')}</MyButton>}
                    </div>
                )
            })}
        </React.Fragment>
    )
}
