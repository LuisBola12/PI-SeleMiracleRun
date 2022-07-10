export const filterPaymentsByProjectName = ( payments, projectName ) => {
  let filteredPayments = [];
  for ( let i = 0; i < payments.length; i++ ) {
    if ( payments[i].NombreProyecto === projectName ) {
      filteredPayments.push( payments[i] );
    }
  }
  return filteredPayments;
};

export const filterPaymentsByDate = ( payments, initialDateFilter, endDateFilter ) => {
  let filteredPayments = [];
  let payDate;
  let initialDate = new Date( initialDateFilter );
  initialDate.setHours( 0, 0, 0, 0 );
  let endDate = new Date( endDateFilter );
  endDate.setHours( 23, 59, 59, 999 );
  for ( let i = 0; i < payments.length; i++ ) {
    payDate = new Date( payments[i].FechaFin );
    if ( payDate >= initialDate && payDate <= endDate ) {
      filteredPayments.push( payments[i] );
    }
  }
  return filteredPayments;
};