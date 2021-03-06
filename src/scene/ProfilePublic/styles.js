import { StyleSheet, Platform } from 'react-native';

import colors from '../../styles/Color';

import { screenHeight, screenWidth } from '../../utilities/ScreenSize';

export default styles = StyleSheet.create({
    conatinerStyle: {
        backgroundColor: colors.lightWhite,
        flexDirection: 'column'
    },
    triangleDown: {
        width: 0,
        height: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .5)',
                shadowOffset: { height: 3, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 2,
            }
        }),
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: screenWidth / 1.5,
        borderRightWidth: screenWidth / 1.5,
        borderBottomWidth: screenWidth / 1.8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colors.dark,
        transform: [
            { rotate: '180deg' }
        ]
    },
    circleContainer: {
        margin: 20,
        position: 'absolute',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .5)',
                shadowOffset: { height: 3, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 2,
            }
        })
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        backgroundColor: colors.dark,
        transform: [
            { rotate: '180deg' }
        ],
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarStyle: {
        alignSelf: 'center',
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
    nameTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        color: colors.dark
    },
    addressTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: colors.lightDark
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.lightBlueWhite
    },
    iconContainerStyle: {
        backgroundColor: colors.dark,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.golden
    },
    gridViewCardStyle: {
        justifyContent: 'center',
        width: screenWidth / 3.2,
        backgroundColor: colors.lightWhite,
        alignItems: 'center',
        height: screenWidth / 3.2,
        margin: 1.5,
    }
});
