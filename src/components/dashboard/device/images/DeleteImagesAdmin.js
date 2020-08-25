import React from "react";
import ModalDialog from "../../../main/popups/ModalDialog";
import {useTranslation} from "react-i18next";
import {db, storage} from "../../../services/firebase/Firebase";
import {useParams} from "react-router-dom";
import {getError} from "../../../services/redux/actions/uiActions";
import {useDispatch} from "react-redux";

export default function DeleteImagesAdmin(props) {
    const {images, setImages, deletedImage, openDeleteModal, isDeleteModal, setMainImage, type} = props
    const dispatch = useDispatch()
    const {id} = useParams()
    const {t} = useTranslation()

    function deleteImage() {
        const imgs = images.filter(image => image !== deletedImage)
        db.collection('product').doc(id).update({
            images: imgs
        }).then(() => {
            setImages(imgs)
            setMainImage(imgs[0])
            const img = storage.refFromURL(deletedImage);
            storage.ref(`images/${type}`).child(img.name).delete().catch(err => dispatch(getError(err.message)))
            isDeleteModal(false)
        }).catch(err => dispatch(getError(err.message)))
    }

    return (
        <React.Fragment>
            <ModalDialog open={openDeleteModal}
                         title={t('areYouSure')}
                         doneButtonName={t('yes')}
                         doneButton={deleteImage}
                         close={() => isDeleteModal(false)}/>
        </React.Fragment>
    )
}
