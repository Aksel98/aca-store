import React, {useState} from "react";
import ModalDialog from "../../main/modal/ModalDialog";
import uniqId from "uniqid";
import {BLUE, MyButton, ORANGE} from "../../main/constants/Constants";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import {storage} from "../../services/firebase/Firebase";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    adminCarouselImg: {
        width: 184,
        height: 184,
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
    },
    imageName: {
        fontWeight: 'bold',
        color: ORANGE,
        paddingTop: 5
    },
    center: {
        textAlign: 'center'
    },
})

export default function CarouselAdmin(props) {
    const [image, setImage] = useState(null);
    const {isOpen, open, images, setUrl, setDeletedImage} = props
    const {t} = useTranslation()
    const classes = useStyles()

    function addCarouselImg() {
        storage.ref(`images/carousel/${image?.name}`).put(image).on(
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
                            setUrl(url)
                        }
                    )
            }
        )
    }

    function addFile(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    function deleteImage(url) {
        const image = storage.refFromURL(url);
        storage.ref("images/carousel")
            .child(image.name).delete().then(() => {
                setDeletedImage(url)
            }
        ).catch((err) => {
            console.log(err)
        });
    }

    return (
        <ModalDialog open={isOpen}
                     content={
                         <div className={classes.adminImages}>{
                             images.map(img => {
                                 return <div key={uniqId} className={classes.adminImagesParent}>
                                     <img src={img}
                                          className={classes.adminCarouselImg} alt=''/>
                                     <div onClick={() => deleteImage(img)} className={classes.deleteBtn}>
                                         <MyButton newcolor={ORANGE}><HighlightOffIcon/></MyButton>
                                     </div>
                                     <div>{img.name}</div>
                                 </div>
                             })
                         }
                             <div className={`${classes.adminCarouselImg} ${classes.newCarouselImg}`}>
                                 <div className={classes.center}>
                                     <Fab color="primary" component="label">
                                         <AddIcon/>
                                         <input
                                             type="file"
                                             onChange={addFile}
                                             style={{display: "none"}}/>
                                     </Fab>
                                     <div className={classes.imageName}>{image?.name}</div>
                                 </div>
                             </div>
                         </div>
                     }
                     doneButton={addCarouselImg}
                     doneButtonName={t('add')}
                     close={() => open(false)}/>
    )
}
