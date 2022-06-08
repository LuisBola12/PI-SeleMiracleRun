
const validate = (values) => {
  let errors = {};
  const regex = '';
  if (!values.projectName) {
    errors.projectName = 'Project Name Is Required';
    errors.projectNameErrorCss = 'borderRed';
  } 
  if (!values.paymentperiod) {
    errors.paymentPeriod = 'Payment Period Required'
    errors.paymentPeriodErrorCss = 'borderRed';
  }
  if (!values.maxBenefitsQuantity) {
    errors.maxBenefitsQuantity = 'Max Benefits Quantity Required';
    errors.maxBenefitsQuantityCss = 'borderRed';
  }
  if (!values.maxBenefitsMoneyAmount) {
    errors.maxBenefitsMoneyAmount = 'Max Money in Benefits Per employee';
    errors.maxBenefitsMoneyAmountECss = 'borderRed';
  }
  
  return errors;
};

export default validate;