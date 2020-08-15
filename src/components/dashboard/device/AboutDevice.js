import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK, BLUE, GREY} from "../../main/constants/Constants";
import {useTranslation} from "react-i18next";
import EditIcon from '@material-ui/icons/Edit';
import {db} from "../../services/firebase/Firebase";

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
        fontSize: 17,
        fontWeight: 600,
        color: BLACK,
        border: 'none',
        textAlign: 'right',
        marginRight: props => props && 40
    },
    editIcon: {
        position: 'absolute',
        right: 2,
        cursor: 'pointer'
    }
})

export default function AboutDevice(props) {
    const {device, id} = props
    const [isAdmin] = useState(true)
    const classes = useStyles(isAdmin)
    const {t} = useTranslation()
    const inputRef_1 = React.createRef()
    const inputRef_2 = React.createRef()
    const inputRef_3 = React.createRef()
    const inputRef_4 = React.createRef()

    useEffect(() => {
        db.collection('product').doc(id).update({
            parameters: {
                ram: '4GB',
                memory: '128GB',
                year: '2018',
                color: 'Black',
            }
        })
    })

    return (
        <React.Fragment>
            {device.parameters && <div className={classes.about}>
                <div className={classes.parameter}>{t('ram')}</div>
                <input disabled={!isAdmin} className={classes.input} ref={inputRef_1} defaultValue={device.parameters.ram}/>
                {isAdmin && <EditIcon onClick={() => inputRef_1.current.focus()} className={classes.editIcon}/>}
            </div>}
            {device.parameters && <div className={classes.about}>
                <div className={classes.parameter}>{t('memory')}</div>
                <input disabled={!isAdmin} className={classes.input} ref={inputRef_2} defaultValue={device.parameters.memory}/>
                {isAdmin && <EditIcon onClick={() => inputRef_2.current.focus()} className={classes.editIcon}/>}
            </div>}
            {device.parameters && <div className={classes.about}>
                <div className={classes.parameter}>{t('year')}</div>
                <input disabled={!isAdmin} className={classes.input} ref={inputRef_3} defaultValue={device.parameters.year}/>
                {isAdmin && <EditIcon onClick={() => inputRef_3.current.focus()} className={classes.editIcon}/>}
            </div>}
            {device.parameters && <div className={classes.about}>
                <div className={classes.parameter}>{t('color')}</div>
                <input disabled={!isAdmin} className={classes.input} ref={inputRef_4} defaultValue={device.parameters.color}/>
                {isAdmin && <EditIcon onClick={() => inputRef_4.current.focus()} className={classes.editIcon}/>}
            </div>}
        </React.Fragment>
    )
}
