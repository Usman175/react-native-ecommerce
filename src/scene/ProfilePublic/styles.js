import { StyleSheet } from 'react-native';

import colors from '../../styles/Color';
import Fonts from '../../styles/Fonts';

import { screenWidth } from '../../utilities/ScreenSize';
import Color from '../../styles/Color';

export default styles = StyleSheet.create({
    conatinerStyle: {
        backgroundColor: colors.lightBlueWhite,
        flexDirection: 'column'
    },
    avatarStyle: {
        alignSelf: 'center',
        margin: 25
    },
    nameTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colors.lightBlueWhite,
        fontFamily: Fonts.CharterBT
    },
    addressTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: colors.lightBlueWhite,
        fontFamily: Fonts.CharterBT,
        marginHorizontal: 5
    },
    gridViewCardStyle: {
        justifyContent: 'center',
        width: screenWidth / 3.2,
        backgroundColor: colors.placeholderWhite,
        alignItems: 'center',
        height: screenWidth / 3.2,
        margin: 1.5,
    },
    contactButtonContainerStyle: {
        backgroundColor: Color.dark,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //  borderWidth: StyleSheet.hairlineWidth,
        // borderColor: colors.semiDarkWhite,
        padding: 15,
        // marginVertical: 5
    },
    followButtonTextstyle: {
        fontSize: 18,
        color: Color.golden,
        fontFamily: Fonts.CharterBT
    },
    activityIndicatorStyle: {
        marginTop: 35,
        alignItems: 'center'
    }
});
