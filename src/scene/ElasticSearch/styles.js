import { StyleSheet } from 'react-native';

import Fonts from '../../styles/Fonts'
import Color from '../../styles/Color';

export default styles = StyleSheet.create({
    textInputStyle: {
        color: Color.lightDark,
        fontSize: 24,
        flexDirection: 'column',
        fontFamily: Fonts.CharterBT,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20
    }
});
