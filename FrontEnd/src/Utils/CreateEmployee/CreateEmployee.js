import { validateEmail, validateId, validateName, validatePassword } from '../../Validate';
import history from '../../history';
export const verifyEmployeeProject = async (id,activeProject) => {
  const seleUrl = 'http://localhost:4000/employee/contract';
  try {
    const postFetch = await fetch(seleUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Cedula: id,
        Proyecto: activeProject,
      }),
    });
    const newData = await postFetch.json();
    if (newData.length === 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const showContractValues = (e) => {
  if (e.target.value === 'Servicios Profesionales') {
    document.getElementById('profesional service').style.display = 'flex';
    document.getElementById('other-contract').style.display = 'none';
  } else {
    if(e.target.value!==''){
      document.getElementById('other-contract').style.display = 'flex';
      document.getElementById('profesional service').style.display = 'none';
    }else{
      document.getElementById('other-contract').style.display = 'none';
      document.getElementById('profesional service').style.display = 'none';
    }
  }
};
export const validateForm = (data) =>{
  let errors = {};
  const {email,password,name,lastname,secondlastname,id,contract} = data;
  if(email){
    if(!validateEmail(email)){
      errors.email = 'You must enter a valid format for an email.';
      document.getElementById('email').style.borderColor = 'red';
    }else{
      document.getElementById('email').style.borderColor = 'gray';
    }
  }else{
    errors.email = 'Please enter an email.';
    document.getElementById('email').style.borderColor = 'red';
  }
  
  if(password){
    if(!validatePassword(password)){
      errors.password = 'Password must be 6 characters longer and have at least 2 words.';
      document.getElementById('password').style.borderColor = 'red';
    }else{
      document.getElementById('error-password-input').style.display = '';
      document.getElementById('password').style.borderColor = 'gray';
    }
  }else{
    errors.password = 'Please enter a password.';
    document.getElementById('password').style.borderColor = 'red';
  }
  if(name){
    if(!validateName(name)){
      errors.name = 'Please enter a valid name.';
      document.getElementById('name').style.borderColor = 'red';
    }else{
      document.getElementById('name').style.borderColor = 'gray';
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
      document.getElementById('lastname').style.borderColor = 'gray';
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
      document.getElementById('secondlastname').style.borderColor = 'gray';
    }
  }else{
    errors.secondlastname = 'Please enter a secondlastname.';
    document.getElementById('secondlastname').style.borderColor = 'red';
  }
  if(id){
    if(!validateId(id)){
      errors.id = 'Id must follow the Costa Rican format.';
      document.getElementById('id').style.borderColor = 'red';
    }else{
      document.getElementById('error-id-employee').style.display = '';
      document.getElementById('id').style.borderColor = 'gray';
    }
  }else{
    errors.id = 'Please enter an Id.';
    document.getElementById('id').style.borderColor = 'red';
  }
  if(contract){
    document.getElementById('error-contract-input').style.display = '';
    document.getElementById('contract').style.borderColor = 'gray';
  }else{
    errors.contract = 'Please select a type of Contract.';
    document.getElementById('contract').style.borderColor = 'red';
  }
  return errors;
};
export const back = () => {
  history.push('/employees');
  history.go();
};
