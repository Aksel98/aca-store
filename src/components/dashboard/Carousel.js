import React, {useState, useEffect} from 'react';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import {makeStyles} from "@material-ui/core/styles";
import {storageRef} from "../services/firebase/Firebase";
import Loader from "../main/Loader";
import {WHITE} from "../main/constants/Constants"

const useStyles = makeStyles({
    display: {
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
    leftArrowIcon: {
        gridColumnStart: '1',
        gridColumnEnd: '2',
        gridRowStart: '5',
    },
    rightArrowIcon: {
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
    }
});

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const [imagesList, setImagesList] = useState([])
    const classes = useStyles()

    useEffect(() => {
        getImageRefs();
    }, [])

    useEffect(() => {
        let timerId = setTimeout(() => forward(), 5000);
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

    return (
        imagesList.length ?
            <div className={classes.display}>
                <ArrowBackIosSharpIcon className={`${classes.arrowIcon} ${classes.leftArrowIcon}`} onClick={backward}/>
                <img src={imagesList[index]} className={classes.carouselImg} alt=''/>
                <ArrowForwardIosSharpIcon className={`${classes.arrowIcon} ${classes.rightArrowIcon}`} onClick={forward}/>
            </div> : <div className={classes.loaderParent}><Loader/></div>
    )
}
