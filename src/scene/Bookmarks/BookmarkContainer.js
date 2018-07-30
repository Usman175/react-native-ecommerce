import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import Bookmark from './Bookmark';

import {
    bookmarksCollectionRef,
    postCollectionRef
} from '../../utilities/DBReferences';

class BookmarkContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sellerAdsList: [],
            isFetchingAdsDataFromFirestore: false
        }
    }

    async componentWillMount() {
        const { userID } = this.props;

        this.setState({
            isFetchingAdsDataFromFirestore: true
        });

        // const { sellerAdsList } = this.state;
        let bookmarkedList = [];

        //For order by issue refer this discussion : https://github.com/invertase/react-native-firebase/issues/568
        await bookmarksCollectionRef.where('userID', '==', userID).orderBy('updatedAt', 'desc').get()
            .then((snapshot) => {
                let dSArray = [];
                snapshot.forEach((doc) => {
                    //const mergedObj = { ...doc.data(), ...{ postID: doc.id } };
                    dSArray.push(doc.data());
                });
                bookmarkedList = dSArray;
            })
            .catch((err) => {
                //console.log('Error getting documents', err);
                this.setState({
                    isFetchingAdsDataFromFirestore: false
                });
            });

        const getFunction = async (transaction) => {
            let transactionGetArray = [];

            for (let obj of bookmarkedList) {
                transactionGetArray.push(transaction.get(postCollectionRef.doc(`${obj.postID}`)));
            }

            await Promise.all(transactionGetArray)
                .then((result) => {
                    let a = []

                    for (let obj of result) {
                        if (obj) {
                            a.push(obj._data);
                        }
                    }

                    this.setState({
                        sellerAdsList: a,
                        isFetchingAdsDataFromFirestore: false
                    });

                })
                .catch((error) => {
                    console.log("Transaction failed: ", error);

                    this.setState({
                        isFetchingAdsDataFromFirestore: false
                    });
                });
        }

        // run the transaction
        firebase.firestore()
            .runTransaction(getFunction)
            .then((result) => {
                console.log("Transaction successfully committed!");
            })
            .catch((error) => {
                console.log("Transaction failed: ", error);
            });
    }

    onPressUpdatePhotos = (item) => {
        const { navigation } = this.props;
        const {
            ownerID,
            postID
        } = item;

        navigation.navigate('UpdateAdPhotos', {
            item,
            postID,
            ownerID
        });
    }

    onPressEditAdDetails = (item) => {
        const { navigation } = this.props;
        const {
            ownerID,
            postID
        } = item;

        navigation.navigate('UpdateAdDetails', {
            postItem: item,
            postID,
            userID: ownerID,
            isForUpdatingAd: true
        });
    }

    //Note: onDelete also delete bookmarked post doc.

    render() {
        const { sellerAdsList, isFetchingAdsDataFromFirestore } = this.state;
        const { navigation } = this.props;
        // console.log(sellerAdsList);
        return (
            <Bookmark
                sellerAdsList={sellerAdsList}
                isFetchingAdsDataFromFirestore={isFetchingAdsDataFromFirestore}
                onPressAdsCard={this.onPressAdsCard}
                onPressUpdatePhotos={this.onPressUpdatePhotos}
                onPressEditAdDetails={this.onPressEditAdDetails}
                navigation={navigation}
            />
        );
    }
}

BookmarkContainer.propTypes = {
    navigation: PropTypes.object,
    sellerData: PropTypes.object,
    userID: PropTypes.string
};

export default BookmarkContainer;
