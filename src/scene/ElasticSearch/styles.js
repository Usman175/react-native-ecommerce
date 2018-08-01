import { StyleSheet } from 'react-native';

import Fonts from '../../styles/Fonts'
import Color from '../../styles/Color';

export default styles = StyleSheet.create({
    textInputStyle: {
        color: Color.lightDark,
        fontSize: 20,
        flexDirection: 'column',
        fontFamily: Fonts.CharterBT,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20
    },
    productTitleTextStyle: {
        fontSize: 18,
        color: Color.dark,
        fontFamily: Fonts.CharterBT
    },
    addressTextStyle: {
        color: Color.lightDark,
        fontSize: 10,
        fontFamily: Fonts.CharterBT,
        paddingHorizontal: 5,
        alignSelf: 'center'
    },
    priceTextStyle: {
        color: Color.lightDark,
        fontSize: 16,
        fontFamily: Fonts.CharterBT
    }
});
