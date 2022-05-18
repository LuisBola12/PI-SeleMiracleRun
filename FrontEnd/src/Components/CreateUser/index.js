import React, { useState } from "react";
import { Button, FormGroup } from "reactstrap";
import './style.css';
// import history from "../../history";

export const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [lastname1, setLastName1] = useState("");
  const [lastname2, setLastName2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const submitEmployee = () =>{
    const newEmployee = {email:email,password:password,name:name,lastname1:lastname1,lastname2:lastname2,id:id,phoneNumber:phoneNumber};
    console.log(newEmployee);
  }

  const resetAllStates = () =>{
    setEmail("");
    setPassword("");
    setName("");
    setLastName1("");
    setLastName2("");
    setID("");
    setPhoneNumber("");
  }

  // const back = () =>{
  //   resetAllStates();
  //   history.push('/employees')
  //   history.go()
  // }

  return (
    <div className="register-page">
      <div className="register-title">
        New User
      </div>

      <div className="register-box">
        <div className="register-full-name">
          <FormGroup>
              <div className="title-atribute">First Name</div>
              <input
                className="register-atribute-input"
                type="text"
                id="name"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />  
          </FormGroup>
          <FormGroup>
          <div className="title-atribute">Last Name1</div>
            <input
              className="register-atribute-input"
              type="text"
              id="last-name"
              placeholder="Last Name1"
              value={lastname1}
              onChange={(e) => setLastName1(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <div className="title-atribute">Last Name2</div>
            <input
              className="register-atribute-input"
              type="text"
              id="last-name"
              placeholder="Last Name2"
              value={lastname2}
              onChange={(e) => setLastName2(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="register-id-phone">
          <FormGroup>
          <div className="title-atribute">ID Card</div>
            <input
              className="register-atribute-input"
              type="text"
              id="id-card"
              placeholder="ID Card"
              value={id}
              onChange={(e) => setID(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
          <div className="title-atribute">Phone Number</div>
          <input
            className="register-atribute-input"
            type="text"
            id="phone-number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        </div>
        <div className="register-email-password">
          <FormGroup>
          <div className="title-atribute">Email</div>
            <input
              className="register-atribute-input"
              type="text"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <div className="title-atribute">Password</div>
            <input
              className="register-atribute-input"
              type="text"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="register-submit-btn-box">
          <button className="register-submit-btn" onClick={()=>{submitEmployee()}}>
            Submit
          </button>
        </div>
        
      {/* <button className="back-btn-employee" onClick={()=>{back()}}>
          Back
      </button> */}
      </div>
      <div className="submit-cancel-employee">
      </div>
    </div>
  );
};