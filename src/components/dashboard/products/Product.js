import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {BLACK, GREY, MyButton, ORANGE, WHITE} from '../../main/Styles';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import {useMediaQuery} from "@material-ui/core";
import {UserContext} from "../../main/context/UserContext";
import {useTranslation} from "react-i18next";
import {db} from "../../services/Firebase";

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        width: props => props.mediaTablet ? (props.mediaMobile ? 135 : 200) : 210,
        height: props => props.mediaTablet ? (props.mediaMobile ? 215 : 255) : 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '5px',
        border: `1px solid ${GREY}`,
        borderRadius: '3px',
        cursor: 'pointer',
        opacity: '0.9',
        '&:hover': {
            opacity: '1',
        }
    },
    productImage: {
        width: props => props.mediaTablet ? '60%' : '75%'
    },
    modelInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        color: BLACK,
        fontWeight: '600'
    },
    productName: {
        fontSize: props => props.mediaMobile ? 16 : 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingBottom: 25
    },
    price: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
    },
    infoWithImage: {
        textAlign: 'center',
        padding: 10
    },
    btnWrapper: {
        backgroundColor: WHITE,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        '&hover': {
            transition: '1s all ease-out',
            fontWeight: 'bold'
        }
    },
    btn: {
        '&:hover': {
            fontWeight: 700
        }
    },
    btnParent: {
        margin: props => !props.mediaMobile && '0 25px',
        '&hover': {
            fontWeight: 'bold'
        }
    },
}));

export default function Product(props) {
    const [hover, setHover] = useState(false);
    const currentUser = useContext(UserContext)
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const mediaMobile = useMediaQuery('(max-width:460px)');
    const classes = useStyles({mediaTablet, mediaMobile});
    const {t} = useTranslation()

    function clickHandler(id) {
        db.collection('product').doc(id).get().then(doc => {
            console.log(doc.data())
        })
    }

    return (
        <div>
            <div onClick={() => clickHandler(props.id)} className={classes.root} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className={classes.infoWithImage}>
                    <img className={classes.productImage} src={props.image} alt="got nothing yet :)"/>
                    <div className={classes.modelInfo}>
                        <div className={classes.productName}>{props.name}</div>
                        <div>{props.info}</div>
                        <div className={classes.price}>{props.price}$</div>
                    </div>
                </div>
                {hover && (<div className={classes.btnWrapper}>
                        <div style={{display: 'flex'}}>
                            <MyButton color={ORANGE} onClick={() => !currentUser && props.openModal(t('modalTitleForAddFavoriteItems'))}><FavoriteTwoToneIcon/></MyButton>
                        </div>
                        <div className={classes.btnParent}>
                            <MyButton color={ORANGE} className={classes.btn}>{t('addToCart')}</MyButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
