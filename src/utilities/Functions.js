import Moment from 'moment';

export const numberWithCommas = (x) => {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
}

export const getFormatedDate = (updatedAt) => {
    if (updatedAt) {
        Moment.locale('en');
        //formatedDate = Moment(updatedAt).format("Do-MMM-YYYY");
        return Moment(updatedAt).fromNow();
    } else {
        return '';
    }
}
