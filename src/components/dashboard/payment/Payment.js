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
import FormControl from '@material-ui/core/FormControl';
import {MyButton, ORANGE, BLUE} from "../../main/constants/constants";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {removeBasket, removeFromBasket} from "../../services/redux/actions/basketAction";
import {useTranslation} from "react-i18next";
import {getError, getSuccess} from "../../services/redux/actions/uiActions";
import {HOME_URL} from '../../main/constants/navigations';
import BackRouter from "../../main/BackRouter";
import {useHistory} from "react-router-dom";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        height: props => props.mediaTablet ? 'calc(100vh - 340px)' : 'calc(100vh - 280px)',
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
    shippingMethods: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    },
    paymentMethods: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    },
    shippingIcon: {
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
        margin: 2
    },
    confirmBtn: {
        width: "70%"
    },
    transfersInfoBlock: {
        textAlign: props => props.media && 'center',
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: '0 0 40px'
    },
    transfersInfoBtn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
})

export default function Payment() {
    const currentUser = useSelector(state => state.user);
    const [order, setOrder] = useState({country: '', city: '', address: '', zip: '', ship: '5000', pay: 'bank'});
    const [totalPrice, setTotalPrice] = useState(0);
    const basketItems = useSelector(state => state.basket);
    const dispatch = useDispatch()
    const media = useMediaQuery('(max-width:968px)');
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const classes = useStyles({media, mediaTablet});
    const location = useLocation()
    const history = useHistory();
    const {t} = useTranslation();
    const [error, setError] = useState({country: false, city: false, address: false, zip: false});

    useEffect(() => {
        setTotalPrice(location.state.amount + (location.state.amount / 100) + +order.ship)
    }, [order.ship, location.state.amount]);

    const handleDataChange = (e) => {
        const oldState = {...order};
        oldState[e.target.id] = e.target.value;
        setError({country: false, city: false, address: false, zip: false});
        setOrder({...oldState});
    }

    const handleRadioChange = (e) => {
        const {name, value} = e.target;
        setOrder({...order, [name]: value})
    }

    const confirmOrder = () => {
        try {
            if (order.address && order.city && order.country && order.zip) {
                db.collection('users').doc(currentUser.uid).get().then(user => {
                    let orders = []
                    if (user.data()?.orders) {
                        orders = [...user.data().orders]
                    }
                    orders.push({
                        email: currentUser.email,
                        price: totalPrice,
                        address: order.address + ',' + order.city + ',' + order.country + ',' + order.zip,
                        payment: order.pay,
                        id: currentUser.uid
                    })
                    db.collection('users').doc(currentUser.uid).set({
                        orders
                    }, {merge: true}).then(() => {
                        history.push(HOME_URL);
                        dispatch(getSuccess('Order received'));
                        dispatch(removeBasket())
                    }).catch(e => dispatch(getError(e.message)))
                })
            } else {
                setError({country: !order.country, city: !order.city, address: !order.address, zip: !order.zip});
                dispatch(getError('Invalid entries'))
            }
        } catch (err) {
            console.log(err)
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
            <div>{!basketItems ? 'you have 0 items in your cart' : basketItems.map((item, ind) =>
                <div key={uniqId()} className={classes.tableRow}>
                    {!media &&
                    <React.Fragment>
                        <span className={classes.collParam}>{item.device}</span>
                        <span className={classes.collParam}>{item.model}</span>
                        <span className={classes.collParam}>{item.quantity}</span>
                        <span className={classes.collParam}>{numberFormat(item.price, '֏')}</span>
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
                            <span className={classes.collParam}>{item.quantity}</span>
                        </div>
                        <div>
                            <div className={classes.tableRowTitle}>{t('price')}</div>
                            <span className={classes.collParam}>{item.price}</span>
                        </div>
                    </>}
                    <span className={classes.collParam}> {numberFormat(item.subtotal || item.price, ' ֏')}</span>
                    <span className={classes.collParam}>
                        <MyButton newcolor={ORANGE}
                                  variant="contained"
                                  onClick={() => dispatch(removeFromBasket(item.id))}>{t("remove")}</MyButton>
                    </span>
                </div>)}
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("subTotal")}</span>
                <span className={classes.tableRowItemValue}>{numberFormat(location.state.amount, ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("vat")} 1%</span>
                <span className={classes.tableRowItemValue}> {numberFormat(location.state.amount / 100, ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("shippingRate")}</span>
                <span className={classes.tableRowItemValue}>{numberFormat(+order.ship, ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>{t("total")}</span>
                <span className={classes.tableRowItemValue}> {numberFormat(totalPrice, ' ֏')}</span>
            </div>
            <div className={classes.methods}>
                <div className={classes.shippingMethods}>
                <span className={classes.shippingIcon}>
                <LocalShippingIcon/>
                <h2 className={classes.methodsTitle}>{t("shipping")} </h2>
                </span>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="shipping" id='ship' name="shipping" value={order.ship}
                                    onChange={handleRadioChange}>
                            <FormControlLabel name='ship' value="5000" control={<Radio color="primary"/>}
                                              label={t("standard") + ' 5,000 ֏'}/>
                            <FormControlLabel name='ship' value="10000" control={<Radio color="primary"/>}
                                              label={t("FedEx 2 day") + ' 10,000 ֏'}/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.paymentMethods}>
                <span className={classes.paymentIcon}>
                <AccountBalanceIcon/>
                <h2 className={classes.methodsTitle}>{t("payment")}</h2>
                </span>
                    <FormControl>
                        <RadioGroup aria-label="payment" value={order.pay} onChange={handleRadioChange}>
                            <FormControlLabel name='pay' value="bank" control={<Radio color="primary"/>}
                                              label={t("bankTransfer")}/>
                            <FormControlLabel name='pay' value="cash" control={<Radio color="primary"/>}
                                              label={t("cashOnDelivery")}/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className={classes.transfersInfo}>
                {order.pay === 'bank' && <div className={classes.transfersInfoBlock}>
                    <h2 className={classes.infoTitle}>{t("bankDetails")}</h2>
                    <p className={classes.infoText}>{t('bank')}: Ameria bank</p>
                    <p className={classes.infoText}>SWIFT / BIC: ARMIAM22</p>
                    <p className={classes.infoText}>a/c: 103002101576</p>
                    <p className={classes.infoText}>{t("address")}: 2 Vazgen Sargsyan Str., Yerevan, Republic of
                        Armenia</p>
                    <p className={classes.infoText}>{t('yourOrderWillShipAfterWeReceivePayment')}</p>
                </div>}
                {!media && <div className={classes.transfersInfoBtn}>
                    <MyButton className={classes.confirmBtn} newcolor={ORANGE} onClick={confirmOrder}
                              variant="contained">{t("confirmOrder")}</MyButton>
                </div>}
                <div className={classes.transfersInfoBlock}>
                    <h2 className={classes.infoTitle}>{t("shippingAddress")}</h2>
                    <FormControl error={error.country}>
                        <InputLabel htmlFor="name-native-error">{t('country')}</InputLabel>
                        <NativeSelect id="country" value={order.country} onChange={handleDataChange}>
                            <optgroup>
                                <option value=""/>
                                <option value={t("armenia")}>{t("armenia")}</option>
                                <option value={t("georgia")}>{t("georgia")}</option>
                                <option value={t("russia")}>{t("russia")}</option>
                                <option value={t("usa")}>{t("usa")}</option>
                            </optgroup>
                        </NativeSelect>
                    </FormControl>
                    <TextField required
                               id="city"
                               label={t("city")}
                               placeholder="eg. Yerevan"
                               onChange={handleDataChange}
                               value={order.city}
                               error={error.city}/>
                    <TextField required
                               id="address"
                               label={t("address")}
                               placeholder="Street address, company name"
                               onChange={handleDataChange}
                               value={order.address}
                               error={error.address}/>
                    <TextField required
                               id="zip"
                               label={t("zip")}
                               placeholder="eg. 1520"
                               onChange={handleDataChange}
                               value={order.zip}
                               error={error.zip}/>
                </div>
            </div>
            {media && <div className={classes.transfersInfoBtn}>
                <MyButton className={classes.confirmBtn} onClick={confirmOrder} newcolor={ORANGE}
                          variant="contained">{t("confirmOrder")}</MyButton>
            </div>}
        </div>
    )
}
