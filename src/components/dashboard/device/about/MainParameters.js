import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {db} from "../../../services/firebase/Firebase";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {BLACK, GREY} from "../../../main/constants/Constants";

const useStyles = makeStyles({
    about: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 0'
    },
    parameter: {
        fontSize: 17,
        fontWeight: 600,
        color: GREY,
        marginRight: 10
    },
    input: {
        maxWidth: 100,
        fontSize: 17,
        fontWeight: 600,
        color: BLACK,
        border: 'none',
        textAlign: 'right',
        marginRight: props => props && 40,
    },
    editIcon: {
        position: 'absolute',
        right: 2,
        cursor: 'pointer'
    }
})

export default function MainParameters(props) {
    const {name, parameter, refs, isAdmin} = props
    const {id} = useParams()
    const classes = useStyles()
    const {t} = useTranslation()

    function onBlur(key, e) {
        db.collection('product').doc(id).update({
            [key]: e.target.value
        }).catch(err => console.log(err))
    }

    return (
        <div className={classes.about}>
            <div className={classes.parameter}>{t(name)}</div>
            <input disabled={!isAdmin}
                   className={classes.input}
                   ref={refs}
                   defaultValue={parameter}
                   onBlur={(e) => onBlur(name, e)}/>
            {isAdmin && <EditIcon onClick={() => refs.current.focus()} className={classes.editIcon}/>}
        </div>
    )
}
