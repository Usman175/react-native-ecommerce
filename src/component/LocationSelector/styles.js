import { StyleSheet } from 'react-native';

import Color from '../../styles/Color';
import Fonts from '../../styles/Fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
        backgroundColor: Color.semiTransparentDarkOverlay
    },
    searchTextInputStyle: {
        padding: 15,
        fontFamily: Fonts.CharterBT,
        backgroundColor: Color.lightBlueWhite
    }
});
