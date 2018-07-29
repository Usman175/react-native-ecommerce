
import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Color from '../../styles/Color';

const {
    searchbarContainerStyle,
    textInputStyle
} = styles;

export class SearchBar extends Component {

    render() {
        return (
            <View style={searchbarContainerStyle}>
                <TextInput
                    style={textInputStyle}
                    placeholder='Search for the product....'
                    placeholderTextColor={Color.dark}
                    returnKeyType={'search'}
                    onSubmitEditing={() => console.log(' search button pressed.....')}
                    multiline={false}
                    underlineColorAndroid='transparent'
                    maxLength={40}
                    clearButtonMode='always'
                // onChangeText={(text) => onProductPriceInput(text.replace(/[^0-9]/g, ''))}
                //value={`₹ ${numberWithCommas(productPrice)}`}
                />
            </View>
        );
    }
}

SearchBar.propTypes = {

};
