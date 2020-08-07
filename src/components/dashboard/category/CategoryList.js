import React from 'react';
import Category from './Category';
import uniqId from 'uniqid';
import {makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    categoryView: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '10%',
        marginBottom: '5%',
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
