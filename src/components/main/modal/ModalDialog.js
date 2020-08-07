import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {BLACK, MyButton, ORANGE} from "../Styles";

export default function ModalDialog(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MyButton color={BLACK}
                              variant="contained"
                              autoFocus
                              onClick={props.close}>Cancel
                    </MyButton>
                    <MyButton color={ORANGE}
                              variant="contained"
                              autoFocus
                              onClick={props.doneButton}>{props.doneButtonName || 'Yes'}
                    </MyButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
