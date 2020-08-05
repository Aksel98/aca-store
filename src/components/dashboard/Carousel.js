import React, { useState, useEffect } from 'react';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import { makeStyles } from "@material-ui/core/styles";
import { storageRef } from "../services/Firebase";
import Loader from "../main/Loader";

const useStyles = makeStyles(() => ({
    display: {
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
        gridTemplateRows: 'repeat(9, 1fr)',
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
    }
}));

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const [imagesList, setImagesList] = useState([])
    const classes = useStyles()

    useEffect(() => {
        getImageRefs();
        console.log(imagesList);
    }, [])

    useEffect(() => {
        let timerId = setTimeout(() => {
            let newIndex;
            index < imagesList.length - 1 ? newIndex = index + 1 : newIndex = 0;
            setIndex(newIndex)
        }, 4000);
        return () => clearTimeout(timerId)
    })

    async function getImageRefs() {
        try {
            const imageListRef = await storageRef.child('/images/carousel/');
            const newImagesList = [...imagesList]
            imageListRef.listAll().then((res) => {
                res.items.forEach((itemRef) => {
                    (itemRef.getDownloadURL().then((url) => {
                        newImagesList.push(url);
                    }));
                })
                setImagesList(newImagesList)
            }).catch(e => console.log(e));
        } catch (e) {
            console.log(e)
        }

    }

    const Forward = () => {
        let newIndex;
        index < imagesList.length - 1 ? newIndex = index + 1 : newIndex = 0;
        setIndex(newIndex)
    };

    const Backward = () => {
        let newIndex;
        index > 0 ? newIndex = index - 1 : newIndex = imagesList.length - 1;
        setIndex(newIndex)
    };

    return (
        imagesList.length ?
            <div className={classes.display}>
                <ArrowBackIosSharpIcon className={`${classes.arrowIcon} ${classes.leftArrowIcon}`} onClick={Backward} />
                <img src={imagesList[index]} className={classes.carouselImg} alt='' />
                <ArrowForwardIosSharpIcon className={`${classes.arrowIcon} ${classes.rightArrowIcon}`} onClick={Forward} />
            </div> : <Loader />
    )
}
