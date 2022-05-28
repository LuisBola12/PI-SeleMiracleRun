import React, { useState, useEffect } from "react";
import history from "../../history";
import { useSelector } from 'react-redux';
import './CreateEmployeesStyle.scss'
import { validateEmail, validateId, validateName, validatePassword } from './../../Validate';

export const CreateEmployee = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [email, setEmail] = useState("");
  const [typeOfContracts, setTypeOfContracts] = useState();
  const [contractsReceived, setContractsReceived] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [secondlastname, setSecondLastName] = useState("");
  const [id, setID] = useState("");
  const [contract, setContract] = useState("");
  const [hWage, setHWage] = useState("");
  const [contractDeadline, setContractDeadline] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const validateForm = () =>{
    let validCount =0;
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
  const verifyUser = async (Email) => {
    const seleUrl = `http://localhost:4000/users/${email}`;
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
  const validateAll = () =>{
    const result = validateForm();
    console.log(result)
  }
  const verifyEmployee = async (Cedula) => {
    const seleUrl = `http://localhost:4000/employee/${id}`;
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

  const showContractValues = (e) => {
    setContract(e.target.value)
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

  const verifyEmployeeProject = async () => {
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

  const submitEmployee = async () => {
    const user = await verifyUser();
    const employee = await verifyEmployee();
    const employeeContract = await verifyEmployeeProject();
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
    resetAllStates();
    history.push('/employees')
    history.go()
  }
  const resetAllStates = () => {
    setEmail("");
    setPassword("");
    setName("");
    setLastName("");
    setID("");
    setContract("");
    setHWage("");
    setPhoneNumber("");

  }
  const back = () => {
    resetAllStates();
    history.push('/employees')
    history.go()
  }
  useEffect(() => {
    const fetchTypeContracts = async () => {
      const seleUrl = "http://localhost:4000/typeContracts";
      try {
        const response = await fetch(seleUrl);
        const newData = await response.json();
        setTypeOfContracts(newData);
        setContractsReceived(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTypeContracts();
  }, []);
  return !contractsReceived ? <div className="loader"></div> : (
    <>
      <div className="employees-form">
        <div className="form-title-bar">
          <div className="image-employee"></div>
          <div className="form-title-employee"> Create Employee </div>
        </div>
        <div className="form-name-employee">
          <div>
          <div className="animated-input-employee">
            <input type="text" id="name-employee" className="animated-input-employee__input" value = {name} 
              maxLength={15} onChange={(e) => setName(e.target.value)} autocomplete="off" placeholder=" "></input>
            <label for="Name" className="animated-input-employee__label">Name<span className="req">*</span></label>
          </div>
          <div>
            <p className="errorForm" id="error-name-input"></p>
          </div>
          </div>

        <div>
            <div className="animated-input-employee">
              <input type="text" id="first-last-name-employee" className="animated-input-employee__input" 
                value={lastname} maxLength={15} onChange={(e) => setLastName(e.target.value)} autocomplete="off" placeholder=" "></input>
              <label for="first-last-name-employee" className="animated-input-employee__label">First Last Name<span className="req">*</span></label>
            </div>
            <div>
              <p className="errorForm" id="error-first-lastname-input"></p>
            </div>
        </div>
        <div>
            <div className="animated-input-employee">
              <input type="text" id="second-last-name-employee" className="animated-input-employee__input" 
                value={secondlastname}maxLength={15}onChange={(e) => setSecondLastName(e.target.value)}autocomplete="off" placeholder=" "></input>
              <label for="second-last-name-employee" className="animated-input-employee__label">Second Last Name<span className="req">*</span></label>
            </div>
            <div>
              <p className="errorForm" id="error-second-lastname-input"></p>
            </div>
        </div>
        </div>
        <div className="form-id-phone-employee">
          <div>
            <div className="animated-input-employee-id">
              <input type="text" id="id-employee" className="animated-input-employee-id__input" 
                value={id}
                maxLength={15}
                onChange={(e) => setID(e.target.value)}
                autocomplete="off" placeholder=" "></input>
              <label for="id-employee" className="animated-input-employee-id__label">Id<span className="req">*</span></label>
          </div>
            <div>
              <p className="errorForm" id="error-id-employee"></p>
            </div>
          </div>
          <div className="animated-input-employee-id">
            <input type="number" id="phone-number" className="animated-input-employee-id__input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autocomplete="off" placeholder=" "></input>
            <label for="phone-number" className="animated-input-employee-id__label">Phone Number</label>
          </div>
        </div>
        <div className="form-credentials-employee">
          <div>
            <div className="animated-input-employee-credentials">
              <input type="text" id="email-employee" className="animated-input-employee-credentials__input" 
                value={email}
                maxLength={50}
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="off" placeholder=" "></input>
              <label for="email-employee" className="animated-input-employee-credentials__label">Email<span className="req">*</span></label>
            </div>
            <div>
              <p className="errorForm" id="error-email-input"></p>
            </div>
          </div>
          <div>
            <div className="animated-input-employee-credentials">
              <input type="text" id="password-employee" className="animated-input-employee-credentials__input" 
                value={password}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="off" placeholder=" "></input>
              <label for="password-employee" className="animated-input-employee-credentials__label">Password<span className="req">*</span></label>
            </div>
            <div>
              <p className="errorForm" id="error-password-input"></p>
            </div>
          </div>
        </div>
        <div className="form-contract-employee">
          <div>
            <div className="animated-input-employee-contract">
              <select id="contract-employee" className="animated-input-employee-contract__input"
              onChange={(e) => {
                  showContractValues(e);
                }}
              >
                <option value={""}>Select a Contract <span className="req">*</span></option>
                {typeOfContracts.map((element) => (
                  <option key={element.TipoJornada} value={element.TipoJornada}>{element.TipoJornada}</option>
                ))}
              </select>
              <label for="contract-employee" className="animated-input-employee-contract__label">Type of Contract<span className="req">*</span></label>
          </div>
            <div>
              <p className="errorForm" id="error-contract-input"></p>
            </div>
          </div>
          <div className="animated-input-employee-service-contract">
                <input type="date" id="service-value-employee" className="animated-input-employee-service-contract__input" 
                  value={contractDeadline}
                  maxLength={50}
                  onChange={(e) => setContractDeadline(e.target.value)}
                  autocomplete="off" placeholder=" "></input>
                <label for="service-value-employee" className="animated-input-employee-service-contract__label">Hired Until</label>
          </div>
        </div>
        <div className="form-profesional-contract" id= "profesional service">
            <div className="animated-input-employee-service-contract">
                  <input type="text" id="service-name-employee" className="animated-input-employee-service-contract__input" 
                    value={serviceName}
                    maxLength={50}
                    onChange={(e) => setServiceName(e.target.value)}
                    autocomplete="off" placeholder=" "></input>
                  <label for="service-name-employee" className="animated-input-employee-service-contract__label">Service Name</label>
            </div>
            <div className="animated-input-employee-service-contract">
                <input type="text" id="service-value-employee" className="animated-input-employee-service-contract__input" 
                  value={serviceValue}
                  maxLength={50}
                  onChange={(e) => setServiceValue(e.target.value)}
                  autocomplete="off" placeholder=" "></input>
                <label for="service-value-employee" className="animated-input-employee-service-contract__label">Service Value</label>
          </div>
        </div>
        <div className="form-others-contract" id= "other-contract">
            <div className="animated-input-employee-other-contract">
                  <input type="number" id="service-name-employee" className="animated-input-employee-other-contract__input" 
                    value={hWage}
                    onChange={(e) => setHWage(e.target.value)}
                    autocomplete="off" placeholder=" "></input>
                  <label for="service-name-employee" className="animated-input-employee-other-contract__label">Hourly Wage</label>
            </div>
        </div>
        <div className="buttons-employee">
          <button className="create-employee-btn" 
          onClick={()=>{validateAll()}}>
            create
          </button>
          <button className="cancel-employee-btn" >
            cancel
          </button>
        </div>
      </div>
    </>
  );
};
