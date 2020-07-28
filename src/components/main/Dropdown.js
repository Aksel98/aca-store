import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import {BLACK} from "./Styles";

const useStyles = makeStyles(() => ({

    root: {
        position: 'relative',
    },

    dropdownTitle: {
        display: 'flex',
        alignItems: 'center',
    },

    dropdown: {
        width: 'max-content',
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',

        '& :not(selector)': {
            color: BLACK,
            margin: '20px 16px',
        },
    },
}));

export default function DropDown(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <div className={classes.dropdownTitle} onClick={handleClick}>
                    {props.name}<ArrowDropDownRoundedIcon/>
                </div>
                {open && (<div className={classes.dropdown}>
                    {props.items}
                </div>)
                }
            </div>
        </ClickAwayListener>
    );
}
