const validate = (values) => {
  let errors = {};
  if (!values.Name) {
    errors.Name = 'You must enter a name for the benefit';
  }
  if (values.Name && values.Name[0] === '/') {
    errors.Name = 'You must enter a valid name';
  }
  if (!values.Cost) {
    errors.Cost = "The cost of the benefit can't be 0";
  }
  return errors;
};

export default validate;
