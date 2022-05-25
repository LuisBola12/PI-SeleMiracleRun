import React, { useState, useEffect } from "react";
import { FormGroup } from "reactstrap";
import user_icon from "./user_icon2.png";
import history from "../../history";
import { useSelector } from 'react-redux';

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
      <div className="user-head">
        <img className="user-img" alt="user" src={user_icon}></img>
        <p className="user-tag">New Employee</p>
      </div>
      <div className="form-group">
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="name">
            First Name:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="name"
            maxLength={15}
            placeholder="Enter First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="last-name">
            Last Name:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="last-name"
            placeholder="Enter Last Name"
            value={lastname}
            maxLength={15}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="last-name">
            Second Last Name:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="second-last-name"
            placeholder="Enter Second Last Name"
            value={secondlastname}
            maxLength={15}
            onChange={(e) => setSecondLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="id-card">
            ID Card:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="id-card"
            placeholder="Enter an ID Card"
            value={id}
            maxLength={15}
            onChange={(e) => setID(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="email"
            placeholder="Enter an Email Address"
            value={email}
            maxLength={50}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="employee-input"
            type="password"
            id="password"
            placeholder="Enter a Password"
            value={password}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="phone-number">
            Phone Number:{" "}
          </label>
          <input
            className="employee-input"
            type="number"
            id="phone-number"
            placeholder="Enter a Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="contract">
            Type of Contract:{" "}
          </label>
          <select
            className="dropdown-Contract"
            onChange={(e) => {
              setContractOption(e);
            }}
          >
            {typeOfContracts.map((element) => (
              <option key={element.TipoJornada} value={element.TipoJornada}>{element.TipoJornada}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="hourly-wage">
            Hired Until
          </label>
          <input
            className="employee-hired-until"
            type="date"
            value={contractDeadline}
            onChange={(e) => setContractDeadline(e.target.value)}
          />
        </FormGroup>
        <FormGroup className={otherContractCSS}>
          <label className="employee-label" htmlFor="hourly-wage">
            Hourly Wage:{" "}
          </label>
          <input
            className="employee-input"
            type="number"
            id="hourly-wage"
            placeholder="Enter a Hourly Wage"
            value={hWage}
            onChange={(e) => setHWage(e.target.value)}
          />
        </FormGroup>
        <FormGroup className={serviceCSS}>
          <label className="employee-label" htmlFor="hourly-wage">
            Service Name:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            placeholder="Enter a Service Name"
            value={serviceName}
            maxLength={50}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className={serviceCSS}>
          <label className="employee-label" htmlFor="hourly-wage">
            Service Value:{" "}
          </label>
          <input
            className="employee-input"
            type="number"
            placeholder="Enter a Service Value"
            value={serviceValue}
            onChange={(e) => setserviceValue(e.target.value)}
          />
        </FormGroup>

        <button className="submit-btn-employee" onClick={() => { submitEmployee() }}>
          Submit
        </button>
        <button className="back-btn-employee" onClick={() => { back() }}>
          Back
        </button>
      </div>
      <div className="submit-cancel-employee">
      </div>
    </>
  );
};
