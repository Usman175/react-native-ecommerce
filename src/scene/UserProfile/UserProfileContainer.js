import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';

import UserProfile from './UserProfile';

class UserProfileContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedImageSource: null,
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            address: '',

            isSelectGenderModalViewVisible: false,

            createAdStatus: true
        };
    }

    changeStateOfSelectGenderModalView = () => {
        this.setState({
            isSelectGenderModalViewVisible: !this.state.isSelectGenderModalViewVisible
        });
    }

    createAdStatusDone = () => {
        this.setState({
            createAdStatus: false
        });
    }

    setGenderMale = () => {
        this.setState({
            gender: 'Male',
            isSelectGenderModalViewVisible: false
        });
    }

    setGenderFemale = () => {
        this.setState({
            gender: 'Female',
            isSelectGenderModalViewVisible: false
        });
    }

    setGenderOther = () => {
        this.setState({
            gender: 'Other',
            isSelectGenderModalViewVisible: false
        });
    }

    onFirstNameInput = (firstName) => {
        this.setState({
            firstName
        });
    }

    onLastNameInput = (lastName) => {
        this.setState({
            lastName
        })
    }

    onAddressInput = (address) => {
        this.setState({ address });
    }

    onEmailInput = (address) => {
        this.setState({ address });
    }

    //Image Picker Implementation
    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 1000,
            maxHeight: 1000,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    selectedImageSource: source
                });
            }
        });
    }

    render() {
        const {
            selectedImageSource,
            firstName,
            lastName,
            gender,
            email,
            address,
            isSelectGenderModalViewVisible,
        } = this.state;

        const { navigation } = this.props;

        return (
            <UserProfile
                selectedImageSource={selectedImageSource}
                selectPhotoTapped={this.selectPhotoTapped}

                firstName={firstName}
                onFirstNameInput={this.onFirstNameInput}

                lastName={lastName}
                onLastNameInput={this.onLastNameInput}

                gender={gender}
                setGenderFemale={this.setGenderFemale}
                setGenderMale={this.setGenderMale}
                setGenderOther={this.setGenderOther}
                isSelectGenderModalViewVisible={isSelectGenderModalViewVisible}
                changeStateOfSelectGenderModalView={this.changeStateOfSelectGenderModalView}

                email={email}
                onEmailInput={this.onEmailInput}

                address={address}
                onAddressInput={this.onAddressInput}

                //createAdStatusDone={this.createAdStatusDone}
                navigation={navigation}
            />
        );
    }
}

UserProfileContainer.propTypes = {
    navigation: PropTypes.object
};

export default UserProfileContainer;