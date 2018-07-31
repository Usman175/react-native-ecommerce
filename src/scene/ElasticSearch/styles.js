import { StyleSheet } from 'react-native';

import Fonts from '../../styles/Fonts'
import Color from '../../styles/Color';

export default styles = StyleSheet.create({
    mainConatinerStyle: {
        flexDirection: 'column',
        flex: 1
    },
    floatingShareButtonStyle: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 35
    },
    floatingButtonContainerStyle: {
        backgroundColor: Color.semiTransparentDarkOverlay,
        // borderWidth: 0.5,
        //borderColor: Colors.golden
    },
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
