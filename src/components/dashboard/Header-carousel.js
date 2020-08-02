import React, { useState, useEffect } from 'react';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import { db, storageRef } from '../services/Firebase';
// import uniqid from 'uniqid';

const imageList = [];
async function getImageRefs() {
    // console.log(storageRef);
    const imageListRef = await storageRef.child('/images/carousel/');
    imageListRef.listAll()
        .then((res) => res.items.forEach((itemRef) => { (itemRef.getDownloadURL().then((url) => { imageList.push(url); })); }))
        .catch(e => console.log(e));

    return imageList
}
getImageRefs();
const styleCarousel = {
    display: 'grid',
    gridTemplateColumns: 'repeat(20, 1fr)',
    gridTemplateRows: 'repeat(9, 1fr)',

}
const arrowColor = 'rgb(156, 156, 156)';
const arrowHoverColor = 'rgb(182, 155, 0)';

function Carousel() {

    // const imageRef = db.collection('laptop').doc('apple');
    // imageRef.get().then((doc) => { (console.log(doc.data().macbook.image)) });


    const [index, setIndex] = useState(0);
    const [color, setColor] = useState(arrowColor);
    const [color1, setColor1] = useState(arrowColor);
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
        return () => { clearTimeout(timerId) }
    })




    return (
        <div style={styleCarousel} >
            <ArrowBackIosSharpIcon
                style={{
                    zIndex: '1',
                    gridColumnStart: '1',
                    gridColumnEnd: '2',
                    gridRowStart: '5',
                    gridRowEnd: '6',
                    transform: 'scale(2)',
                    justifySelf: 'center',

                    cursor: 'pointer',
                    color: `${color}`
                }}
                onClick={Backward}
                onMouseOver={() => setColor(arrowHoverColor)}
                onMouseLeave={() => setColor(arrowColor)}>

            </ArrowBackIosSharpIcon>
            <img
                style={{
                    width: '100%',
                    zIndex: '0',
                    gridColumnStart: '1',
                    gridColumnEnd: '21',
                    gridRowStart: '1',
                    gridRowEnd: '10',


                }}
                src={imageList[index]} alt='' />
            <ArrowForwardIosSharpIcon
                style={{
                    zIndex: '1',
                    gridColumnStart: '20',
                    gridColumnEnd: '21',
                    gridRowStart: '5',
                    gridRowEnd: '6',
                    transform: 'scale(2)',
                    justifySelf: 'center',

                    cursor: 'pointer',
                    color: `${color1}`
                }}
                onClick={Forward}
                onMouseOver={() => setColor1(arrowHoverColor)}
                onMouseLeave={() => setColor1(arrowColor)}>
            </ArrowForwardIosSharpIcon>

        </div>

    )

}
export default Carousel;