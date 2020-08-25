import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {MyButton, ORANGE} from "../../main/constants/constants";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {Link} from "react-router-dom";
import {TypeContext} from "../../main/contexts/typeContext";

const useStyles = makeStyles({
    categoryImg: {
        width: 300,
        height: 135,
        borderRadius: '2px',
        margin: '5px',
        boxSizing: 'border-box'
    },
    deleteBtn: {
        width: 35,
        position: 'absolute'
    }
})

export default function Category(props) {
    const {onDelete, name, image, id} = props
    const isAdmin = useContext(TypeContext)
    const classes = useStyles()

    return (
        <div>
            {isAdmin && <div onClick={() => onDelete(true, id)} className={classes.deleteBtn}>
                <MyButton newcolor={ORANGE}><HighlightOffIcon/></MyButton>
            </div>}
            <Link to={{pathname: `/categories/${name}`}}>
                <img className={classes.categoryImg} src={image} alt="wait a little"/>
            </Link>
        </div>
    )
}
