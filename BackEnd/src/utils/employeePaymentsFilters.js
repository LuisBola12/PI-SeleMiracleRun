export const filterPaymentsByProjectName = (payments, projectName) => {
  let filteredPayments = [];
  for (let i = 0; i < payments.length; i++) {
    if (payments[i].NombreProyecto === projectName) {
      filteredPayments.push(payments[i]);
    }
  }
  return filteredPayments;
}