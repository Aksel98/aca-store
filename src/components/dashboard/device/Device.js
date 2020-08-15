import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from 'react-router-dom'
import {db} from "../../services/firebase/Firebase";
import {BLUE, GREY, MyButton} from "../../main/constants/Constants";
import Loader from "../../main/Loader";
import uniqId from 'uniqid';
import DevicePrice from "./DevicePrice";
import AboutDevice from "./AboutDevice";
import {useTranslation} from "react-i18next";
import DeviceDescription from "./DeviceDescription";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    container: {
        minHeight: 628,
        margin: '60px 30px'
    },
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    imagesPart: {
        width: 300,
        textAlign: 'center'
    },
    mainImage: {
        width: 160,
        height: 220
    },
    additionalImagesParent: {
        cursor: 'pointer',
        borderBottom: '3px solid transparent',
        '&:hover': {
            borderBottom: `3px solid ${BLUE}`
        }
    },
    additionalImage: {
        width: 100,
        height: 100,
    },
    deviceInfoPart: {
        marginLeft: 30
    },
    info: {
        borderBottom: `2px solid ${GREY}`
    },
    btnParent: {
        margin: 20
    },
    displayFlex: {
        display: 'flex'
    }
})

export default function Device() {
    const [device, setDevice] = useState({})
    const [mainImage, setMainImage] = useState({})
    const [loader, setLoader] = useState(true)
    const {id} = useParams()
    const classes = useStyles()
    const {t} = useTranslation()
    const history = useHistory()

    useEffect(() => {
        db.collection('product').doc(id).get().then(doc => {
            setDevice(doc.data())
            setMainImage(doc.data().image)
            setLoader(false)
            console.log(doc.data())
        })
    }, [])

    function changeImage(image) {
        setMainImage(image)
    }

    return (
        <div className={classes.container}>
            <div onClick={() => history.goBack()} className={classes.backIcon}>
                <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
            </div>
            <div className={classes.main}>
                <div className={classes.imagesPart}>
                    <img className={classes.mainImage} src={mainImage}/>
                    {device.image && <div className={classes.displayFlex}>
                        {device.images?.map(image => {
                            return (
                                <div key={uniqId()} onClick={() => changeImage(image)}
                                     className={classes.additionalImagesParent}>
                                    <img src={image} className={classes.additionalImage}/>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                <div className={classes.deviceInfoPart}>
                    <div className={classes.info}>
                        <h1>{device.model}</h1>
                    </div>
                    <div className={classes.info}>
                        <DevicePrice device={device}/>
                    </div>
                    <div className={classes.info}>
                        <AboutDevice device={device} id={id}/>
                    </div>
                    <div className={classes.btnParent}>
                        <MyButton variant="contained" color="primary">{t('buy')}</MyButton>
                    </div>
                </div>
                {loader && <Loader/>}
            </div>
            <DeviceDescription/>
        </div>
    )
}
