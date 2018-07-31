import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import styles from './styles';


import Color from '../../styles/Color';

class ElasticSearch extends Component {

    renderCancelButton = () => {
        const { changeStateForElasticSearchModal } = this.props;

        return (
            <Icon
                containerStyle={{ alignSelf: 'flex-start', padding: 10 }}
                name="md-close"
                type="ionicon"
                size={35}
                color={Color.lightDark}
                onPress={changeStateForElasticSearchModal}
                underlayColor="transparent"
            />
        );
    }

    renderTextInput = () => {
        return (
            <TextInput
                style={textInputStyle}
                placeholderTextColor={Color.lightDark}
                keyboardType="default"
                placeholder="Try  &ldquo;iPhone 7&rdquo;"
                autoFocus={true}
                clearButtonMode="always"
                multiline={false}
                maxLength={50}
                returnKeyType={'search'}
                // onChangeText={(text) => onMinPriceInput(text.replace(/[^0-9]/g, ''))}
                //value={minValue ? `₹ ${minValue}` : null}
                underlineColorAndroid="transparent"
            />
        );
    }

    renderSeperator = () => {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                height: 1,
                backgroundColor: Color.lightDark
            }}
            />
        );
    }


    render() {
        return (
            <View>
                {this.renderCancelButton()}
                {this.renderTextInput()}
                {this.renderSeperator()}
            </View>
        );

    }
}


const {
    textInputStyle
} = styles;

ElasticSearch.propTypes = {
    changeStateForElasticSearchModal: PropTypes.func
}

export default ElasticSearch;
