import { validateEmail, validateName } from './../../Validate';

export const removeNoEdit = () => {
  document.getElementById('name').removeAttribute('disabled');
  document.getElementById('lastname').removeAttribute('disabled');
  document.getElementById('secondlastname').removeAttribute('disabled');
  document.getElementById('email').removeAttribute('disabled');
  document.getElementById('phoneNumber').removeAttribute('disabled');
  document.getElementById('name').removeAttribute('readOnly');
  document.getElementById('lastname').removeAttribute('readOnly');
  document.getElementById('secondlastname').removeAttribute('readOnly');
  document.getElementById('email').removeAttribute('readOnly');
  document.getElementById('phoneNumber').removeAttribute('readOnly');
  document.getElementById('user-profile-buttons-div').style.display = 'flex';
};

export const applyNoEdit = () => {
    document.getElementById('name').setAttribute('disabled','true')
    document.getElementById('lastname').setAttribute('disabled','true');
    document.getElementById('secondlastname').setAttribute('disabled','true');
    document.getElementById('email').setAttribute('disabled','true');
    document.getElementById('phoneNumber').setAttribute('disabled','true');
    document.getElementById('name').setAttribute('readOnly','true')
    document.getElementById('lastname').setAttribute('readOnly','true');
    document.getElementById('secondlastname').setAttribute('readOnly','true');
    document.getElementById('email').setAttribute('readOnly','true');
    document.getElementById('phoneNumber').setAttribute('readOnly','true');
    document.getElementById('user-profile-buttons-div').style.display = 'none';
}
export const validateEditUserForm = (data) =>{
    let errors = {}
    const {email,name,lastname,secondlastname} = data;
    console.log(data);
    if(email){
      if(!validateEmail(email)){
        errors.email = 'You must enter a valid format for an email.';
        document.getElementById('email').style.borderColor = 'red';
      }else{
        document.getElementById('email').style.border = 'gray';
      }
    }else{
      errors.email = 'Please enter an email.';
      document.getElementById('email').style.borderColor = 'red';
    }
    if(name){
      if(!validateName(name)){
        errors.name = 'Please enter a valid name.';
        document.getElementById('name').style.borderColor = 'red';
      }else{
        document.getElementById('name').style.border = 'gray';
      }
    }else{
        errors.name = 'Please enter a name.';
        document.getElementById('name').style.borderColor = 'red';
    }
  
    if(lastname){
      if(!validateName(lastname)){
        errors.lastname = 'Please enter a valid lastname.';
        document.getElementById('lastname').style.borderColor = 'red';
      }else{
        document.getElementById('lastname').style.border = 'gray';
      }
    }else{
        errors.lastname = 'Please enter a lastname.';
        document.getElementById('lastname').style.borderColor = 'red';
    }
  
    if(secondlastname){
      if(!validateName(secondlastname)){
        errors.secondlastname = 'Please enter valid a second last name.';
        document.getElementById('secondlastname').style.borderColor = 'red';
      }else{
        document.getElementById('secondlastname').style.border = 'none';
      }
    }else{
        errors.secondlastname = 'Please enter a secondlastname.';
        document.getElementById('secondlastname').style.borderColor = 'red';
    }
    return errors;
  }
