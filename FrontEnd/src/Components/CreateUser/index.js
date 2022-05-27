import { FormGroup } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Slices/user/requests/postLogin";
import { usePostUserFromDatabase } from "./usePostUserFromDatabase";
import { resetErrorMsg } from "../../Slices/user/userSlice";

import './createUserStyle.scss';

export const CreateUser = () => {
  const {registerUser, email, setEmail, password, setPassword, 
        name, setName, lastname1, setLastName1, lastname2, setLastName2, 
        id, setID, phoneNumber, setPhoneNumber, errorMessage, setErrorMessage} = usePostUserFromDatabase();

  const dispatch = useDispatch();
  const submitEmployee = async () =>{
    if(errorMessage !== ""){
      setErrorMessage("");
    }
    const prueba = await registerUser();
    if(prueba === true){
      dispatch(postLogin({ email, password }));
      navigate("/");
    }
  }

  const resetAllStates = () =>{
    setEmail("");
    setPassword("");
    setName("");
    setLastName1("");
    setLastName2("");
    setID("");
    setPhoneNumber("");
    setErrorMessage("");
  }

  let navigate = useNavigate();
  function handleClick() {
    dispatch(resetErrorMsg());
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
                className="register-atribute-input-name"
                maxLength="15"
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
              className="register-atribute-input-name"
              maxLength="15"
              type="text"
              id="last-name1"
              placeholder="First Last Name"
              value={lastname1}
              onChange={(e) => setLastName1(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <div className="register-title-atribute">Second Last Name</div>
            <input
              className="register-atribute-input-name"
              maxLength="15"
              type="text"
              id="last-name2"
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
              className="register-atribute-input-id"
              maxLength="15"
              type="text"
              id="id-card"
              placeholder="ID Card"
              value={id}
              onChange={(e) => setID(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
          <input
            className="register-atribute-input-id"
            maxLength="8"
            type="text"
            id="phone-number"
            placeholder=" "
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
           <label for="phone-number" className="register-label">Phone Number</label>
        </FormGroup>
        </div>
        <div className="register-email-password">
          <FormGroup>
          <div className="register-title-atribute">Email</div>
            <input
              className="register-atribute-input-email"
              maxLength="50"
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
              className="register-atribute-input-email"
              maxLength="20"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="register-submit-btn-box">
          <button className="register-submit-btn" onClick={()=>{submitEmployee()}}>
            Sign Up
          </button>
          <button className="register-cancel" onClick={handleClick}>
            Cancel
          </button>
        </div>
          {
          errorMessage && (
            <span className="register-errorMessage">{errorMessage}</span>
          )
          }
      </div>
      <footer className="register-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </div>
  );
};