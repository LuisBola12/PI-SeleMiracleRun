
const validate = (values) => {
  let errors = {};
  const regex = '';
  if (!values.Name) {
    errors.Name = 'Voluntary deduction Name Is Required';
  }
  if (!values.Cost) {
    errors.Cost = 'Cost Required'
  }
  return errors;
};

export default validate;