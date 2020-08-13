import React, {useState, useEffect} from 'react';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import {makeStyles} from "@material-ui/core/styles";
import {storageRef} from "../../services/firebase/Firebase";
import Loader from "../../main/Loader";
import {WHITE} from "../../main/constants/Constants"
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CarouselAdmin from "./CarouselAdmin";

const useStyles = makeStyles({
    display: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
    },
    carouselImg: {
        width: '100%',
        zIndex: '0',
        gridColumnStart: '1',
        gridColumnEnd: '21',
        gridRowStart: '1',
        gridRowEnd: '10'
    },
    arrowIcon: {
        zIndex: '1',
        gridRowEnd: '6',
        transform: 'scale(2)',
        marginRight: '5px',
        cursor: 'pointer',
        color: 'rgb(156, 156, 156)',
        padding: '0 5px',
        justifySelf: 'center',
        '&:hover': {
            color: 'rgb(182, 155, 0)'
        }
    },
    leftIcon: {
        gridColumnStart: '1',
        gridColumnEnd: '2',
        gridRowStart: '5',
    },
    rightIcon: {
        gridColumnStart: '20',
        gridColumnEnd: '21',
        gridRowStart: '5',
    },
    loaderParent: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        zIndex: 1,
        background: WHITE,
    },
    upload: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        zIndex: 1
    }
});

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const [imagesList, setImagesList] = useState([])
    const [modal, setModal] = useState(false)
    const [url, setUrl] = useState('');
    const classes = useStyles()

    useEffect(() => {
        getImageRefs();
    }, [])

    useEffect(() => {
        setImagesList([...imagesList, url])
    }, [url])

    useEffect(() => {
        let timerId = setTimeout(() => forward(), 500000);
        return () => clearTimeout(timerId)
    })

    function getImageRefs() {
        try {
            storageRef.child('/images/carousel/').listAll().then((res) => {
                const newImagesList = [...imagesList]
                res.items.forEach((itemRef) => {
                    (itemRef.getDownloadURL().then((url) => {
                        newImagesList.push(url);
                        setImagesList(newImagesList)
                    }));
                })
            }).catch(e => console.log(e));
        } catch (e) {
            console.log(e)
        }
    }

    const forward = () => {
        index < imagesList.length - 1 ? setIndex(index + 1) : setIndex(0)
    };

    const backward = () => {
        index > 0 ? setIndex(index - 1) : setIndex(imagesList.length - 1);
    };

    function openModal(val) {
        setModal(val)
    }

    return (
        imagesList.length ?
            <div className={classes.display}>
                <div className={classes.upload} onClick={openModal}>
                    <Fab color="primary">
                        <CloudUploadIcon/>
                    </Fab>
                </div>
                <ArrowBackIosSharpIcon className={`${classes.arrowIcon} ${classes.leftIcon}`} onClick={backward}/>
                <img src={imagesList[index]} className={classes.carouselImg} alt=''/>
                <ArrowForwardIosSharpIcon className={`${classes.arrowIcon} ${classes.rightIcon}`} onClick={forward}/>
                <CarouselAdmin isOpen={modal}
                               open={openModal}
                               images={imagesList}
                               setUrl={setUrl}/>
            </div> : <div className={classes.loaderParent}><Loader/></div>
    )
}
