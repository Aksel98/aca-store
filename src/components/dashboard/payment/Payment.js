import React, {useEffect, useState,} from 'react';
import {useHistory, useLocation} from "react-router-dom";
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
import FormLabel from '@material-ui/core/FormLabel';
import {MyButton, ORANGE, BLUE} from "../../main/constants/Constants";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {removeFromBasket} from "../../services/redux/actions/basketAction";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        margin: props => props ? "60px 20px" : "60px 40px",
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
        display: props => !props && "flex",
        justifyContent: "space-around",
        borderBottom: `1px solid ${ORANGE}`,
        textAlign: "center",
    },
    tableRowTitle: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        color: ORANGE,
        fontSize: "16px",
        borderRight: `1px dotted ${ORANGE}`,
        borderLeft: `1px dotted ${BLUE}`,
        borderTop: `1px solid ${ORANGE}`,
    },
    collParam: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
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
        display: props => !props && "flex",
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
        display: props => !props && "flex",
        margin: "20px 0px"
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
        textAlign: props => props && 'center',
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
    const [order, setOrder] = useState({city: '', address: '', zip: '', ship: '', pay: '', orderItems: []});
    const [chosenItems, setChosenItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const basketItems = useSelector(state => state.basket);
    const dispatch = useDispatch()
    const media = useMediaQuery('(max-width:968px)');
    const classes = useStyles(media);
    const location = useLocation()
    const history = useHistory();

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        setSubTotal(chosenItems.map((item, ind) => {
            return item.price * location.state.quantity[ind]
        }).reduce((acc, Value) => (acc + Value), 0))
    }, [chosenItems])

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
                }).catch(err => console.log('error making basket info query', err));
            } catch (e) {
                console.log("can not  get basket items:", e);
            }
        }
    }

    const handleDataChange = (e) => {
        const oldState = {...order};
        oldState[e.target.id] = e.target.value;
        console.log(e.target.value)
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

    return (
        <div className={classes.container}>
            <div onClick={() => history.goBack()} className={classes.backIcon}>
                <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
            </div>
            <div className={classes.confirmIconBlock}>
                <ConfirmationNumberOutlinedIcon/>
                <h1 className={classes.confirmIconText}>CONFIRM YOUR ORDER</h1>
            </div>
            {!media && <div className={classes.tableRow}>
                <h2 className={classes.tableRowTitle}>Product Name</h2>
                <h2 className={classes.tableRowTitle}>Model</h2>
                <h2 className={classes.tableRowTitle}>Quantity</h2>
                <h2 className={classes.tableRowTitle}>Price</h2>
                <h2 className={classes.tableRowTitle}>Total</h2>
                <h2 className={classes.tableRowTitle}>Action</h2>
            </div>}
            <div>{!basketItems ? 'you have 0 items in your cart' : chosenItems.map((item, ind) =>
                <div key={uniqId} className={classes.tableRow}>
                    {media && <div className={classes.tableRowTitle}>Product Name</div>}
                    <span className={classes.collParam}> {item.device}</span>
                    {media && <div className={classes.tableRowTitle}>Model</div>}
                    <span className={classes.collParam}> {item.model}</span>
                    {media && <div className={classes.tableRowTitle}>Quantity</div>}
                    <span className={classes.collParam}> {location.state.quantity[ind]} </span>
                    {media && <div className={classes.tableRowTitle}>Price</div>}
                    <span className={classes.collParam}> {numberFormat(Math.ceil(item.price), ' ֏')}</span>
                    {media && <div className={classes.tableRowTitle}>Total</div>}
                    <span
                        className={classes.collParam}> {numberFormat(Math.ceil(item.price * location.state.quantity[ind]), ' ֏')}</span>
                    <span className={classes.collParam}> <MyButton onClick={() => removeItem(item.id)}
                                                                   newcolor={ORANGE}
                                                                   variant="contained">Remove</MyButton></span>
                </div>)}
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>Sub-Total</span>
                <span className={classes.tableRowItemValue}>{numberFormat(Math.ceil(subTotal), ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>VAT 20%</span>
                <span className={classes.tableRowItemValue}> {numberFormat(Math.ceil(subTotal * 0.2), ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>Sipping Rate</span>
                <span className={classes.tableRowItemValue}>{numberFormat(Math.ceil(+order.ship), ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>Total</span>
                <span
                    className={classes.tableRowItemValue}> {numberFormat(Math.ceil(+order.ship + subTotal * 1.2), ' ֏')}</span>
            </div>
            <div className={classes.methods}>
                <div className={classes.shippingMetods}>
                    <span className={classes.shippingIcom}>
                        <LocalShippingIcon/>
                        <h2 className={classes.methodsTitle}>SHIPPING METHOD</h2>
                    </span>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Shipping rate</FormLabel>
                        <RadioGroup aria-label="shipping" id='ship' name="shipping" value={order.ship}
                                    onChange={handleRadioChange}>
                            <FormControlLabel name='ship' value="5000" control={<Radio color="primary"/>}
                                              label="Standart 5,000 ֏"/>
                            <FormControlLabel name='ship' value="10000" control={<Radio color="primary"/>}
                                              label="FedEx 2 day  10,000 ֏"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.paymentMetods}>
                    <span className={classes.paymentIcon}>
                        <AccountBalanceIcon/>
                        <h2 className={classes.methodsTitle}>PAYMENT METHOD</h2>
                    </span>
                    <FormControl>
                        <RadioGroup aria-label="payment" value={order.pay}
                                    onChange={handleRadioChange}>
                            <FormControlLabel name='pay' value="bank" control={<Radio color="primary"/>}
                                              label="Bank Transfer"/>
                            <FormControlLabel name='pay' value="cash" control={<Radio color="primary"/>}
                                              label="Cash on delivery"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className={classes.transfersInfo}>
                {order.pay === 'bank' && <div className={classes.transfersInfoblock}>
                    <h2 className={classes.infoTitle}>BANK TRANSFER INSTRUCTIONS</h2>
                    <p className={classes.infoText}>Bank Name: Ameriabank</p>
                    <p className={classes.infoText}>SWIFT / BIC: ARMIAM22</p>
                    <p className={classes.infoText}>a/c: 103002101576</p>
                    <p className={classes.infoText}>Addres: 2 Vazgen Sargsyan Str., Yerevan, Republic of Armenia</p>
                    <p className={classes.infoText}>Your Order will not ship until we receive payment.</p>
                </div>}
                {!media && <div className={classes.transfersInfobtn}>
                    <MyButton className={classes.confirmBtn} newcolor={ORANGE} variant="contained">Confirm
                        order</MyButton>
                </div>}
                <div className={classes.transfersInfoblock}>
                    <h2 className={classes.infoTitle}>SHIPPING ADDRESS</h2>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="country-native-required">Country</InputLabel>
                        <Select
                            id='country'
                            onChange={handleDataChange}>
                            <option aria-label="None" value={order.country}/>
                            <option id="country">Armenia</option>
                            <option id="country">Georgia</option>
                            <option id="country">Iran</option>
                            <option id="country">Russia</option>
                            <option id="country">United States</option>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="city"
                        label="City"
                        placeholder="eg. Yerevan"
                        onChange={handleDataChange}
                        value={order.city}/>
                    <TextField
                        required
                        id="address"
                        label="Address"
                        placeholder="Street address, company name"
                        onChange={handleDataChange}
                        value={order.address}/>
                    <TextField
                        required
                        id="zip"
                        label="Zip"
                        placeholder="eg. 1520"
                        onChange={handleDataChange}
                        value={order.zip}/>
                </div>
            </div>
            {media && <div className={classes.transfersInfobtn}>
                <MyButton className={classes.confirmBtn} newcolor={ORANGE} variant="contained">Confirm order</MyButton>
            </div>}
        </div>
    )
}
