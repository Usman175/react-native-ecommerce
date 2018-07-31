import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ElasticSearch from './ElasticSearch';

class ElasticSearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //
        };
    }

    render() {
        const {
            navigation,
            changeStateForElasticSearchModal
        } = this.props;

        return (
            <ElasticSearch
                changeStateForElasticSearchModal={changeStateForElasticSearchModal}
            />
        );
    }
}

ElasticSearchContainer.propTypes = {
    navigation: PropTypes.object,
    changeStateForElasticSearchModal: PropTypes.func

}

export default ElasticSearchContainer;
