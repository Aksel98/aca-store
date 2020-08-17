import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { BLACK,} from "../constants/Constants"

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
    },
    dropdownTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    dropdown: {
        background: BLACK,
        width: 'max-content',
        minWidth: 110,
        borderRadius: '0 0 7px 7px',
        position: 'absolute',
        top: 24,
        right: 0,
        left: 0,
        zIndex: 1,
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    },
}));

export default function DropDown(props) {
    const classes = useStyles();
    const [hover, setHover] = useState(false);

    return (
        <div className={classes.root} onClick={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className={classes.dropdownTitle}>
                <div>{props.name}</div>
                <ArrowDropDownRoundedIcon />
            </div>
            {hover && (<div className={classes.dropdown}>
                {props.dropdownContent}
            </div>)
            }
        </div>
    );
}
