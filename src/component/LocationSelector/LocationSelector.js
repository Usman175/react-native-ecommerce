import React, { Component } from 'react';
import {
    Image,
    View,
    Modal,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import MultiSelect from 'react-native-multiple-select';
import { CheckBox, SearchBar } from 'react-native-elements';

import styles from './styles';
import { screenHeight, screenWidth, deviceScaledHeight } from '../../utilities/ScreenSize';
import districts from '../../utilities/districts';
import Color from '../../styles/Color';

const {
    container,
    navigationBar,
} = styles;

export class LocationSelector extends Component {

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
            <CheckBox
                containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                title={item.name}
                checkedColor={Color.dark}
                iconType="ionicon"
                checkedIcon="ios-checkmark-circle"
                textStyle={{ color: Color.dark }}
                uncheckedIcon="ios-checkmark-circle-outline"
                checked={this.props.selectedLocation === item.name ? true : false}
                onPress={() => null}
                size={35}
            />
        </TouchableOpacity>
    );

    renderSeparator = () => {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                height: StyleSheet.hairlineWidth,
                backgroundColor: Color.placeholderWhite,
                marginVertical: 5
            }}
            />
        );
    }

    renderHeader = () => {
        return (
            <SearchBar
                lightTheme={true}
                containerStyle={{ backgroundColor: Color.lightBlueWhite }}
                clearIcon={{ color: Color.placeholderWhite }}
                searchIcon={true} // You could have passed `null` too
                onChangeText={() => null}
                onClear={() => null}
                placeholder='Search...' />
        );
    }

    /*onPressDone = () => {
        this.props.onPressNextButton();
        this.props.changeStateOfSelectLocationModalView();
    }

    onPressBackButton = () => {
        this.props.changeStateOfSelectLocationModalView();
        this.props.onPressBackButton();
    }

    navBar = () => {
        return (
            <View style={navigationBar}>
                <Text style={{ color: '#FFFFFF', fontSize: 18 }} onPress={this.onPressBackButton}>Back</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 18 }} onPress={this.onPressDone}>Next</Text>
            </View >
        );
    }*/

    render() {
        const {
            isSelectLocationModalViewVisible,
            changeStateOfSelectLocationModalView,
            updateSelectedLocations,
            selectedLocation } = this.props;

        return (
            <Modal
                visible={true}
                transparent={true}
                style={container}
                animationType="slide"
                onRequestClose={changeStateOfSelectLocationModalView}
            >
                <View style={{ height: screenHeight, padding: 35, backgroundColor: Color.semiTransparentDarkOverlay }}>
                    {this.renderHeader()}
                    <FlatList
                        contentContainerStyle={{ backgroundColor: Color.lightBlueWhite }}
                        data={districts}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </Modal>
        );
    }
}

LocationSelector.propTypes = {
    isSelectLocationModalViewVisible: PropTypes.bool,
    changeStateOfSelectLocationModalView: PropTypes.func,
    selectedLocation: PropTypes.array,
    updateSelectedLocations: PropTypes.func,
    onPressBackButton: PropTypes.func
};
