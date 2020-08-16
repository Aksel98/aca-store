import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import ModalDialog from "../../main/popups/ModalDialog";
import {makeStyles} from "@material-ui/core";
import {ORANGE} from "../../main/constants/Constants";
import uniqId from "uniqid";
import {db} from "../../services/firebase/Firebase";
import {useTranslation} from "react-i18next";
import {useLocation, useHistory} from "react-router-dom";

const useStyles = makeStyles(() => ({
    newCategoryName: {
        color: ORANGE
    }
}))

export default function ProductsListAdmin(props) {
    const {open, isOpen, setNewDevice} = props
    const [newDeviceName, setNewDeviceName] = useState('');
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation()
    const classes = useStyles()

    function addDevice() {
        const type = location.pathname.split("/")[2]
        const id = uniqId()
        db.collection("product").doc(id).set({
            id,
            model: newDeviceName,
            price: 1,
            device: type,
            images: []
        }).then(res => {
            isOpen(false)
            setNewDevice(true)
            history.push(`${location}/${id}`)
        }).catch(err => console.log(err))
    }

    function onChange(e) {
        setNewDeviceName(e.target.value)
    }

    return (
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
                     disabled={!newDeviceName.trim()}
                     close={() => isOpen(false)}/>
    )
}
