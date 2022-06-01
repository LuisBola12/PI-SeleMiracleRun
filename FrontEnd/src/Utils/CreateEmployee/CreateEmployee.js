import { validateEmail, validateId, validateName, validatePassword } from '../../Validate';
import history from "../../history";
export const verifyEmployeeProject = async (id,activeProject) => {
  const seleUrl = "http://localhost:4000/employee/contract";
  try {
    const postFetch = await fetch(seleUrl, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
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
}
export const showContractValues = (e) => {
  if (e.target.value === "Servicios Profesionales") {
      document.getElementById("profesional service").style.display = "flex";
      document.getElementById("other-contract").style.display = "none";
  } else {
    if(e.target.value!==""){
      document.getElementById("other-contract").style.display = "flex";
      document.getElementById("profesional service").style.display = "none";
    }else{
      document.getElementById("other-contract").style.display = "none";
      document.getElementById("profesional service").style.display = "none";
    }
  }
}
export const validateForm = (data) =>{
    let validCount =0;
    const {email,password,name,lastname,secondlastname,id,contract} = data;
    if(email){
      if(!validateEmail(email)){
        document.getElementById("error-email-input").style.display = "inline";
        document.getElementById("error-email-input").innerHTML = "You must enter a valid format for an email.";
        document.getElementById("email-employee").style.borderColor = "red";
      }else{
        document.getElementById("error-email-input").style.display = "";
        document.getElementById("email-employee").style.borderColor = "gray";
        validCount++;
      }
    }else{
      document.getElementById("error-email-input").style.display = "inline";
      document.getElementById("error-email-input").innerHTML = "Please enter an email.";
      document.getElementById("email-employee").style.borderColor = "red";
    }
  
    if(password){
      if(!validatePassword(password)){
        document.getElementById("error-password-input").style.display = "inline";
        document.getElementById("error-password-input").innerHTML = "Password must be 6 characters longer and have at least 2 words.";
        document.getElementById("password-employee").style.borderColor = "red";
      }else{
        document.getElementById("error-password-input").style.display = "";
        document.getElementById("password-employee").style.borderColor = "gray";
        validCount++;
      }
    }else{
      document.getElementById("error-password-input").style.display = "inline";
      document.getElementById("error-password-input").innerHTML = "Please enter a password.";
      document.getElementById("password-employee").style.borderColor = "red";
    }
  
    if(!validateName(name)){
      document.getElementById("error-name-input").style.display = "inline";
      document.getElementById("error-name-input").innerHTML = "Please enter a name.";
      document.getElementById("name-employee").style.borderColor = "red";
    }else{
      document.getElementById("error-name-input").style.display = "";
      document.getElementById("name-employee").style.borderColor = "gray";
      validCount++;
    }
  
    if(!validateName(lastname)){
      document.getElementById("error-first-lastname-input").style.display = "inline";
      document.getElementById("error-first-lastname-input").innerHTML = "Please enter a first last name.";
      document.getElementById("first-last-name-employee").style.borderColor = "red";
    }else{
      document.getElementById("error-first-lastname-input").style.display = "";
      document.getElementById("first-last-name-employee").style.borderColor = "gray";
      validCount++;
    }
  
    if(!validateName(secondlastname)){
      document.getElementById("error-second-lastname-input").style.display = "inline";
      document.getElementById("error-second-lastname-input").innerHTML = "Please enter a second last name.";
      document.getElementById("second-last-name-employee").style.borderColor = "red";
    }else{
      document.getElementById("error-second-lastname-input").style.display = "";
      document.getElementById("second-last-name-employee").style.borderColor = "gray";
      validCount++;
    }
    if(id){
      if(!validateId(id)){
        document.getElementById("error-id-employee").style.display = "inline";
        document.getElementById("error-id-employee").innerHTML = "Id must follow the Costa Rican format.";
        document.getElementById("id-employee").style.borderColor = "red";
      }else{
        document.getElementById("error-id-employee").style.display = "";
        document.getElementById("id-employee").style.borderColor = "gray";
        validCount++;
      }
    }else{
      document.getElementById("error-id-employee").style.display = "inline";
      document.getElementById("error-id-employee").innerHTML = "Please enter an Id.";
      document.getElementById("id-employee").style.borderColor = "red";
    }
    if(contract){
      document.getElementById("error-contract-input").style.display = "";
      document.getElementById("contract-employee").style.borderColor = "gray";
      validCount++;
    }else{
      document.getElementById("error-contract-input").style.display = "inline";
      document.getElementById("error-contract-input").innerHTML = "Please select a type of Contract.";
      document.getElementById("contract-employee").style.borderColor = "red";
    }
    if (validCount ===7){
      return true;
    }else{
      return false;
    }
  }

  export const verifyUser = async (Email) => {
    const seleUrl = `http://localhost:4000/users/${Email}`;
    try {
      const response = await fetch(seleUrl);
      const newData = await response.json();
      if (newData.length === 1) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  export const verifyEmployee = async (Cedula) => {
    const seleUrl = `http://localhost:4000/employee/${Cedula}`;
    try {
      const response = await fetch(seleUrl);
      const newData = await response.json();
      if (newData.length === 1) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  export const back = () => {
    history.push('/employees')
    history.go()
  }

  export const submitEmployee = async (data) => {
    const {activeProject,email,password,name,lastname,secondlastname,id,phoneNumber,
      contract,contractDeadline,hWage,serviceName,serviceValue} = data;
    const user = await verifyUser(email);
    const employee = await verifyEmployee(id);
    const employeeContract = await verifyEmployeeProject(id,activeProject);
      if (user === true && employee === true && employeeContract === true) {
      const createEmployeeFetch = await fetch('http://localhost:4000/employee', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
          body: JSON.stringify({
          NombreProyecto: activeProject,
          Email: email,
          Contrasenia: password,
          Nombre: name,
          Apellido1: lastname,
          Apellido2: secondlastname,
          Cedula: id,
          Telefono: phoneNumber,
          TipoJornada: contract,
          FechaFinContrato: contractDeadline,
          SalarioPorHora: hWage,
          NombreServicio: serviceName,
          ValorServicio: serviceValue,
        }),
      });
    } else {
      alert("There is already an user with those credentials.")
    }
    back()
  }