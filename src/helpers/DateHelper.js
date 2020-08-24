const moment = require('moment');
export const RelativeDate = (date, dateThreshold=35*60*60*1000) => {
    let isPastADay = date ? ((Date.now() - (+new Date(date))) > dateThreshold) : false;
    let relativeDate = date ? (isPastADay ? moment(date).format("DD MMM YYYY") : moment(date).fromNow()) : '';
    return relativeDate;
}