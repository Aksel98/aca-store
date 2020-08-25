import React, {useEffect} from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {SET_ERRORS} from "../../services/redux/types";

export default function SnackBar(props) {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => dispatch({
            type: SET_ERRORS,
            payload: false
        }), props.duration || 5000)
    }, [])

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

SnackBar.propTypes = {
    duration: PropTypes.number,
    error: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
