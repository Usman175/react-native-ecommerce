import React from 'react';
import PropTypes from 'prop-types';

import Drawer from './Drawer';

const index = ({ navigation }) => {
    return <Drawer
        navigation={navigation}
    />;
};

index.propTypes = {
    navigation: PropTypes.object
};

export default index;
