import React from 'react';
import PropTypes from 'prop-types';

import BookmarkContainer from './BookmarkContainer';

const index = ({ navigation }) => {

    const { params } = navigation.state;
    const userID = params ? params.userID : null;

    return (
        <BookmarkContainer
            navigation={navigation}
            userID={userID}
        />
    );
};

index.propTypes = {
    navigation: PropTypes.object,
    userID: PropTypes.string
};

export default index;
