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
import Loader from "../../main/Loader";

const useStyles = makeStyles(() => ({
    container: {
        margin: props => props.mediaTablet ? 10 : '60px 30px 10px',
        display: props => !props.mediaTablet && 'flex',
    },
    productsParent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    products: {
        height: props => props.mediaTablet ? (props.mediaMobile ? 414 : 454) : 665,
        overflow: 'auto',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        margin: props => props.mediaTablet ? 0 : '60px 0 0 10px',
    }
}))

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState([50, 1500]);
    const [nameFilter, setNameFilter] = useState('');
    const [orderBy, setOrderBy] = useState('asc');
    const [loader, setLoader] = useState(true);
    const [modal, setModal] = useState({open: false, title: '', text: ''});
    const history = useHistory();
    let {category} = useParams()
    const {t} = useTranslation()
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const mediaMobile = useMediaQuery('(max-width:475px)');
    const classes = useStyles({mediaTablet, mediaMobile});

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
                setLoader(false)
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
                    {loader ? <Loader/> : products.map((item) => (
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
