import React, { useState, useEffect } from "react";
import './CreateEmployeesStyle.scss';
import { useSelector } from 'react-redux';
import { back, validateForm,showContractValues,submitEmployee} from "../../Utils/CreateEmployee/CreateEmployee";

export const CreateEmployee = () => {
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
  const activeProject = useSelector((state) => state.activeProject.projectName);

  const validateAll = () =>{
    const data = {
      email: email,
      password: password,
      name: name,
      lastname: lastname,
      secondlastname: secondlastname,
      id: id,
      contract: contract,
    }
    const result = validateForm(data);
    if(result){
      const submitData = {
        activeProject:activeProject,email: email,password: password,
        name: name,lastname: lastname,secondlastname: secondlastname,
        id: id,phoneNumber: phoneNumber,contract: contract,
        contractDeadline: contractDeadline,hWage:hWage,
        serviceName:serviceName,serviceValue:serviceValue
      }
      submitEmployee(submitData);
    }
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
                  setContract(e.target.value);
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
            Create
          </button>
          <button className="cancel-employee-btn" onClick={()=>{back()}}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
