import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import styles from './styles';
import colors from '../../styles/Color';
import Color from '../../styles/Color';
import Fonts from '../../styles/Fonts';

class ProfilePublic extends Component {

    keyExtractor = (item, index) => index.toString();

    renderItemCard = ({ item }) => {
        const { onPressAdsCard } = this.props;

        return (
            <TouchableOpacity
                onPress={() => onPressAdsCard(item)}
            >
                <Image
                    source={{ uri: item.image_0 }}
                    style={gridViewCardStyle}
                />
            </TouchableOpacity >
        );
    }

    renderPublishedPostList = () => {
        const { sellerAdsList, isFetchingAdsDataFromFirestore } = this.props;

        if (isFetchingAdsDataFromFirestore) {
            return (
                <ActivityIndicator
                    size="small"
                    color={Color.golden}
                    style={activityIndicatorStyle}
                />
            );
        }

        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                style={{ marginTop: 10, backgroundColor: colors.lightBlueWhite }}
                data={sellerAdsList}
                renderItem={this.renderItemCard}
                // removeClippedSubviews={false}
                keyExtractor={this.keyExtractor}
                numColumns={3}
            />
        );
    }

    renderProfileHeader = () => {
        const { profileImageURL } = this.props.sellerData;

        return (
            <Avatar
                rounded
                width={100}
                height={100}
                containerStyle={avatarStyle}
                source={{ uri: profileImageURL }}
                //onPress={() => console.log("Works!")}
                activeOpacity={0.7}
            />
        );
    }

    renderUserBasicInfo = () => {
        const { sellerData } = this.props;
        const {
            firstName,
            lastName,
            address,
            phoneNumber
        } = sellerData;
        const sellerFirstName = firstName ? firstName : '';
        const sellerLastName = lastName ? lastName : '';
        const sellerphoneNumber = phoneNumber ? phoneNumber : '';

        return (
            <View style={{ flexDirection: 'column', backgroundColor: colors.dark }}>
                <Text style={nameTextStyle}>{sellerFirstName + ' ' + sellerLastName}</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>
                    <Icon
                        name="ios-pin-outline"
                        type="ionicon"
                        color={Color.golden}
                        underlayColor="transparent"
                    />
                    <Text style={addressTextStyle}>{address}</Text>
                </View>
                <Text style={addressTextStyle}>{sellerphoneNumber}</Text>
            </View>
        );
    }

    renderFollowButton = () => {
        return (
            <View style={contactButtonContainerStyle}>
                <Text style={followButtonTextstyle}>ABOUT</Text>
                <Text style={{ fontSize: 18, color: Color.placeholderWhite, fontFamily: Fonts.CharterBT }}>|</Text>
                <Text style={followButtonTextstyle}>CONTACT</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={conatinerStyle}
            >
                <View style={{ flexDirection: 'row', backgroundColor: Color.dark, justifyContent: 'flex-start', alignItems: 'center' }}>
                    {this.renderProfileHeader()}
                    {this.renderUserBasicInfo()}
                </View>
                {this.renderFollowButton()}
                {this.renderPublishedPostList()}
            </ScrollView>
        );
    }
}

const {
    conatinerStyle,
    avatarStyle,
    nameTextStyle,
    addressTextStyle,
    gridViewCardStyle,
    contactButtonContainerStyle,
    followButtonTextstyle,
    activityIndicatorStyle
} = styles;

ProfilePublic.propTypes = {
    navigation: PropTypes.object,
    sellerAdsList: PropTypes.array,
    isFetchingAdsDataFromFirestore: PropTypes.bool,
    sellerData: PropTypes.object
};

export default ProfilePublic;
