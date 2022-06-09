const validate = (values) => {
  let errors = {};
  const hours = parseInt(values.calendar_hours);
  // alert(hours)
  if(hours){
    if(hours < 0){
      errors.calendar_hours = 'Cant be a negative number';
    }
    if(hours >= 16){
      errors.calendar_hours = 'Cant be largar than 16';
    }
  }else{
    errors.calendar_hours = 'Please enter hours.';
  }
  console.log(errors)
 return errors;
}

export default validate;