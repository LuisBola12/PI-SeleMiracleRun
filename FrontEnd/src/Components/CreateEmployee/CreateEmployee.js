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
  const [serviceValue, setserviceValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceCSS, setServiceCSS] = useState("forms-create-employee-service");
  const [otherContractCSS, setOtherContractCSS] = useState("forms-create-employee-hwage");

  const validateForm = () =>{
    let validCount =0;
    if(email){
      if(!validateEmail(email)){
        document.getElementById("email-employee").display = "inline";
        document.getElementById("email-employee").innerHTML = "You must enter a valid format for an email.";
        document.getElementById("error-email-input").style.borderColor = "red";
      }
      document.getElementById("email-employee").style.borderColor = "black";
      validCount++;
    }else{
      document.getElementById("email-employee").style.borderColor = "red";
    }
    if(password){
      if(!validatePassword(password)){
        document.getElementById("error-password-input").display = "inline";
        document.getElementById("error-password-input").innerHTML = "Password must be 6 characters longer and have at least 2 words.";
        document.getElementById("password-employee").style.borderColor = "red";
      }
      document.getElementById("password-employee").style.borderColor = "black";
      validCount++;
    }else{
      document.getElementById("password-employee").style.borderColor = "red";
    }
    if(!validateName(name)){
      document.getElementById("error-name-input").display = "inline";
      document.getElementById("error-name-input").innerHTML = "Please enter a name.";
      document.getElementById("name-employee").style.borderColor = "red";
    }else{
      document.getElementById("name-employee").style.borderColor = "black";
      validCount++;
    }
    if(!validateName(lastname)){
      document.getElementById("error-first-lastname-input").display = "inline";
      document.getElementById("error-first-lastname-input").innerHTML = "Please enter a first last name.";
      document.getElementById("first-last-name-employee").style.borderColor = "red";
    }else{
      document.getElementById("first-last-name-employee").style.borderColor = "black";
      validCount++;
    }
    if(!validateName(secondlastname)){
      document.getElementById("error-second-lastname-input").display = "inline";
      document.getElementById("error-second-lastname-input").innerHTML = "Please enter a second last name.";
      document.getElementById("second-last-name-employee").style.borderColor = "red";
    }else{
      document.getElementById("second-last-name-employee").style.borderColor = "black";
      validCount++;
    }
    if(id){
      if(!validateId(id)){
        document.getElementById("error-id-employee").display = "inline";
        document.getElementById("error-id-employee").innerHTML = "Id must follow the Costa Rica formt.";
        document.getElementById("id-employee").style.borderColor = "red";
      }
      document.getElementById("id-employee").style.borderColor = "black";
      validCount++;
    }else{
      document.getElementById("error-id-employee").display = "inline";
      document.getElementById("error-id-employee").innerHTML = "Please enter an Id.";
      document.getElementById("id-employee").style.borderColor = "red";
    }
    if(contract){
      document.getElementById("contract-employee").style.borderColor = "black";
      validCount++;
    }else{
      document.getElementById("error-contract-input").display = "inline";
      document.getElementById("error-contract-input").innerHTML = "Please enter a Type of Contract.";
      document.getElementById("contract-employee").style.borderColor = "red";
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
    if (email && email.trim().length > 0 && password && password.trim().length > 0
      && name && name.trim().length > 0 && lastname && lastname.trim().length > 0
      && secondlastname.trim().length > 0 && secondlastname && id && contract) {
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
    } else {
      alert("There are inputs that need to be filled in order to create an employee.");
    }
    resetAllStates();
    history.push('/employees')
    history.go()
  }
  const setContractOption = (e) => {
    setContract(e.target.value);
    if (e.target.value === "Servicios Profesionales") {
      setOtherContractCSS("forms-create-employee-hwage")
      setServiceCSS("forms-create-employee-service2")
    } else {
      setOtherContractCSS("forms-create-employee-hwage2")
      setServiceCSS("forms-create-employee-service")
    }
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
      <form className="employees-form">
        <div className="form-title-employee">
          <div className="image-employee"></div>
          Create Employee
        </div>
        <div className="form-name-employee">
          <div className="animated-input-employee">
            <input type="text" id="name-employee" className="animated-input-employee__input" value = {name} 
            maxLength={15} onChange={(e) => setName(e.target.value)} autocomplete="off" placeholder=" "></input>
            <label for="Name" className="animated-input-employee__label">Name<span className="req">*</span></label>
            <p className="errorForm" id="errorname"></p>
          </div>

          <div className="animated-input-employee">
            <input type="text" id="first-last-name-employee" className="animated-input-employee__input" 
            value={lastname} maxLength={15} onChange={(e) => setLastName(e.target.value)} autocomplete="off" placeholder=" "></input>
            <label for="first-last-name-employee" className="animated-input-employee__label">First Last Name<span className="req">*</span></label>
            <p className="errorForm" id="error-first-lastname-input"></p>
          </div>

          <div className="animated-input-employee">
            
            <input type="text" id="second-last-name-employee" className="animated-input-employee__input" 
            value={secondlastname}maxLength={15}onChange={(e) => setSecondLastName(e.target.value)}autocomplete="off" placeholder=" "></input>
            <label for="second-last-name-employee" className="animated-input-employee__label">Second Last Name<span className="req">*</span></label>
            <p className="errorForm" id="error-second-lastname-input"></p>
          </div>
        </div>
        <div className="form-id-phone-employee">
          <div className="animated-input-employee-id">
            <input type="text" id="id-employee" className="animated-input-employee-id__input" 
            value={id}
            maxLength={15}
            onChange={(e) => setID(e.target.value)}
            autocomplete="off" placeholder=" "></input>
            <label for="id-employee" className="animated-input-employee-id__label">Id<span className="req">*</span></label>
            <p className="errorForm" id="error-id-employee"></p>
          </div>
          <div className="animated-input-employee-id">
            <input type="number" id="phone-number" className="animated-input-employee-id__input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autocomplete="off" placeholder=" "></input>
            <label for="phone-number" className="animated-input-employee-id__label">Phone Number<span className="req">*</span></label>

          </div>
        </div>
        <div className="form-credentials-employee">
          <div className="animated-input-employee-credentials">
            <input type="text" id="email-employee" className="animated-input-employee-credentials__input" 
            value={email}
            maxLength={50}
            onChange={(e) => setEmail(e.target.value)}
            autocomplete="off" placeholder=" "></input>
            <label for="email-employee" className="animated-input-employee-credentials__label">Email<span className="req">*</span></label>
            <p className="errorForm" id="error-email-input"></p>
          </div>
          <div className="animated-input-employee-credentials">
            <input type="text" id="password-employee" className="animated-input-employee-credentials__input" 
            value={password}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="off" placeholder=" "></input>
            <p className="errorForm" id="error-password-input"></p>
            <label for="password-employee" className="animated-input-employee-credentials__label">Password<span className="req">*</span></label>
          </div>
        </div>
        <div className="form-contract-employee">
          <div className="animated-input-employee-contract">
          <select id="contract-employee" className="animated-input-employee-contract__input"
          onChange={(e) => {
            setContractOption(e);
            }}>
          {typeOfContracts.map((element) => (
            <option key={element.TipoJornada} value={element.TipoJornada}>{element.TipoJornada}</option>
          ))}
          </select>
          <label for="contract-employee" className="animated-input-employee-contract__label">Type of Contract<span className="req">*</span></label>
          </div>
          <p className="errorForm" id="error-contract-input"></p>
        </div>
        <div className="buttons">
          <button className="create-benefit-btn" >
            create
          </button>
          <button className="cancel-benefit-btn" >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};
