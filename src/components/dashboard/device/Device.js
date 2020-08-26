import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useParams} from 'react-router-dom'
import {db} from "../../services/firebase/Firebase";
import {GREY, MyButton} from "../../main/constants/constants";
import Loader from "../../main/loader/Loader";
import AboutDevice from "./about/AboutDevice";
import {useTranslation} from "react-i18next";
import DeviceDescription from "./description/DeviceDescription";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useHistory} from "react-router-dom";
import Price from "./price/Price";
import Credits from "./price/Credits";
import DeviceCount from "./count/DeviceCount";
import DeviceImages from "./images/DeviceImages";
import DeleteImagesAdmin from "./images/DeleteImagesAdmin";
import AddImagesAdmin from "./images/AddImagesAdmin";
import ReactImageMagnify from "react-image-magnify";
import {useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {addToBasket} from "../../services/redux/actions/basketAction";
import {TypeContext} from "../../main/contexts/typeContext";
import BackRouter from "../../main/BackRouter";

const useStyles = makeStyles({
    container: {
        height: props => props.mediaTablet ? 'calc(100vh - 345px)' : 'calc(100vh - 240px)',
        overflow: 'auto',
        margin: '60px 0',
        padding: '0 20px'
    },
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    images: {
        width: 302,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    deviceInfoPart: {
        marginLeft: props => props.media && 101,
        width: props => !props.media && '100%'
    },
    info: {
        borderBottom: `2px solid ${GREY}`
    },
    model: {
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: '0 0 15px',
    },
    btnParent: {
        textDecoration: 'none'
    },
    btnDistance: {
        margin: '20px 0',
    },
    displayFlex: {
        display: 'flex'
    },
    flexWrap: {
        flexWrap: 'wrap'
    }
})

export default function Device() {
    const [device, setDevice] = useState({})
    const [images, setImages] = useState([])
    const [mainImage, setMainImage] = useState({})
    const [loader, setLoader] = useState(true)
    const [price, setPrice] = useState(0)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deletedImage, setDeletedImage] = useState(null)
    const {id} = useParams()
    const basketItems = useSelector(state => state.basket)
    const [basket] = basketItems.filter(item => item.id === id)
    const [deviceCount, setDeviceCount] = useState(basket?.quantity || 1)
    const isAdmin = useContext(TypeContext)
    const dispatch = useDispatch()
    const media = useMediaQuery('(min-width:990px)');
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const classes = useStyles({media, mediaTablet})
    const {t} = useTranslation()
    const history = useHistory()

    useEffect(() => {
        db.collection('product').doc(id).get().then(doc => {
            setDevice(doc.data())
            setMainImage(doc.data()?.images && doc.data()?.images[0])
            setImages(doc.data()?.images)
            setPrice(doc.data().price)
            setLoader(false)
        })
    }, [])

    function changeImage(image) {
        setMainImage(image)
    }

    function openDeletePopup(val, image) {
        setDeletedImage(image)
        setOpenDeleteModal(val)
    }

    function addCount() {
        setDeviceCount(deviceCount + 1)
    }

    function reduceCount() {
        if (deviceCount > 1) {
            setDeviceCount(deviceCount - 1)
        }
    }

    function buy() {
        dispatch(addToBasket(device.id, price, device.device, deviceCount))
    }

    return (
        <React.Fragment>
            {loader ? <Loader/> : <div className={classes.container}>
                <BackRouter/>
                <div className={classes.main}>
                    <div className={classes.images}>
                        <ReactImageMagnify  {...{
                            smallImage: {
                                isFluidWidth: false,
                                src: `${mainImage}`,
                                width: 160,
                                height: 220,
                            },
                            largeImage: {
                                src: `${mainImage}`,
                                width: 500,
                                height: 600,
                            }
                        }}/>
                        <div className={`${classes.displayFlex} ${classes.flexWrap}`}>
                            <DeviceImages images={images} setImages={setImages} changeImage={changeImage}
                                          openDeletePopup={openDeletePopup}/>
                            {isAdmin && <AddImagesAdmin images={images} setImages={setImages} type={device.device}/>}
                        </div>
                    </div>
                    <DeleteImagesAdmin images={images}
                                       setImages={setImages}
                                       openDeleteModal={openDeleteModal}
                                       isDeleteModal={setOpenDeleteModal}
                                       deletedImage={deletedImage}
                                       setMainImage={setMainImage}
                                       type={device.device}/>
                    <div className={classes.deviceInfoPart}>
                        <div className={classes.info}>
                            <div className={classes.model}>{device.model}</div>
                        </div>
                        <div className={classes.info}>
                            <Price price={price} setPrice={setPrice} count={deviceCount}/>
                            <Credits price={price} count={deviceCount}/>
                            <DeviceCount count={deviceCount} add={addCount} reduce={reduceCount}
                                         setCount={setDeviceCount}/>
                        </div>
                        <div className={classes.info}>
                            <AboutDevice device={device}/>
                        </div>
                        <Link to="/checkout" onClick={buy} className={classes.btnParent}>
                            <MyButton className={classes.btnDistance} variant="contained"
                                      color="primary">{t('buy')}</MyButton>
                        </Link>
                    </div>
                </div>
                <DeviceDescription/>
            </div>}
        </React.Fragment>
    )
}
