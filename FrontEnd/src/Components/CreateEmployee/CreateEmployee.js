import React, { useState } from "react";
import { Button, FormGroup } from "reactstrap";
import user_icon from "./user_icon2.png";
import history from "../../history";

export const CreateEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [id, setID] = useState("");
  const [contract, setContract] = useState("Full Time");
  const [hWage, setHWage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const submitEmployee = () =>{
    const newEmployee = {email:email,password:password,name:name,lastname:lastname,id:id,contract:contract,hourlyWage:hWage,phoneNumber:phoneNumber,address:address};
    console.log(newEmployee);
  }
  const resetAllStates = () =>{
    setEmail("");
    setPassword("");
    setName("");
    setLastName("");
    setID("");
    setContract("");
    setHWage("");
    setPhoneNumber("");
    setAddress("");
  }
  const back = () =>{
    resetAllStates();
    history.push('/employees')
    history.go()
  }
  return (
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="password"
            placeholder="Enter a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="contract">
            Type of Contract:{" "}
          </label>
          <select
            className="dropdown-Contract"
            name="Contract"
            id="Contract"
            value={contract}
            onChange={(e)=>setContract(e.target.value)}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time ">Part Time </option>
            <option value="Hourly ">Hourly </option>
            <option value="Professional Service ">
              Professional Service 
            </option>
          </select>
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="hourly-wage">
            Hourly Wage:{" "}
          </label>

          <input
            className="employee-input"
            type="text"
            id="hourly-wage"
            placeholder="Enter a Hourly Wage"
            value={hWage}
            onChange={(e) => setHWage(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <label className="employee-label" htmlFor="phone-number">
            Phone Number:{" "}
          </label>
          <input
            className="employee-input"
            type="text"
            id="phone-number"
            placeholder="Enter a Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="forms-create-employee">
          <div className="employee-address-div">
          <label className="employee-label" htmlFor="address">
            Address:{" "}
          </label>
          <textarea className= "employee-input-address" name="textarea" rows="5" cols="50" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder = "Enter an Address">Write something here</textarea>
          </div>
        </FormGroup>
        <button className="submit-btn-employee" onClick={()=>{submitEmployee()}}>
          Submit
      </button>
      <button className="back-btn-employee" onClick={()=>{back()}}>
          Back
      </button>
      </div>
      <div className="submit-cancel-employee">
      </div>
    </>
  );
};
