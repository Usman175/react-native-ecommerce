import {
    StyleSheet,
    Platform
} from 'react-native';

import {
    screenWidth
} from '../../utilities/ScreenSize';
import Fonts from '../../styles/Fonts';
import Color from '../../styles/Color';

export default StyleSheet.create({
    searchbarContainerStyle: {
        width: screenWidth * 0.8,
        height: 50,//deviceScaledHeight(60),
        borderRadius: 30, //deviceScaledHeight(30),
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'absolute',
        paddingHorizontal: 25,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 3, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 2,
            }
        })
    },
    textInputStyle: {
        flex: 1,
        fontFamily: Fonts.CharterBT,
        fontSize: 16,
        color: Color.lightWhite
    }
});
