import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import EditUserAd from './EditUserAd';

import { postCollectionRef } from '../../utilities/DBReferences';

class EditUserAdContainer extends Component {
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

        const { sellerAdsList } = this.state;
        let copySellerAdsList = [...sellerAdsList];

        //For order by issue refer this discussion : https://github.com/invertase/react-native-firebase/issues/568
        await postCollectionRef.where('ownerID', '==', userID).orderBy('updatedAt', 'desc').get()
            .then((snapshot) => {
                let dSArray = [];
                snapshot.forEach((doc) => {
                    const mergedObj = { ...doc.data(), ...{ postID: doc.id } };
                    dSArray.push(mergedObj);
                });
                copySellerAdsList = [...copySellerAdsList, ...dSArray];
            })
            .catch((err) => {
                //console.log('Error getting documents', err);
                this.setState({
                    isFetchingAdsDataFromFirestore: false
                });
            });

        this.setState({
            sellerAdsList: copySellerAdsList,
            isFetchingAdsDataFromFirestore: false
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

        return (
            <EditUserAd
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

EditUserAdContainer.propTypes = {
    navigation: PropTypes.object,
    sellerData: PropTypes.object,
    userID: PropTypes.string
};

export default EditUserAdContainer;
