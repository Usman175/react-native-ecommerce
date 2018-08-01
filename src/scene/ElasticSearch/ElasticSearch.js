import React, { Component } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Image,
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
            renderItem={({ item }) => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: item.image }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text>
                                <Highlight attribute="name" hit={item} />
                            </Text>
                            <Text>
                                <Highlight attribute="type" hit={item} />
                            </Text>
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
                appId="latency"
                apiKey="6be0576ff61c053d5f9a3225e2a90f76"
                indexName="ikea"
            >
                <SearchBox />
                {this.renderSeperator()}
                <Hits />
            </InstantSearch>
        );
    }

    render() {
        return (
            <View>
                {this.renderCancelButton()}
                {this.renderES()}
            </View >
        );
    }
}

const {
    textInputStyle
} = styles;

ElasticSearch.propTypes = {
    changeStateForElasticSearchModal: PropTypes.func
}

