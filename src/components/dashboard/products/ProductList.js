import React, {useContext, useEffect, useState} from 'react';
import Product from './Product';
import uniqId from 'uniqid';
import {db} from '../../services/firebase/Firebase';
import {useHistory, useParams} from 'react-router-dom';
import {makeStyles, useMediaQuery} from "@material-ui/core";
import ModalDialog from "../../main/popups/ModalDialog";
import {LOGIN_URL} from "../../main/constants/navigations";
import {useTranslation} from "react-i18next";
import Filters from "./Filters";
import Loader from "../../main/loader/Loader";
import {BLUE, MyButton} from "../../main/constants/constants";
import Pagination from '@material-ui/lab/Pagination';
import ProductsListAdmin from "./ProductsListAdmin";
import {getError} from "../../services/redux/actions/uiActions";
import {useDispatch} from "react-redux";
import {TypeContext} from "../../main/contexts/typeContext";
import BackRouter from "../../main/BackRouter";

const useStyles = makeStyles(() => ({
    container: {
        margin: props => props.mediaTablet ? 10 : '60px 30px 10px',
        display: props => !props.mediaTablet && 'flex',
    },
    productsParent: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    products: {
        height: props => props.mediaTablet ? (props.mediaMobile ? 'calc(100vh - 560px)' : 'calc(100vh - 530px)') : 'calc(100vh - 320px)',
        margin: props => props.mediaTablet ? 0 : '20px 0 0',
        overflow: 'auto',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
    },
    btnParent: {
        display: 'flex',
        justifyContent: 'center',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    },
    nothingFound: {
        color: BLUE
    },
    backIcon: {
        position: 'absolute',
        left: 20
    }
}))

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState([0, 1000000]);
    const [nameFilter, setNameFilter] = useState('');
    const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') || 'asc');
    const [loader, setLoader] = useState(true);
    const [modal, setModal] = useState({open: false, title: '', text: ''});
    const [deleteModal, setDeleteModal] = useState({open: false, id: 'null'});
    const [addDeviceModal, setAddDeviceModal] = useState(false);
    const [newDevice, setNewDevice] = useState(false);
    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(0)
    const [limit] = useState(6)
    const isAdmin = useContext(TypeContext)
    const dispatch = useDispatch()
    const history = useHistory();
    let {category} = useParams()
    const {t} = useTranslation()
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const mediaMobile = useMediaQuery('(max-width:475px)');
    const classes = useStyles({mediaTablet, mediaMobile});

    useEffect(() => {
        getAllProductInfo();
    }, [priceFilter, nameFilter, orderBy, page, newDevice]);

    function getAllProductInfo() {
        try {
            db.collection('product')
                .where('device', '==', category)
                .orderBy('price', orderBy)
                .get().then(snap => {
                if (snap.docs.length) {
                    const startAt = snap.docs[page === 1 ? 0 : (page - 1) * limit];
                    setPaginationSize(Math.ceil(snap.docs.length / limit))
                    db.collection('product')
                        .where('device', '==', category)
                        .orderBy('price', orderBy)
                        .where('price', '<', priceFilter[1])
                        .where('price', '>', priceFilter[0])
                        .limit(limit)
                        .startAt(startAt)
                        .get().then(snapshot => {
                        const tempArr = [];
                        snapshot.docs.forEach(doc => {
                            let temp = doc.data();
                            tempArr.push({...temp, id: doc.id})
                        })
                        nameFilter ? setProducts(products.filter(product => product.model.includes(nameFilter))) : setProducts(tempArr);
                        setLoader(false)
                    })
                } else {
                    setLoader(false)
                }
            }).catch(err => dispatch(getError(err.message)));
        } catch (e) {
            console.log(e);
        }
        setNewDevice(false)
    }

    const changePagination = (event, value) => {
        setLoader(true)
        setPage(value);
    };

    function openModal(title, text) {
        setModal({open: true, title, text})
    }

    function openDeleteModal(val, id) {
        setDeleteModal({open: val, id})
    }

    function orderHandler(val) {
        setOrderBy(val)
        localStorage.setItem('orderBy', val)
    }

    function searchHandler(e) {
        setNameFilter(e.target.value)
    }

    function priceHandler(e, val) {
        setPriceFilter(val)
    }

    function openPopup() {
        setAddDeviceModal(true)
    }

    return (
        <div className={classes.container}>
            <BackRouter/>
            <Filters name={nameFilter}
                     orderBy={orderBy}
                     price={priceFilter}
                     onSearch={searchHandler}
                     onOrder={orderHandler}
                     onPrice={priceHandler}/>
            <div className={classes.productsParent}>
                {loader ? <Loader/> : <div>
                    {isAdmin && <div onClick={openPopup} className={classes.btnParent}>
                        <MyButton color="primary" maxwidth="75%" variant="contained">{t('addDevice')}</MyButton>
                    </div>}
                    <div className={classes.products}>
                        {products.length ? products.map((item) => (
                            <Product openModal={openModal}
                                     openDeleteModal={openDeleteModal}
                                     device={item.device}
                                     images={item.images}
                                     name={item.model}
                                     id={item.id}
                                     price={item.price}
                                     key={uniqId()}/>
                        )) : <h1 className={classes.nothingFound}>{t('nothingIsFound')}</h1>}
                    </div>
                    <div className={classes.pagination}>
                        <Pagination count={paginationSize} page={page} onChange={changePagination} color="primary"/>
                    </div>
                </div>
                }
            </div>
            <ModalDialog open={modal.open}
                         title={modal.title}
                         text={modal.text}
                         doneButton={() => history.push(LOGIN_URL)}
                         doneButtonName={t('login')}
                         close={() => setModal({...modal, open: false})}/>
            <ProductsListAdmin open={addDeviceModal}
                               isOpen={setAddDeviceModal}
                               setNewDevice={setNewDevice}
                               deleteModal={deleteModal}
                               openDeleteModal={openDeleteModal}/>
        </div>
    )
}
