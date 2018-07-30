import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import styles from './styles';
import Color from '../../styles/Color';
import { screenHeight } from '../../utilities/ScreenSize';
import districts from '../../utilities/districts';
import Fonts from '../../styles/Fonts';

const {
    container,
    searchTextInputStyle
} = styles;

export class LocationSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullListData: districts,
            filteredList: districts
        }
    }

    _keyExtractor = (item, index) => String(item.id);

    _renderItem = ({ item }) => {
        const isSelected = this.props.selectedLocation === item.name;
        const selectedStyle = { flexDirection: 'column', justifyContent: 'space-around', backgroundColor: Color.lightDark }
        const normalStyle = { flexDirection: 'column', justifyContent: 'space-around' }

        return (
            <TouchableOpacity
                onPress={() => this.props.updateSelectedLocations(item.name)}
                style={isSelected ? selectedStyle : normalStyle}
            >
                <CheckBox
                    containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                    title={item.name}
                    checkedColor={Color.dark}
                    iconType="ionicon"
                    checkedIcon="ios-checkmark-circle"
                    textStyle={{ color: Color.dark, fontFamily: Fonts.CharterBT }}
                    uncheckedIcon="ios-checkmark-circle-outline"
                    checked={isSelected ? true : false}
                    onPress={() => this.props.updateSelectedLocations(item.name)}
                    size={35}
                />
            </TouchableOpacity>
        );
    }

    renderSeparator = () => {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                height: StyleSheet.hairlineWidth,
                backgroundColor: Color.placeholderWhite,
                // marginVertical: 5
            }}
            />
        );
    }

    renderHeader = () => {
        const { selectedLocation } = this.props;

        return (
            <View style={{ backgroundColor: Color.placeholderWhite, padding: 5, borderWidth: 1, borderColor: Color.placeholderWhite }}>
                <TextInput
                    style={searchTextInputStyle}
                    placeholder="Search...."
                    placeholderTextColor={Color.placeholderWhite}
                    returnKeyType={'search'}
                    //onSubmitEditing={() => console.log(' search button pressed.....')}
                    multiline={false}
                    underlineColorAndroid="transparent"
                    maxLength={20}
                    clearButtonMode="always"
                    onChangeText={this.searchText}
                    value={selectedLocation}
                />
            </View>
        );
    }

    searchText = (e) => {
        let text = e.toLowerCase()
        let fullList = this.state.fullListData;
        let filteredList = fullList.filter((item) => {
            if (item.name.toLowerCase().match(text))
                return item;
        })
        if (!text || text === '') {
            this.setState({
                filteredList: fullList
            })
        } else if (!filteredList.length) {
            this.setState({
                filteredList: []
            })
        }
        else if (Array.isArray(filteredList)) {
            this.setState({
                filteredList
            })
        }
    }

    getIndexOfSelectedLocation = (location) => {
        for (let obj of districts) {
            if (obj.name === location) {
                return obj.id
            }
        }

        return 0;
    }

    render() {
        const {
            isSelectLocationModalViewVisible,
            changeStateOfSelectLocationModalView
        } = this.props;

        return (
            <Modal
                visible={isSelectLocationModalViewVisible}
                transparent={true}
                style={container}
                animationType="slide"
                onRequestClose={changeStateOfSelectLocationModalView}
            >
                <View style={{ height: screenHeight, padding: 35, backgroundColor: Color.semiTransparentDarkOverlay }}>
                    {this.renderHeader()}
                    <FlatList
                        contentContainerStyle={{ backgroundColor: Color.lightBlueWhite }}
                        data={this.state.filteredList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        enableEmptySections={true}
                    />
                </View>
            </Modal>
        );
    }
}

LocationSelector.propTypes = {
    isSelectLocationModalViewVisible: PropTypes.bool,
    changeStateOfSelectLocationModalView: PropTypes.func,
    selectedLocation: PropTypes.string,
    updateSelectedLocations: PropTypes.func,
    onPressBackButton: PropTypes.func
};
