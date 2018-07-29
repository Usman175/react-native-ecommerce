import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { Share } from 'react-native';

import GeneralProductDetails from './GeneralProductDetails';

import { userCollectionRef, bookmarksCollectionRef } from '../../utilities/DBReferences';
import { numberWithCommas } from '../../utilities/Functions';

class GeneralProductDetailsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPhotoViewerVisible: false,
            clickedPhotoIndex: 0,

            //FireStore
            sellerData: {},

            //Bookmark
            isBookmarked: false,
            currentUserID: undefined
        };
    }

    componentWillMount() {
        const { ownerID, postID } = this.props;
        let userRef = userCollectionRef.doc(`${ownerID}`);

        //Seller Info
        userRef.get()
            .then((doc) => {
                const { firstName, lastName, ownerID, phoneNumber, gender, address, email, profileImageURL } = doc.data();
                const sellerData = {
                    firstName,
                    lastName,
                    ownerID,
                    phoneNumber,
                    gender,
                    address,
                    email,
                    profileImageURL
                }

                this.setState({
                    sellerData
                });
            }).catch((err) => {
                //
            });

        //UserInfo
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userID = `${user.phoneNumber}`; //Keep doc id as string.

                const userRef = userCollectionRef.doc(userID);
                /**
                 * Check if user already logged In with phone number and completed the sign-up form.
                 */
                userRef.get().then((doc) => {
                    if (doc.exists) {
                        this.setState({
                            currentUserID: userID
                        });

                        /**
                         * Update Bookmark Icon
                         */
                        const bookmarkRef = bookmarksCollectionRef.doc(`${postID}_${userID}`);
                        bookmarkRef.get()
                            .then((doc) => {
                                if (doc.exists) {
                                    this.setState({
                                        isBookmarked: true
                                    });
                                }
                            }).catch((err) => {
                                //
                            });
                    }
                }).catch((err) => {
                    this.setState({
                        currentUserID: undefined //if undefined then some error in fetching data
                    });
                });
            }
        });
    }

    showPhotoViewer = (index) => {
        this.setState({
            isPhotoViewerVisible: true,
            clickedPhotoIndex: index
        });
    }

    hidePhotoViewer = () => {
        this.setState({
            isPhotoViewerVisible: false
        });
    }

    photoViewerDataSource = () => {
        const { imageDataSource } = this.props;

        let modifiedDS = [];

        for (let obj of imageDataSource) {
            if (obj.url) {
                let modifiedObj = { source: { uri: obj.url } }
                modifiedDS.push(modifiedObj)
            }
        }

        return modifiedDS;
    }

    onPressSellerAvatar = () => {
        const { navigation, isNavigatedFromPublicProfile } = this.props;
        const { sellerData } = this.state;
        const { ownerID } = sellerData;

        if (!ownerID || isNavigatedFromPublicProfile) {
            return;
        }

        navigation.navigate('ProfilePublic', {
            sellerData: sellerData
        });
    }

    onPressShareButton = () => {
        const {
            thumbnailURL,
            title,
            price
        } = this.props;

        const link = new firebase.links.DynamicLink('https://innernepal.com?param1=foo&param2=bar', 'innernepal.page.link')
            .android.setPackageName('com.brickstudios.ecommerce')
            .ios.setBundleId('com.brickstudios.ecommerce')
            .social.setImageUrl(thumbnailURL)
            .social.setTitle(`Rs. ${numberWithCommas(price)}\n${title}`);

        firebase.links()
            .createShortDynamicLink(link, 'UNGUESSABLE')
            .then((url) => {
                console.log(url);
                Share.share({
                    message: 'Inner Nepal: Platform where you can buy and sell products.',
                    url: url,
                    title: 'Inner Nepal'
                });
            });
    }

    onPressBookmarkButton = () => {
        const { postID } = this.props;
        const { currentUserID } = this.state;

        if (currentUserID) {
            const userID = currentUserID;
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            let bookmarkData = {
                userID,
                postID,
                updatedAt: timestamp
            };

            const bookmarkRef = bookmarksCollectionRef.doc(`${postID}_${userID}`);
            bookmarkRef.get()
                .then((doc) => {
                    if (!doc.exists) {
                        bookmarkRef.set(bookmarkData).then(() => {
                            //Update Bookmark Icon
                            this.setState({
                                isBookmarked: true
                            });
                        }).catch((error) => {
                            //Don't show Bookmark Icon
                        });
                    } else {
                        //Delete the bookmark Doc
                        bookmarkRef.delete().then(() => {
                            //Update Bookmark Icon
                            this.setState({
                                isBookmarked: false
                            });
                        }).catch((error) => {
                            //Do Nothing
                        });
                    }
                }).catch((err) => {
                    //
                });
        }
    }

    render() {
        const {
            isPhotoViewerVisible,
            clickedPhotoIndex,
            sellerData,
            isBookmarked,
            currentUserID
        } = this.state;

        const {
            thumbnailURL,
            time,
            title,
            details,
            price,
            location,
            imageDataSource
        } = this.props;

        return (
            <GeneralProductDetails
                isPhotoViewerVisible={isPhotoViewerVisible}
                showPhotoViewer={this.showPhotoViewer}
                hidePhotoViewer={this.hidePhotoViewer}
                thumbnailURL={thumbnailURL}
                time={time}
                price={price}
                title={title}
                location={location}
                details={details}
                clickedPhotoIndex={clickedPhotoIndex}
                imageDataSource={imageDataSource} //PhotoView & Flatlist takes photo array in different format
                photoViewerDataSource={this.photoViewerDataSource()}
                onPressSellerAvatar={this.onPressSellerAvatar}
                onPressShareButton={this.onPressShareButton}
                onPressBookmarkButton={this.onPressBookmarkButton}
                //FireStore
                sellerData={sellerData}

                //Bookmark
                isBookmarked={isBookmarked}
                currentUserID={currentUserID}
            />
        );
    }
}

GeneralProductDetailsContainer.propTypes = {
    navigation: PropTypes.object,
    thumbnailURL: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    details: PropTypes.string,
    price: PropTypes.number,
    location: PropTypes.string,
    ownerID: PropTypes.string,
    postID: PropTypes.string,
    imageDataSource: PropTypes.array,
    isNavigatedFromPublicProfile: PropTypes.bool
};

export default GeneralProductDetailsContainer;
