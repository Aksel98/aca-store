import React, {useEffect, useState} from 'react';
import Product from './Product';
import uniqId from 'uniqid';
import {db} from '../../services/firebase/Firebase';
import {useHistory, useParams} from 'react-router-dom';
import {makeStyles, useMediaQuery} from "@material-ui/core";
import ModalDialog from "../../main/modal/ModalDialog";
import {LOGIN_URL} from "../../services/api/Navigations";
import {useTranslation} from "react-i18next";
import Filters from "./Filters";

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
    }
}))

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState([50, 1500]);
    const [nameFilter, setNameFilter] = useState('');
    const [orderBy, setOrderBy] = useState('asc');
    const [modal, setModal] = useState({open: false, title: '', text: ''});
    const history = useHistory();
    let {category} = useParams()
    const {t} = useTranslation()
    const media = useMediaQuery('(min-width:670px)');
    const classes = useStyles(media);

    useEffect(() => {
        getAllProductInfo();
    }, [priceFilter, nameFilter, orderBy]);

    function getAllProductInfo() {
        try {
            db.collection('product')
                .where('device', '==', category)
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

    function openModal(title, text) {
        setModal({open: true, title, text})
    }

    function orderHandler(val) {
        setOrderBy(val)
    }

    function searchHandler(e) {
        setNameFilter(e.target.value)
    }

    function priceHandler(e, val) {
        setPriceFilter(val)
    }

    return (
        <div className={classes.container}>
            <Filters name={nameFilter}
                     orderBy={orderBy}
                     price={priceFilter}
                     onSearch={searchHandler}
                     onOrder={orderHandler}
                     onPrice={priceHandler}/>
            <div className={classes.productsParent}>
                <div className={classes.products}>
                    {products.map((item) => (
                        <Product openModal={openModal}
                                 device={item.device}
                                 image={item.image}
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
    )
}
