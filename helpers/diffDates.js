const moment = require('moment');

const diffDates = (date1, date2) => {

  // const startDate  = '2020-01-01';
  // const endDate    = '2020-03-15';

  return moment(date1).diff(moment(date2), 'days');
  // return Math.floor(( Date.parse(date1) - Date.parse(date2) ) / 86400000);
};

module.exports = diffDates;
