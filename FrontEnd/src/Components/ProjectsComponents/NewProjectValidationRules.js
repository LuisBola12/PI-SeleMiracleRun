
const validate = (values) => {
  let errors = {};
  const regex = '';
  if (!values.projectName) {
    errors.projectName = 'Project Name Is Required';
  }
  if (!values.paymentPeriod) {
    errors.paymentPeriod = 'Payment Period Required'
  }
  if (!values.maxBenefitsQuantity) {
    errors.maxBenefitsQuantity = 'Max Benefits Quantity Required';
  }
  if (!values.maxBenefitsMoneyAmount) {
    errors.maxBenefitsMoneyAmount = 'Max Money in Benefits Per employee';
  }

  return errors;
};

export default validate;