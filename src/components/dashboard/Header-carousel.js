import React, {useState, useEffect} from 'react';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    display: {
        display: 'grid'
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

const imageList = [
    "./images/iphone.jpg",
    "./images/laptop.jpg",
    "./images/monitor.jpg",
    "./images/watch.jpg"
];

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const classes = useStyles()

    const Forward = () => {
        let newIndex;
        index < imageList.length - 1 ? newIndex = index + 1 : newIndex = 0;
        setIndex(newIndex)
    };

    const Backward = () => {
        let newIndex;
        index > 0 ? newIndex = index - 1 : newIndex = imageList.length - 1;
        setIndex(newIndex)
    };

    useEffect(() => {
        let timerId = setTimeout(() => {
            let newIndex;
            index < imageList.length - 1 ? newIndex = index + 1 : newIndex = 0;
            setIndex(newIndex)
        }, 4000);
        return () => clearTimeout(timerId)
    })

    return (
        <div className={classes.display}>
            <ArrowBackIosSharpIcon className={`${classes.arrowIcon} ${classes.leftArrowIcon}`} onClick={Backward}/>
            <img src={imageList[index]} className={classes.carouselImg} alt=''/>
            <ArrowForwardIosSharpIcon className={`${classes.arrowIcon} ${classes.rightArrowIcon}`} onClick={Forward}/>
        </div>
    )
}
