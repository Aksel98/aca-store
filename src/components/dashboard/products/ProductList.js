import React, {useEffect, useState} from 'react';
import Product from './Product';
import uniqId from 'uniqid';
import {db} from '../../services/Firebase';
import {useLocation, useHistory} from 'react-router-dom';
import {makeStyles, useMediaQuery} from "@material-ui/core";
import ModalDialog from "../../main/modal/ModalDialog";
import {LOGIN_URL} from "../../api/Navigations";
import {useTranslation} from "react-i18next";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles(() => ({
    container: {
        margin: props => props ? '60px 30px 10px' : 10,
        display: props => props && 'flex',
    },
    productsParent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    products: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        marginLeft: 10
    },
    filters: {
        minWidth: 100,
        padding: props => !props && '0 10px',
    },
    subFilters: {
        display: props => !props && 'flex',
    },
    filterType: {
        padding: 10
    },
    filtersTitle: {
        fontSize: 19,
        fontWeight: 700,
        lineHeight: '30px',
        fontStyle: 'italic',
    },
    filtersSubtitle: {
        fontSize: 15,
        fontWeight: 500,
        lineHeight: '25px',
        fontStyle: 'italic',
    },
    orders: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0 0',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        padding: 10
    }
}))

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState([50, 1500]);
    const [nameFilter, setNameFilter] = useState('');
    const [orderBy, setOrderBy] = useState('asc');
    const [modal, setModal] = useState({open: false, title: '', text: ''});
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation()
    const media = useMediaQuery('(min-width:670px)');
    const classes = useStyles(media);

    useEffect(() => {
        getAllProductInfo();
    }, [priceFilter, nameFilter, orderBy]);

    function openModal(title, text) {
        setModal({open: true, title, text})
    }

    function getAllProductInfo() {
        try {
            const pathName = location.pathname.split('/')[2];
            db.collection('product')
                .where('device', '==', pathName)
                .where('price', '>', priceFilter[0])
                .where('price', '<', priceFilter[1])
                .orderBy('price', orderBy)
                .get().then(snapshot => {
                const tempArr = [];
                snapshot.docs.forEach(doc => {
                    let temp = doc.data();
                    tempArr.push({...temp, id: doc.id})
                })
                nameFilter ? setProducts(products.filter(product => product.model.includes(nameFilter))) : setProducts(tempArr);
            }).catch(err => console.log(err));
        } catch (e) {
            console.log("can not  get the docs:", e);
        }
    }

    function orderHandler(val) {
        setOrderBy(val)
    }

    function searchHandler(e) {
        setNameFilter(e.target.value)
    }

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.filters}>
                    <div className={classes.subFilters}>
                        <div className={classes.filterType}>
                            <div className={classes.filtersTitle}>{t('search')}</div>
                            <TextField value={nameFilter}
                                       onChange={searchHandler}
                                       autoComplete="on"/>
                        </div>
                        <div className={classes.filterType}>
                            <div className={classes.filtersTitle}>{t('orderBy')}</div>
                            <div onClick={() => orderHandler('asc')} className={classes.orders}>
                                {orderBy === 'asc' ? <CheckBoxIcon color="primary" cursor="pointer"/> :
                                    <CheckBoxOutlineBlankIcon color="primary" cursor="pointer"/>}
                                <div className={classes.filtersSubtitle}>{t('ascending')}</div>
                            </div>
                            <div onClick={() => orderHandler('desc')} className={classes.orders}>
                                {orderBy === 'desc' ? <CheckBoxIcon color="primary" cursor="pointer"/> :
                                    <CheckBoxOutlineBlankIcon color="primary" cursor="pointer"/>}
                                <div className={classes.filtersSubtitle}>{t('descending')}</div>
                            </div>
                        </div>
                        <div className={classes.filterType}>
                            <div className={classes.filtersTitle}>{t('price')}</div>
                            <Slider
                                min={50}
                                max={1000}
                                step={50}
                                value={priceFilter}
                                onChange={(e, val) => setPriceFilter(val)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                            />
                        </div>
                    </div>
                </div>
                    <div className={classes.productsParent}>
                        <div className={classes.products}>
                            {products.map((item) => (
                                <Product image={item.image}
                                         openModal={openModal}
                                         name={item.model}
                                         id={item.id}
                                         price={item.price}
                                         key={uniqId()}/>
                            ))}
                        </div>
                    </div>
                <ModalDialog open={modal.open}
                             title={modal.title}
                             text={modal.text}
                             doneButton={() => history.push(LOGIN_URL)}
                             doneButtonName={t('login')}
                             close={() => setModal({...modal, open: false})}/>
            </div>
        </div>
    )
}
