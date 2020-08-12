import React, {useState, useEffect} from 'react';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import {makeStyles} from "@material-ui/core/styles";
import {storage, storageRef} from "../services/firebase/Firebase";
import Loader from "../main/Loader";
import {BLUE, MyButton, ORANGE, WHITE} from "../main/constants/Constants"
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import ModalDialog from "../main/modal/ModalDialog";
import {useTranslation} from "react-i18next";
import uniqId from "uniqid"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
    adminCarouselImg: {
        width: 184,
        height: 184,
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
    },
    upload: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        zIndex: 1
    },
    adminImagesParent: {
        position: 'relative'
    },
    adminImages: {
        display: ' flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    newCarouselImg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px dotted ${BLUE}`,
    },
    deleteBtn: {
        width: 35,
        position: 'absolute',
        top: 0
    }
});

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const [imagesList, setImagesList] = useState([])
    const [modal, setModal] = useState(false)
    const [image, setImage] = useState(null);
    const classes = useStyles()
    const {t} = useTranslation()

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

    function addCarouselImg() {
        storage.ref(`images/carousel/${image.name}`).put(image).on(
            "state_changed",
            () => {
            },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("images/carousel")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                            getImageRefs()
                            // setUrl(url)
                            // db.collection('categories').add({
                            //     name: categoryName,
                            //     image: url
                            // }).then(() => {
                            //     setDisabled(false)
                            //     setOpenModal(false)
                            // })
                        }
                    )
            }
        )
    }

    const forward = () => {
        index < imagesList.length - 1 ? setIndex(index + 1) : setIndex(0)
    };

    const backward = () => {
        index > 0 ? setIndex(index - 1) : setIndex(imagesList.length - 1);
    };

    function openModal() {
        setModal(true)
    }

    function addFile(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        imagesList.length ?
            <div className={classes.display}>
                <div className={classes.upload} onClick={openModal}>
                    <Fab color="primary">
                        <CloudUploadIcon/>
                    </Fab>
                </div>
                <ArrowBackIosSharpIcon className={`${classes.arrowIcon} ${classes.leftArrowIcon}`} onClick={backward}/>
                <img src={imagesList[index]} className={classes.carouselImg} alt=''/>
                <ArrowForwardIosSharpIcon className={`${classes.arrowIcon} ${classes.rightArrowIcon}`}
                                          onClick={forward}/>
                <ModalDialog open={modal}
                             content={
                                 <div className={classes.adminImages}>{
                                     imagesList.map(image => {
                                         return <div key={uniqId} className={classes.adminImagesParent}>
                                             <img src={image}
                                                  className={classes.adminCarouselImg} alt=''/>
                                             <div className={classes.deleteBtn}>
                                                 <MyButton newcolor={ORANGE}><HighlightOffIcon/></MyButton>
                                             </div>
                                             <div>{image.name}</div>
                                         </div>
                                     })
                                 }
                                     <div className={`${classes.adminCarouselImg} ${classes.newCarouselImg}`}>
                                         <Fab color="primary" component="label">
                                             <AddIcon/>
                                             <input
                                                 type="file"
                                                 onChange={addFile}
                                                 style={{display: "none"}}/>
                                         </Fab>
                                     </div>
                                 </div>
                             }
                             doneButton={addCarouselImg}
                             doneButtonName={t('add')}
                             close={() => setModal(false)}/>
            </div> : <div className={classes.loaderParent}><Loader/></div>
    )
}
