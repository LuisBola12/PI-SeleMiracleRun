import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import user_icon from "./user_icon2.png";

export const CreateEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [id, setID] = useState("");
  const [contract, setContract] = useState("");
  const [hWage, setHWage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  return (
    <>
      <div className="user-head">
        <img className="user-img" alt="user" src={user_icon}></img>
        <p className="user-tag">New Employee</p>
      </div>
      <div className="form-group">
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
          <label className="employee-label" htmlFor="contract">
            Type of Contract:{" "}
          </label>
          <select
            className="dropdown-Contract"
            name="Contract"
            id="Contract"
            onSelect={(e) => setContract(e.target.value)}
          >
            <option value="Tiempo Completo">Tiempo Completo</option>
            <option value="Medio Tiempo">Medio Tiempo</option>
            <option value="Por Horas">Por Horas</option>
            <option value="Servicios Profesionales">
              Servicios Profesionales
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
          <label className="employee-label" htmlFor="address">
            Address:{" "}
          </label>
          <input
            className="employee-input-address"
            type="text"
            id="address"
            placeholder="Enter an Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
      </div>
    </>
  );
};
