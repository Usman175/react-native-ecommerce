import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import styles from './styles';
import Color from '../../styles/Color';
import { numberWithCommas } from '../../utilities/Functions';
import { LocationSelector } from '../LocationSelector/LocationSelector';
import { CategorySelector } from '../CategorySelector';

const {
    container,
    locationFilterContainer,
    selectLocationButtonStyle,
    priceFilterButtonStyle,
    navigationBarStyle
} = styles;

//Location, sub-categort, price range  and also new and old

export class Filter extends Component {

    renderNavigationBar = () => {
        return (
            <View style={navigationBarStyle}>
                <Icon
                    containerStyle={{ padding: 10 }}
                    name="ios-arrow-dropleft-outline"
                    type="ionicon"
                    size={35}
                    color={Color.golden}
                //onPress={changeLoginWithPhoneModalViewState}
                />
                <Icon
                    containerStyle={{ padding: 10 }}
                    name="ios-checkmark-circle-outline"
                    type="ionicon"
                    size={35}
                    color={Color.golden}
                //onPress={changeLoginWithPhoneModalViewState}
                />
            </View>
        );
    }


    renderLocationFilter = () => {
        const {
            changeStateForLocationFilterModalView,
            selectedLocation
        } = this.props;

        return (
            <View style={locationFilterContainer}>
                <Text style={{ color: Color.dark, fontSize: 16 }}>Discover ads near you</Text>
                <TouchableOpacity
                    style={selectLocationButtonStyle}
                    onPress={changeStateForLocationFilterModalView}
                >
                    <Text
                        style={{ color: Color.lightDark, fontSize: 16 }}
                    >
                        {selectedLocation ? selectedLocation : 'Select Location'}
                    </Text>
                    <Icon
                        name="menu-up"
                        type="material-community"
                        color={Color.lightDark}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderPriceFilter = () => {
        const {
            maxPriceFilter,
            minPriceFilter,
            onMinPriceInput,
            onMaxPriceInput
        } = this.props;

        const minValue = minPriceFilter ? numberWithCommas(minPriceFilter) : undefined;
        const maxValue = maxPriceFilter ? numberWithCommas(maxPriceFilter) : undefined;

        return (
            <View style={locationFilterContainer}>
                <Text style={{ color: Color.dark, fontSize: 16 }}>Set a price range</Text>
                <View
                    style={priceFilterButtonStyle}
                >
                    <TextInput
                        style={{ color: Color.dark, fontSize: 16 }}
                        placeholderTextColor={Color.lightDark}
                        keyboardType="numeric"
                        placeholder="₹ (Min Price)"
                        autoFocus={false}
                        clearButtonMode="always"
                        multiline={false}
                        maxLength={13}
                        onChangeText={(text) => onMinPriceInput(text.replace(/[^0-9]/g, ''))}
                        value={minValue ? `₹ ${minValue}` : null}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View
                    style={priceFilterButtonStyle}
                >
                    <TextInput
                        style={{ color: Color.dark, fontSize: 16 }}
                        placeholderTextColor={Color.lightDark}
                        keyboardType="numeric"
                        placeholder="₹ (Max Price)"
                        autoFocus={false}
                        clearButtonMode="always"
                        multiline={false}
                        maxLength={13}
                        onChangeText={(text) => onMaxPriceInput(text.replace(/[^0-9]/g, ''))}
                        value={maxValue ? `₹ ${maxValue}` : null}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
        );
    }

    renderCategoryFilter = () => {
        const {
            changeStateForCategorySelectorModalView,
            selectedCategory,
            selectedSubCategory
        } = this.props;

        return (
            <View style={locationFilterContainer}>
                <Text style={{ color: Color.dark, fontSize: 16 }}>Choose Category</Text>
                <TouchableOpacity
                    style={selectLocationButtonStyle}
                    onPress={changeStateForCategorySelectorModalView}
                >
                    <Text
                        style={{ color: Color.lightDark, fontSize: 16 }}
                    >
                        {selectedCategory ? (selectedCategory + '/' + selectedSubCategory) : 'Select Category'}
                    </Text>
                    <Icon
                        name="menu-up"
                        type="material-community"
                        color={Color.lightDark}
                    //onPress={changeLoginWithPhoneModalViewState}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderLocationModalSelection = () => {
        const {
            isLocationFilterModalViewVisible,
            updateSelectedLocations,
            selectedLocation,
        } = this.props;

        return (
            <LocationSelector
                isSelectLocationModalViewVisible={isLocationFilterModalViewVisible}
                updateSelectedLocations={updateSelectedLocations}
                selectedLocation={selectedLocation}
            />
        );
    }

    renderProductCategoryModalSelection = () => {
        const {
            updateProductCategory,
            selectedCategory,
            selectedSubCategory,
            isCategorySelectorModalViewVisible,
            changeStateForCategorySelectorModalView
        } = this.props;

        return (
            <CategorySelector
                isProductCategoryModalViewVisible={isCategorySelectorModalViewVisible}
                updateProductDetails={updateProductCategory}
                createAdStatusDone={changeStateForCategorySelectorModalView}//Hide Modal view for now instead of finishing the form UI.
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
            />
        );
    }

    render() {
        return (
            <Modal
                style={container}
                visible={true}
                animationType="slide"
            // transparent={true}
            >
                <View style={container}>
                    {this.renderNavigationBar()}
                    {this.renderLocationFilter()}
                    {this.renderPriceFilter()}
                    {this.renderCategoryFilter()}
                    {this.renderProductCategoryModalSelection()}
                    {this.renderLocationModalSelection()}
                </View>
            </Modal >
        );
    }
}

Filter.propTypes = {
    maxPriceFilter: PropTypes.number,
    minPriceFilter: PropTypes.number,
    onMinPriceInput: PropTypes.func,
    onMaxPriceInput: PropTypes.func,
    isCategorySelectorModalViewVisible: PropTypes.bool,
    isLocationFilterModalViewVisible: PropTypes.bool,
    changeStateForCategorySelectorModalView: PropTypes.func,
    updateProductCategory: PropTypes.func,
    selectedCategory: PropTypes.string,
    selectedSubCategory: PropTypes.string,
    changeStateForLocationFilterModalView: PropTypes.func,
    updateSelectedLocations: PropTypes.func,
    selectedLocation: PropTypes.string
};
