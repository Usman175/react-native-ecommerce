import firebase from 'react-native-firebase';

export const postCollectionRef = firebase.firestore().collection('posts');
export const userCollectionRef = firebase.firestore().collection('users');
export const bookmarksCollectionRef = firebase.firestore().collection('bookmarks');

//For order by issue refer this discussion : https://github.com/invertase/react-native-firebase/issues/568

export const getPostStorageLocation = (userId, postId, imageIndex) => {

    return `/images/${userId}/${postId}/image_${imageIndex}`;
    /**
     * Index 0 : Cover Image
     * Index 1-6 : Other Images
     */
};

export const getPostThumbnailURLFromRef = (imageLocation) => {
    // Create a reference to the file we want to download
    let imageRef = firebase.storage().ref(imageLocation);

    // Get the download URL
    imageRef.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        return url;
    }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object_not_found':
                // File doesn't exist
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
        }
    });
}

export const DBFieldKeys = {
    postCategoriesKey: {
        Mobiles: 'mobiles',
        Electronics: 'electronics',
        Properties: 'properties',
        Vehicles: 'vehicles',
        Adventure: 'adventure',
        Hotels: 'hotels',
        Furniture: 'furniture',
        Jobs: 'jobs',
        Services: 'services',
        Pets: 'pets',
        BooksSportsHobbies: 'booksSportsHobbies',
        Fashion: 'fashion',
        FlightBusTickets: 'flightBusTickets',
        Events: 'events'
    },
    postSubCategoriesKey: {
        MobilePhones: 'mobilePhones',
        Tablet: 'tablet',
        Accessories: 'accessories',

        ComputerAppliances: 'computerAppliances',
        TVsVideoAudio: 'tVsVideoAudio',
        HardDisksPrinterMonitors: 'hardDisksPrinterMonitors',
        WashingMachines: 'washingMachines',
        Fridges: 'fridges',
        ComputerAccessories: 'computerAccessories',
        CameraAndLenses: 'cameraAndLenses',
        GamesEntertainment: 'gamesEntertainment',

        Hostels: 'hotels',
        RentalRooms: 'rentalRooms',
        Apartments: 'apartments',
        ShopsOffices: 'shopsOffices',
        LandAndPlots: 'landAndPlots',
        HouseAndVillas: 'houseAndVillas',

        Bikes: 'bikes',
        Cars: 'cars',
        CommercialVehicles: 'commercialVehicles',
        OtherVehicles: 'otherVehicles',
        SpareParts: 'spareParts'

    }
}

export const getSelectedCategoryDBKeys = (title) => {
    const { postCategoriesKey } = DBFieldKeys;

    switch (title) {
        case 'Mobiles':
            return postCategoriesKey.Mobiles;
        case 'Electronics & Appliances':
            return postCategoriesKey.Electronics;
        case 'Properties':
            return postCategoriesKey.Properties;
        case 'Vehicles':
            return postCategoriesKey.Vehicles;
        case 'Adventure & Holiday Packages':
            return postCategoriesKey.Adventure;
        case 'Hotels':
            return postCategoriesKey.Hotels;
        case 'Furniture':
            return postCategoriesKey.Furniture;
        case 'Jobs':
            return postCategoriesKey.Jobs;
        case 'Services':
            return postCategoriesKey.Services;
        case 'Pets':
            return postCategoriesKey.Pets;
        case 'Books, Sports & Hobbies':
            return postCategoriesKey.BooksSportsHobbies;
        case 'Fashion':
            return postCategoriesKey.Fashion;
        case 'Flight & Bus Tickets':
            return postCategoriesKey.FlightBusTickets;
        case 'Events':
            return postCategoriesKey.Events;
    }
}
