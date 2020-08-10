import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from 'react-router-dom'
import {db} from "../services/firebase/Firebase";
const useStyles = makeStyles({
    container: {
        margin:  '60px 30px'
    },
})

export default function Device() {
    const classes = useStyles()
    let { id } = useParams()

    useEffect(() => {
        db.collection('product').doc(id).get().then(doc => {
            console.log(doc.data())
        })
    }, [])

    return  (
        <div className={classes.container}>
            ads
        </div>
    )
}
