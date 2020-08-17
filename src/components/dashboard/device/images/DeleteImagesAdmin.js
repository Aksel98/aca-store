import React from "react";
import ModalDialog from "../../../main/popups/ModalDialog";
import {useTranslation} from "react-i18next";
import {db, storage} from "../../../services/firebase/Firebase";
import {useParams} from "react-router-dom";

export default function DeleteImagesAdmin(props) {
    const {images, setImages, deletedImage, openDeleteModal, isDeleteModal, setMainImage, type} = props
    const {id} = useParams()
    const {t} = useTranslation()

    function deleteImage() {
        const imgs = images.filter(image => image !== deletedImage)
        console.log(deletedImage)
        db.collection('product').doc(id).update({
            images: imgs
        }).then(() => {
            setImages(imgs)
            setMainImage(imgs[0])
            const img = storage.refFromURL(deletedImage);
            storage.ref(`images/${type}`).child(img.name).delete().catch(err => console.log(err))
            isDeleteModal(false)
        }).catch(err => console.log(err))
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
