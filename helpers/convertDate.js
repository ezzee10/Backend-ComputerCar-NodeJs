const convertDate = (date) => {
  let convertDate = null;

  if (date !== undefined) {
    convertDate = new Date(date);
  } else {
    convertDate = new Date();
  }

  let day = ("0" + convertDate.getDate()).slice(-2);
  let month = ("0" + (convertDate.getMonth() + 1)).slice(-2);
  let year = convertDate.getFullYear();
  let formatted = `${day}-${month}-${year}`;

  return formatted;
};

module.exports = convertDate;
