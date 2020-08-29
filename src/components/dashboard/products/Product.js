import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {BLACK, GREY, MyButton, ORANGE, WHITE} from '../../main/constants/constants';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useMediaQuery} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux';
import {addToFav, removeFromFav} from '../../services/redux/actions/favouriteActions';
import {addToBasket, removeFromBasket} from "../../services/redux/actions/basketAction";
import {TypeContext} from "../../main/contexts/typeContext";

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: props => props.mediaTablet ? (props.mediaMobile ? 135 : 200) : 205,
        height: props => props.mediaTablet ? (props.mediaMobile ? 215 : 235) : 300,
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
        width: props => props.mediaTablet ? '60%' : 140,
        height: props => props.mediaTablet ? 115 : 175
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
        marginBottom: 25,
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
        textDecoration: 'none',
        height: '100%',
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
        fontSize: 12,
        fontWeight: 700,
        '&:hover': {
            fontWeight: 800
        }
    },
    btnParent: {
        '&hover': {
            fontWeight: 'bold'
        }
    },
    favIconColor: {
        color: props => props.currentUser && props.liked ? ORANGE : GREY
    },
    deleteBtn: {
        width: 35,
        position: 'absolute'
    }
});

export default function Product(props) {
    const {device, images, name, id, price, openModal, openDeleteModal} = props
    const [hover, setHover] = useState(false);
    const basketItems = useSelector(state => state.basket)
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch();
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const mediaMobile = useMediaQuery('(max-width:475px)');
    const [liked, setLiked] = useState(false);
    const [btnText, setText] = useState('')
    const isAdmin = useContext(TypeContext)
    const classes = useStyles({mediaTablet, mediaMobile, currentUser, liked});
    const {t} = useTranslation()
    const favFromLocal = JSON.parse(localStorage.getItem('favourites'));

    useEffect(() => {
        currentUser && favFromLocal?.includes(id) ? setLiked(true) : setLiked(false)
    })

    useEffect(() => {
        const basketIds = basketItems.map(item => item.id)
        basketIds?.includes(id) ? setText(t('removeFromCart')) : setText(t('addToCart'));
    }, [basketItems])

    const favItemHandler = () => {
        if (!currentUser) {
            openModal(t('modalTitleForAddFavoriteItems'));
        }
        if (currentUser && !liked) {
            dispatch(addToFav(id, currentUser.uid));
            setLiked(!liked)
        } else if (currentUser && liked) {
            dispatch(removeFromFav(id, currentUser.uid));
            setLiked(!liked)
        }
    }

    function addOrRemove() {
        btnText === t('addToCart') ? dispatch(addToBasket(id, price, device)) : dispatch(removeFromBasket(id))
    }

    return (
        <div className={classes.root} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {isAdmin && <div onClick={() => openDeleteModal(true, id)} className={classes.deleteBtn}>
                <MyButton newcolor={ORANGE}><HighlightOffIcon/></MyButton>
            </div>}
            <Link to={`/categories/${device}/${id}`} className={classes.infoWithImage}>
                {images?.length && <img className={classes.productImage} src={images[0]} alt=""/>}
                <div className={classes.modelInfo}>
                    <div className={classes.productName}>{name}</div>
                    <div className={classes.price}>{numberFormat(price, '֏')}</div>
                </div>
            </Link>
            {hover && (<div className={classes.btnWrapper}>
                    <div style={{display: 'flex'}}>
                        <MyButton className={classes.favIconColor} onClick={() => favItemHandler()}>
                            <FavoriteTwoToneIcon/>
                        </MyButton>
                    </div>
                    <div className={classes.btnParent}>
                        <MyButton newcolor={ORANGE}
                                  className={classes.btn}
                                  onClick={addOrRemove}>{t(btnText)}</MyButton>
                    </div>
                </div>
            )}
        </div>
    )
}
