
const validate = (values) => {
  let errors = {};
  if (!values.Name) {
    errors.Name = 'Voluntary deduction Name Is Required';
    document.getElementById('Name').style.borderColor = 'red';
  } else {
    document.getElementById('Name').style.borderColor = 'gray';
  }
  if (values.Name && values.Name[0] === '/') {
    errors.Name = 'You must enter a valid name';
    document.getElementById('Name').style.borderColor = 'red';
  } else if (values.Name) {
    document.getElementById('Name').style.borderColor = 'gray';
  }
  if (!values.Cost) {
    errors.Cost = 'Cost Required'
    document.getElementById('Cost').style.borderColor = 'red';
  } else {
    document.getElementById('Cost').style.borderColor = 'gray';
  }
  return errors;
};

export default validate;