import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import SearchListing from './SearchListing';

class SearchListingContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {

            //Filters
            isFilterVisible: false,
            minPriceFilter: undefined,
            maxPriceFilter: undefined,
            selectedCategory: undefined,
            selectedSubCategory: undefined,
            selectedLocation: '',
            isLocationFilterModalViewVisible: false,
            isCategorySelectorModalViewVisible: false,

            //Data Fetch Opertions
            isFetchingData: false,
            //FireStore
            postListDataSource: []
        }
    }

    async componentDidMount() {
        let postCollectionRef = firebase.firestore().collection('posts');

        const { postListDataSource } = this.state;
        let copyPostListDataSource = [...postListDataSource];

        await postCollectionRef.get().then(function (querySnapshot) {
            let dSArray = [];
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                dSArray.push(doc.data());
            });
            copyPostListDataSource = [...copyPostListDataSource, ...dSArray];
        }).catch((err) => {
            //
        });

        this.setState({
            postListDataSource: copyPostListDataSource
        });
    }

    onRefresh = () => {
        this.setState({
            isFetchingData: true
        });
        //FetchData operation goes here
    }

    changeStateForFilterUI = () => {
        /**
         * Its a reset button.
         * If user clicks back button instead of apply button, clear the filters
         */

        this.setState({
            isFilterVisible: !this.state.isFilterVisible,
            selectedLocation: '',
            minPriceFilter: undefined,
            maxPriceFilter: undefined,
            selectedCategory: undefined,
            selectedSubCategory: undefined,
        });
    }

    changeStateForLocationFilterModalView = () => {
        this.setState({
            isLocationFilterModalViewVisible: !this.state.isLocationFilterModalViewVisible
        });
    }

    changeStateForCategorySelectorModalView = () => {
        this.setState({
            isCategorySelectorModalViewVisible: !this.state.isCategorySelectorModalViewVisible
        });
    }

    onMinPriceInput = (value) => {
        this.setState({
            minPriceFilter: parseInt(value, 10)
        });
    }

    onMaxPriceInput = (value) => {
        this.setState({
            maxPriceFilter: parseInt(value, 10)
        });
    }

    updateProductCategory = (key, value) => {
        switch (key) {
            case 'selectedCategory':
                this.setState({
                    selectedCategory: value[0],
                    selectedSubCategory: value[1]
                });
        }
    }

    updateSelectedLocations = (selectedLocation) => {
        this.setState({
            selectedLocation: selectedLocation,
            isLocationFilterModalViewVisible: false
        });
    }

    render() {
        const {
            isFilterVisible,
            maxPriceFilter,
            minPriceFilter,
            selectedCategory,
            selectedSubCategory,
            selectedLocation,
            isCategorySelectorModalViewVisible,
            isLocationFilterModalViewVisible,
            isFetchingData,
            postListDataSource
        } = this.state;

        return (
            <SearchListing
                navigation={this.props.navigation}

                //Filters
                isFilterVisible={isFilterVisible}
                changeStateForFilterUI={this.changeStateForFilterUI}

                maxPriceFilter={maxPriceFilter}
                minPriceFilter={minPriceFilter}
                onMinPriceInput={this.onMinPriceInput}
                onMaxPriceInput={this.onMaxPriceInput}

                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedLocation={selectedLocation}

                isCategorySelectorModalViewVisible={isCategorySelectorModalViewVisible}
                changeStateForCategorySelectorModalView={this.changeStateForCategorySelectorModalView}
                updateProductCategory={this.updateProductCategory}

                isLocationFilterModalViewVisible={isLocationFilterModalViewVisible}
                updateSelectedLocations={this.updateSelectedLocations}
                changeStateForLocationFilterModalView={this.changeStateForLocationFilterModalView}

                //Fetch Operation
                isFetchingData={isFetchingData}
                onRefresh={this.onRefresh}

                //FireStore
                postListDataSource={postListDataSource}
            />
        );
    }
}

SearchListingContainer.propTypes = {
    navigation: PropTypes.object
};

export default SearchListingContainer;
