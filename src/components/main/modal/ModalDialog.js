import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MyButton} from "../constants/Constants"
import {useTranslation} from "react-i18next";

export default function ModalDialog(props) {
    const {t} = useTranslation()

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                {props.title && <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
                    <div>{props.content}</div>
                </DialogContent>
                <DialogActions>
                    <MyButton variant="contained"
                              autoFocus
                              onClick={props.close}>{t('close')}
                    </MyButton>
                    <MyButton variant="contained"
                              disabled={props.disabled}
                              autoFocus
                              onClick={props.doneButton}>{props.doneButtonName || t('yes')}
                    </MyButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
