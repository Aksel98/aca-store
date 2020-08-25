import React, {useEffect, useState,} from 'react';
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import uniqId from 'uniqid';
import {db} from "../../services/firebase/Firebase";
import TextField from '@material-ui/core/TextField';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {MyButton, ORANGE, BLUE} from "../../main/constants/constants";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {removeFromBasket} from "../../services/redux/actions/basketAction";
import {useTranslation} from "react-i18next";
import {getError} from "../../services/redux/actions/uiActions";
import BackRouter from "../../main/BackRouter";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        height:  props => props.mediaTablet ? 'calc(100vh - 310px)' : 'calc(100vh - 280px)',
        overflow: 'auto',
        margin: props => props.mediaTablet ? "50px 0" : "105px 0",
        padding: "10 20px",
    },
    confirmIconBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: ORANGE,
    },
    confirmIconText: {
        fontSize: "20px"
    },
    tableRow: {
        display: props => !props.media && "flex",
        justifyContent: "space-around",
        borderBottom: `1px solid ${ORANGE}`,
        textAlign: "center",
        padding: '5px 0'
    },
    tableRowTitle: {
        display: "flex",
        justifyContent: "center",
        width: props => !props.media && "100%",
        color: ORANGE,
        fontSize: "16px",
        borderRight: `1px dotted ${ORANGE}`,
        borderLeft: `1px dotted ${BLUE}`,
        borderTop: `1px solid ${ORANGE}`,
    },
    collParam: {
        display: "flex",
        justifyContent: "center",
        width: props => !props.media && "100%",
        color: "grey",
        fontWeight: "900",
        fontSize: "16px",
        borderRight: `1px dotted ${ORANGE}`,
        borderLeft: `1px dotted ${BLUE}`,
        padding: "10px 5px"
    },

    tableRowItemName: {
        width: "100%",
        textAlign: "end",
        fontWeight: 900,
        padding: "10px 5px"
    },
    tableRowItemValue: {
        width: "50%",
        textAlign: "end",
        fontWeight: 900,
        padding: "10px 5px"
    },
    methods: {
        display: props => !props.media && "flex",
        justifyContent: "center",
        padding: "20px"
    },
    shippingMetods: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    },
    paymentMetods: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    },
    shippingIcom: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: ORANGE,
    },
    paymentIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: ORANGE,
    },
    methodsTitle: {
        paddingLeft: "5px"
    },
    transfersInfo: {
        display: props => !props.media && "flex",
        margin: 20
    },
    infoTitle: {
        color: ORANGE,
        margin: 0
    },
    infoText: {
        margin: "0px"
    },
    confirmBtn: {
        width: "70%"
    },
    transfersInfoblock: {
        textAlign: props => props.media && 'center',
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: '0 0 40px'
    },
    transfersInfobtn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
})

