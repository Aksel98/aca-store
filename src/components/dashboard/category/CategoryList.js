import React from 'react';
import Category from './Category';
import uniqId from 'uniqid';
import {makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {WHITE} from "../../main/Styles";

const useStyles = makeStyles(() => ({
    categoryView: {
        backgroundColor: WHITE,
        padding: '80px 40px',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        justifyContent: 'space-around'
    },

}))

export default function CategoryList(props) {
    const classes = useStyles();

    return (
        <div className={classes.categoryView}>{
            props.category.map((item) => {
                    return (<Link to={{pathname: `/${item.name}`}}
                                  key={uniqId()}
                                  style={{textDecoration: 'none', margin: '5px', marginTop: '10px'}}>
                            <Category key={uniqId()} name={item.name} image={item.image}/>
                        </Link>
                    )
                }
            )
        }
        </div>
    )
}
