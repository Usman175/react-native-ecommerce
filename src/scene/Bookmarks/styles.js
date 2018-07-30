import { StyleSheet, Platform } from 'react-native';

import colors from '../../styles/Color';
import Fonts from '../../styles/Fonts';

import { screenWidth } from '../../utilities/ScreenSize';
import Color from '../../styles/Color';


const cardWidth = screenWidth;
const cardHeight = cardWidth * 0.6; //Card Dimension are similar to those of feed cards
const contentHeight = cardHeight * 0.25

export default styles = StyleSheet.create({
    conatinerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    listCardStyle: {
        backgroundColor: colors.lightWhite,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: cardWidth,
        height: cardHeight + contentHeight + contentHeight
    },
    editTextstyle: {
        color: Color.lightDark,
        fontSize: 14,
        fontFamily: Fonts.CharterBT,
        paddingHorizontal: 5,
        alignSelf: 'center'
    },
    listCardImageStyle: {
        resizeMode: 'cover',
        flex: 4
    },
    activityIndicatorStyle: {
        marginTop: 35,
        alignItems: 'center'
    }
});