export default function Payment() {
    const currentUser = useSelector(state => state.user);
    const [order, setOrder] = useState({
        city: '',
        address: '',
        zip: '',
        ship: '',
        pay: '',
        orderItems: [],
        id: currentUser.uid
    });
    const [chosenItems, setChosenItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const basketItems = useSelector(state => state.basket);
    const dispatch = useDispatch()
    const media = useMediaQuery('(max-width:968px)');
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const classes = useStyles({media, mediaTablet});
    const location = useLocation()
    const [finalPrice, setFinalPrice] = useState(subTotal * 1.2 || 0)
    const {t} = useTranslation()


    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        setSubTotal(chosenItems.map((item, ind) => {
            return item.price * location.state.quantity[ind]
        }).reduce((acc, Value) => (acc + Value), 0));

        const orderItems = [...chosenItems];
        setOrder({...order, orderItems: orderItems})
        setFinalPrice(subTotal * 1.2 + order.ship * 1)
    }, [chosenItems, order.ship, order.bank])

    const getCartItems = () => {
        const basketIds = basketItems.map(item => item.id)
        if (basketIds.length) {
            try {
                db.collection('product').where('id', 'in', basketIds).get().then(querySnapshot => {
                    const tempArr = [];
                    querySnapshot.docs.forEach(doc => {
                        let tempObj = doc.data();
                        tempArr.push({...tempObj});
                    })
                    setChosenItems(tempArr);
                }).catch(err => dispatch(getError(err.message)));
            } catch (e) {
                console.log(e);
            }
        }
    }

    const handleDataChange = (e) => {
        const oldState = {...order};
        oldState[e.target.id] = e.target.value;
        setOrder({...oldState})
    }

    const handleRadioChange = (e) => {
        const {name, value} = e.target;
        setOrder({...order, [name]: value})
    }

    const removeItem = (id) => {
        let tempArr = [...chosenItems];
        tempArr = tempArr.filter(objItem => (objItem.id !== id))
        setChosenItems(tempArr);
        dispatch(removeFromBasket(id))
    }
    const confirmOrder = () => {
        try {
            db.collection('users').doc(currentUser.uid).set({
                order: {
                    items: order.orderItems,
                    price: finalPrice,
                    address: order.address + ', ' + order.city + ', ' + order.country + ', ' + order.zip,
                    shipping: order.ship,
                    payment: order.pay,
                    id: order.id
                }
            }, {merge: true})
                .then(() => console.log('order received'))
        } catch (error) {
            console.log('could not finalize the order')
        }
    }
    return (
        <div className={classes.container}>
            <BackRouter/>
            <div className={classes.confirmIconBlock}>
                <ConfirmationNumberOutlinedIcon/>
                <h1 className={classes.confirmIconText}>{t("confirmOrder")}</h1>
            </div>
            {!media && <div className={classes.tableRow}>
                <h2 className={classes.tableRowTitle}>{t('productName')}</h2>
                <h2 className={classes.tableRowTitle}>{t('model')}</h2>
                <h2 className={classes.tableRowTitle}>{t('quantity')}</h2>
                <h2 className={classes.tableRowTitle}>{t('price')}</h2>
                <h2 className={classes.tableRowTitle}>{t('total')}</h2>
                <h2 className={classes.tableRowTitle}>{t('action')}</h2>
            </div>}
            <div>{!basketItems ? 'you have 0 items in your cart' : chosenItems.map((item, ind) =>
                <div key={uniqId} className={classes.tableRow}>
                    {!media &&
                    <React.Fragment>
                        <span className={classes.collParam}> {item.model}</span>
                        <span className={classes.collParam}> {location.state.quantity[ind]} </span>
                        <span className={classes.collParam}> {numberFormat(item.price, ' ֏')}</span>
                    </React.Fragment>}
                    {media && <>
                        <div>
                            <div className={classes.tableRowTitle}>{t('productName')}</div>
                            <span className={classes.collParam}>{item.device}</span>
                        </div>
                        <div>
                            <div className={classes.tableRowTitle}>{t('model')}</div>
                            <span className={classes.collParam}>{item.model}</span>
                        </div>
                        <div>
                            <div className={classes.tableRowTitle}>{t('quantity')}</div>
                            <span className={classes.collParam}>{location.state.quantity[ind]}</span>
                        </div>
                        <div>
                            <div className={classes.tableRowTitle}>{t('price')}</div>
                            <span className={classes.collParam}>{item.price}</span>
                        </div>
                    </>}
                    <span className={classes.collParam}> {numberFormat(subTotal, ' ֏')}</span>
                    <span className={classes.collParam}> <MyButton onClick={() => removeItem(item.id)}
                                                                   newcolor={ORANGE}
                                                                   variant="contained">{t("remove")}</MyButton></span>
                </div>)}
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("subTotal")}</span>
                <span className={classes.tableRowItemValue}>{numberFormat(subTotal, ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("vat 20%")}</span>
                <span className={classes.tableRowItemValue}> {numberFormat(subTotal * 0.2, ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("shippingRate")}</span>
                <span className={classes.tableRowItemValue}>{numberFormat(+order.ship, ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("total")}</span>
                <span
                    className={classes.tableRowItemValue}> {numberFormat(finalPrice, ' ֏')}</span>
            </div>
            <div className={classes.methods}>
                <div className={classes.shippingMetods}>
                <span className={classes.shippingIcom}>
                <LocalShippingIcon/>
                <h2 className={classes.methodsTitle}>{t("shipping")} </h2>
                </span>
                    <FormControl component="fieldset">

                        <RadioGroup aria-label="shipping" id='ship' name="shipping" value={order.ship}
                                    onChange={handleRadioChange}>
                            <FormControlLabel name='ship' value="5000" control={<Radio color="primary"/>}
                                              label={t("standart 5,000 ֏")}/>
                            <FormControlLabel name='ship' value="10000" control={<Radio color="primary"/>}
                                              label={t("FedEx 2 day  10,000 ֏")}/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.paymentMetods}>
                <span className={classes.paymentIcon}>
                <AccountBalanceIcon/>
                <h2 className={classes.methodsTitle}>{t("payment")}</h2>
                </span>
                    <FormControl>
                        <RadioGroup aria-label="payment" value={order.pay}
                                    onChange={handleRadioChange}>
                            <FormControlLabel name='pay' value="bank" control={<Radio color="primary"/>}
                                              label={t("bankTransfer")}/>
                            <FormControlLabel name='pay' value="cash" control={<Radio color="primary"/>}
                                              label={t("cashOnDelivery")}/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className={classes.transfersInfo}>
                {order.pay === 'bank' && <div className={classes.transfersInfoblock}>
                    <h2 className={classes.infoTitle}>{t("bankDetails")}</h2>
                    <p className={classes.infoText}>{t('bank')}: Ameriabank</p>
                    <p className={classes.infoText}>SWIFT / BIC: ARMIAM22</p>
                    <p className={classes.infoText}>a/c: 103002101576</p>
                    <p className={classes.infoText}>{t("address")}: 2 Vazgen Sargsyan Str., Yerevan, Republic of
                        Armenia</p>
                    <p className={classes.infoText}>{t('yourOrderWillShipAfterWeReceivePayment')}</p>
                </div>}
                {!media && <div className={classes.transfersInfobtn}>
                    <MyButton className={classes.confirmBtn} newcolor={ORANGE}
                              variant="contained">{t("confirmOrder")}</MyButton>
                </div>}
                <div className={classes.transfersInfoblock}>
                    <h2 className={classes.infoTitle}>{t("shippingAddress")}</h2>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="country-native-required">{t("country")}</InputLabel>
                        <Select
                            native
                            id='country'
                            onChange={handleDataChange}>
                            <option aria-label="None" value={order.country}/>
                            <option id="country">{t("armenia")}</option>
                            <option id="country">{t("georgia")}</option>
                            <option id="country">{t("iran")}</option>
                            <option id="country">{t("russia")}</option>
                            <option id="country">{t("usa")}</option>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="city"
                        label={t("city")}
                        placeholder="eg. Yerevan"
                        onChange={handleDataChange}
                        value={order.city}/>
                    <TextField
                        required
                        id="address"
                        label={t("address")}
                        placeholder="Street address, company name"
                        onChange={handleDataChange}
                        value={order.address}/>
                    <TextField
                        required
                        id="zip"
                        label={t("zip")}
                        placeholder="eg. 1520"
                        onChange={handleDataChange}
                        value={order.zip}/>
                </div>
            </div>
            {media && <div className={classes.transfersInfobtn}>
                <MyButton className={classes.confirmBtn} onClick={confirmOrder} newcolor={ORANGE}
                          variant="contained">{t("confirmOrder")}</MyButton>
            </div>}
        </div>
    )
}
