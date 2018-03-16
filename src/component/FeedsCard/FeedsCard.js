
import React, { Component } from 'react';
import {
    Image,
    View,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

import styles from './styles';
import colors from '../../styles/Color';

const {
    container,
    avatarContainer,
    profileConatiner,
    imageViewStyle,
    nameTextStyle,
    productTitleTextStyle
} = styles;

export const FeedsCard = ({ name, title, time, imageURL, thumbnailURL }) => (

    <View style={container}>
        <View style={avatarContainer}>
            <View style={profileConatiner}>
                <Avatar
                    small
                    rounded
                    source={{ uri: thumbnailURL }}
                    // onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <Text
                    style={nameTextStyle}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >
                    {name}
                </Text>
            </View>
            <Text
                style={{ alignSelf: 'flex-end', color: colors.lightDark }}
                ellipsizeMode='tail'
                numberOfLines={1}
            >{time}
            </Text>
        </View>
        <Text
            style={productTitleTextStyle}
            ellipsizeMode='tail'
            numberOfLines={1}
        >
            {title}
        </Text>
        <Image
            source={{ uri: imageURL }}
            style={imageViewStyle}
        />
    </View>
);

FeedsCard.propTypes = {
    time: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    imageURL: PropTypes.string,
    thumbnailURL: PropTypes.string
};
