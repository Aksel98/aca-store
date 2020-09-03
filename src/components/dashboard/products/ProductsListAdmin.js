import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import ModalDialog from "../../main/popups/ModalDialog";
import {makeStyles} from "@material-ui/core";
import {ORANGE} from "../../main/constants/constants";
import uniqId from "uniqid";
import {db} from "../../services/firebase/Firebase";
import {useTranslation} from "react-i18next";
import {useLocation, useHistory} from "react-router-dom";
import {getError} from "../../services/redux/actions/uiActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(() => ({
    newCategoryName: {
        color: ORANGE
    }
}))

export default function ProductsListAdmin(props) {
    const {open, isOpen, setNewDevice, setLoader, deleteModal, openDeleteModal} = props
    const [newDeviceName, setNewDeviceName] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation()
    const classes = useStyles()

    function addDevice() {
        setBtnDisable(true)
        const type = location.pathname.split("/")[2]
        const id = uniqId()
        db.collection("product").doc(id).set({
            id,
            model: newDeviceName,
            price: 1,
            device: type,
            images: []
        }).then(() => {
            isOpen(false)
            setNewDevice(true)
            history.push(`${location}/${id}`)
            setBtnDisable(false)
        }).catch(err => dispatch(getError(err.message)))
    }

    function deleteDevice() {
        setLoader(true)
        db.collection("product").doc(deleteModal.id).delete().then(() => {
            setNewDevice(true)
            openDeleteModal(false)
        }).catch(err => dispatch(getError(err.message)))
    }

    function onChange(e) {
        setNewDeviceName(e.target.value)
    }

    return (
        <React.Fragment>
            <ModalDialog open={open}
                         content={
                             <div>
                                 <div>
                                     <h3 className={classes.newCategoryName}>{t('chooseModelName')}</h3>
                                     <TextField label={`${t('name')}...`}
                                                value={newDeviceName}
                                                onChange={onChange}/>
                                 </div>
                             </div>
                         }
                         doneButton={addDevice}
                         doneButtonName={t('add')}
                         disabled={!newDeviceName.trim() || btnDisable}
                         close={() => isOpen(false)}/>
            <ModalDialog open={deleteModal.open}
                         title={t('areYouSure')}
                         doneButtonName={t('yes')}
                         doneButton={deleteDevice}
                         close={() => openDeleteModal(false)}/>
        </React.Fragment>
    )
}
