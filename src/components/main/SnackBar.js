import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default function SnackBar(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={props.duration || 5000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={props.error ? 'error' : 'success'}>
                {props.message}
            </MuiAlert>
        </Snackbar>
    )
}
