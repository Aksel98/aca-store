import React, {useEffect} from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {getError, getSuccess} from "../../services/redux/actions/uiActions";

export default function SnackBar(props) {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(getSuccess(''))
            dispatch(getError(false))
        }, props.duration || 5000)
    }, [props.duration, dispatch])

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
