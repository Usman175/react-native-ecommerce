import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Moment from 'moment';

import styles from './styles';
import Color from '../../styles/Color';

import { FeedsCard } from '../../component/FeedsCard';

class Bookmark extends Component {

    keyExtractor = (item, index) => index.toString();

    renderItemCard = ({ item }) => {
        const { onPressUpdatePhotos, onPressEditAdDetails, navigation } = this.props;
        if(!item){
            return
        }

        const {
            updatedAt,
            productPrice,
            productTitle,
            productDescription,
            selectedLocation,
            ownerID,
            postID,
            //Images
            image_0,
            image_1,
            image_2,
            image_3,
            image_4,
            image_5,
            image_6,
            image_7
        } = item;
        let formatedDate = '';

        if (updatedAt) {
            Moment.locale('en');
            //formatedDate = Moment(updatedAt).format("Do-MMM-YYYY");
            formatedDate = Moment(updatedAt).fromNow();
        }

        const imageDataSource = [
            // { url: coverImageURL, index: 0 },
            { url: image_1, index: 1 },
            { url: image_2, index: 2 },
            { url: image_3, index: 3 },
            { url: image_4, index: 4 },
            { url: image_5, index: 5 },
            { url: image_6, index: 6 },
            { url: image_7, index: 7 }
        ];
        const filteredImageDataSource = [];

        for (const obj of imageDataSource) {
            if (obj && obj.url) {
                filteredImageDataSource.push(obj)
            }
        }

        return (
            <View style={listCardStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        onPress={() => onPressEditAdDetails(item)}
                    >
                        <Icon
                            name="pencil"
                            type="evilicon"
                            color={Color.lightDark}
                            underlayColor="transparent"

                        />
                        <Text style={editTextstyle}>Edit Post</Text>
                    </TouchableOpacity>
                    <Text style={editTextstyle}>| </Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        onPress={() => onPressUpdatePhotos(item)}
                    >
                        <Icon
                            name="ios-images-outline"
                            type="ionicon"
                            size={18}
                            color={Color.lightDark}
                            underlayColor="transparent"

                        />
                        <Text style={editTextstyle}>Edit Photos</Text>
                    </TouchableOpacity>
                    <Text style={editTextstyle}>| </Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <Icon
                            name="trash"
                            type="evilicon"

                            color={Color.lightDark}
                            underlayColor="transparent"
                        />
                        <Text style={editTextstyle}>Delete</Text>
                    </TouchableOpacity>
                </View >
                <FeedsCard
                    time={formatedDate}
                    ownerID={ownerID}
                    postID={postID}
                    price={productPrice}
                    title={productTitle}
                    productDescription={productDescription}
                    selectedLocation={selectedLocation}
                    thumbnailURL={image_0}
                    imageDataSource={filteredImageDataSource}
                    navigation={navigation}
                />
            </View>
        );


    }

    renderPublishedPostList = () => {
        const { sellerAdsList } = this.props;

        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: 'center', marginTop: 10 }}
                data={sellerAdsList}
                renderItem={this.renderItemCard}
                // removeClippedSubviews={false}
                keyExtractor={this.keyExtractor}
            />
        );
    }

    renderActivityIndicator = () => {
        return (
            <ActivityIndicator
                size="large"
                color={Color.golden}
                style={activityIndicatorStyle}
            />
        );
    }

    render() {
        const { isFetchingAdsDataFromFirestore } = this.props;

        return (
            <View
                //  showsVerticalScrollIndicator={false}
                style={conatinerStyle}
            >
                {isFetchingAdsDataFromFirestore ? this.renderActivityIndicator() : this.renderPublishedPostList()}
            </View>
        );
    }
}

const {
    conatinerStyle,
    activityIndicatorStyle,
    listCardStyle,
    editTextstyle
} = styles;

Bookmark.propTypes = {
    navigation: PropTypes.object,
    sellerAdsList: PropTypes.array,
    onPressAdsCard: PropTypes.func,
    onPressUpdatePhotos: PropTypes.func,
    onPressEditAdDetails: PropTypes.func,
    isFetchingAdsDataFromFirestore: PropTypes.bool
};

export default Bookmark;
