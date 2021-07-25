const diffDates = (date1, date2) => {
    
    return Math.floor(( Date.parse(date1) - Date.parse(date2) ) / 86400000); 
}

module.exports = diffDates
