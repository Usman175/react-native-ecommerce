import React, { Component } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { InstantSearch } from "react-instantsearch/native";
import {
    connectSearchBox,
    connectInfiniteHits,
    connectHighlight
} from "react-instantsearch/connectors";

import styles from './styles';
import Color from '../../styles/Color';
import {
    deviceScaledWidth,
    screenWidth
} from '../../utilities/ScreenSize';
import { numberWithCommas } from '../../utilities/Functions';

const thumbnailHeight = screenWidth / 3;

const Separator = () => (
    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Color.placeholderWhite
    }}
    />
)

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {
    /* if there are still results, you can
    call the refine function to load more */
    const onEndReached = function () {
        if (hasMore) {
            refine();
        }
    };

    return (
        <FlatList
            data={hits}
            onEndReached={onEndReached}
            keyExtractor={(item, index) => item.objectID}
            ItemSeparatorComponent={() => {
                return (
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: Color.placeholderWhite
                    }}
                    />
                );
            }}

            renderItem={({ item }) => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ height: thumbnailHeight, width: thumbnailHeight, backgroundColor: Color.lightDark }}
                            source={{ uri: item.image_0 }}
                        />
                        <View style={{ flex: 1, padding: 10, height: thumbnailHeight, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Text
                                style={productTitleTextStyle}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                <Highlight attribute="productTitle" hit={item} />
                            </Text>
                            <Text style={priceTextStyle}>{'₹ ' + `${numberWithCommas(item.productPrice)}`}</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center' }}>
                                <Icon
                                    name="ios-pin-outline"
                                    type="ionicon"
                                    size={18}
                                    color={Color.lightDark}
                                    underlayColor="transparent"
                                />
                                <Text style={addressTextStyle}>{item.selectedLocation}</Text>
                                <Text style={addressTextStyle}>| </Text>
                                <Icon
                                    name="ios-time-outline"
                                    type="ionicon"
                                    size={18}
                                    color={Color.lightDark}
                                    underlayColor="transparent"
                                />
                                <Text style={addressTextStyle}>{'10 Days ago'}</Text>
                            </View>
                        </View>

                    </View>
                );
            }}
        />
    );
});

const Highlight = connectHighlight(
    ({ highlight, attribute, hit, highlightProperty }) => {
        const parsedHit = highlight({
            attribute,
            hit,
            highlightProperty: '_highlightResult',
        });
        const highlightedHit = parsedHit.map((part, idx) => {
            if (part.isHighlighted)
                return (
                    <Text key={idx} style={{ backgroundColor: Color.golden }}>
                        {part.value}
                    </Text>
                );
            return part.value;
        });
        return <Text>{highlightedHit}</Text>;
    }
);

const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
    return (
        <TextInput
            style={textInputStyle}
            placeholderTextColor={Color.lightDark}
            keyboardType="default"
            placeholder="Search for a product"
            autoFocus={true}
            clearButtonMode="always"
            multiline={false}
            maxLength={50}
            returnKeyType={'search'}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'none'}
            underlineColorAndroid="transparent"
            value={currentRefinement}
            onChangeText={(text) => refine(text)}
        />
    );
});

export default class ElasticSearch extends Component {

    renderCancelButton = () => {
        const { changeStateForElasticSearchModal } = this.props;

        return (
            <Icon
                containerStyle={{ alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10 }}
                name="md-close"
                type="ionicon"
                size={35}
                color={Color.lightDark}
                onPress={changeStateForElasticSearchModal}
                underlayColor="transparent"
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

    renderES = () => {
        return (
            <InstantSearch
                appId="HLRRWP8UOZ"
                apiKey="026484143ef79d8e567d09bd0184a10a"
                indexName="posts"
            >
                <SearchBox />
                {this.renderSeperator()}
                <Hits />
            </InstantSearch>
        );
    }

    render() {
        return (
            <View >
                {this.renderCancelButton()}
                {this.renderES()}
            </View >
        );
    }
}

const {
    textInputStyle,
    productTitleTextStyle,
    addressTextStyle,
    priceTextStyle
} = styles;

ElasticSearch.propTypes = {
    changeStateForElasticSearchModal: PropTypes.func
}

