import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import './createUserStyle.css';
// import history from "../../history";

export const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [lastname1, setLastName1] = useState("");
  const [lastname2, setLastName2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const verifyUser = async (Email) => {
    const seleUrl = `http://localhost:4000/users/${Email}`;
    try {
      const response = await fetch(seleUrl);
      const newData = await response.json();
      if(newData.length === 1){
        return false;
      }else{
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verifyEmployee = async (Cedula) => {
    const seleUrl = `http://localhost:4000/employer/${Cedula}`;
    try {
      const response = await fetch(seleUrl);
      const newData = await response.json();
      if(newData.length === 1){
        return false;
      }else{
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const registerUser = async () => {
    const user = await verifyUser(email);
    const employee = await verifyEmployee(id);
    console.log(`${user} y ${employee}`)
    if( user === true && employee === true ){
      
      const registerFetch = await fetch('http://localhost:4000/createEmployer', 
      {
          method: 'POST',
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify({
              Cedula : id, 
              Nombre : name, 
              Apellido1 : lastname1, 
              Apellido2 : lastname2, 
              Telefono : phoneNumber,
              Email : email,
              Contrasenia: password
          }),
      });
      console.log(registerFetch);
    }
  }

  const submitEmployee = () =>{
    const newEmployee = {email:email, password:password, name:name, lastname1:lastname1, lastname2:lastname2, id:id, phoneNumber:phoneNumber};
    console.log(newEmployee);
    registerUser();
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

  let navigate = useNavigate();
  function handleClick() {
    resetAllStates();
    navigate("/login");
  }

  return (
    <div className="register-page">
      <div className="register-bar">
        <label className="register-logo"></label>
        <label className="register-title">
          Sign Up
        </label>
      </div>

      <div className="register-box">
        <div className="register-full-name">
          <FormGroup>
              <div className="register-title-atribute">First Name</div>
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
          <div className="register-title-atribute">First Last Name</div>
            <input
              className="register-atribute-input"
              type="text"
              id="last-name"
              placeholder="First Last Name"
              value={lastname1}
              onChange={(e) => setLastName1(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <div className="register-title-atribute">Second Last Name</div>
            <input
              className="register-atribute-input"
              type="text"
              id="last-name"
              placeholder="Second Last Name"
              value={lastname2}
              onChange={(e) => setLastName2(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="register-id-phone">
          <FormGroup>
          <div className="register-title-atribute">ID Card</div>
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
          <div className="register-title-atribute">Phone Number</div>
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
          <div className="register-title-atribute">Email</div>
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
          <div className="register-title-atribute">Password</div>
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
          <button className="register-submit-cancel" onClick={handleClick}>
            Cancel
          </button>
        </div>
      </div>
      <footer className="register-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </div>
  );
};