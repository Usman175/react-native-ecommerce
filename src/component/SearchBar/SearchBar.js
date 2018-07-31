
import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const {
    searchbarContainerStyle,
    textInputStyle
} = styles;

export const SearchBar = ({ changeStateForElasticSearchModal }) => (
    <TouchableOpacity
        style={searchbarContainerStyle}
        onPress={changeStateForElasticSearchModal}
    >
        <Text style={textInputStyle} >
            Search for a product
                </Text>
    </TouchableOpacity>
);

SearchBar.propTypes = {
    changeStateForElasticSearchModal: PropTypes.func
};
