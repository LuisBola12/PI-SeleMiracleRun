
export const  eliminateTimeFromDate = ( date ) => {
  let extractedDate = date;
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  extractedDate = new Date( year, month, day  , 0,0,0,0 );
  return extractedDate;
};

export const isInDateRange = ( initialDate, finalDate, dateToVerify ) =>{
  initialDate = eliminateTimeFromDate( initialDate );
  finalDate = eliminateTimeFromDate( finalDate );
  dateToVerify = eliminateTimeFromDate( dateToVerify );

  return ( initialDate <= dateToVerify <= finalDate );
};
