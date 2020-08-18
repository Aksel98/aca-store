import React from 'react';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { useEffect } from 'react';
import { db } from '../../services/firebase/Firebase';


const FavItems = () => {
    const favs = useSelector(state => state.favourites)
    const user = useSelector(state => state.user)
    console.log(user.uid)
    // useEffect(() => {
    //     try {

    //         const userDocRef = db.collection('users').doc(user.uid);
    //         userDocRef.get()
    //             .then((doc) => {
    //                 if (doc) {
    //                     if (doc.data().favourites.length) {
    //                         userDocRef.set({
    //                             favourites: [...doc.data().favourites, ...favs]
    //                         })

    //                         console.log(doc.data().favourites)
    //                     } else {
    //                         userDocRef.set({
    //                             favourites: [...favs]
    //                         });

    //                         console.log(doc.data().favourites)
    //                     }
    //                 }
    //             })



    //     } catch (e) {
    //         console.log('something wrong with adding favItems', e)
    //     }
    // })
    return (
        <div>
            {favs.length ? favs.map((item) => <div key={uniqid()}>{item}</div>) : 'you have no favourites yet'}
        </div>
    )
}

export default FavItems;
