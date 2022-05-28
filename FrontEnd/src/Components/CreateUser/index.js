import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Slices/user/requests/postLogin";
import { usePostUserFromDatabase } from "./usePostUserFromDatabase";
import { resetErrorMsg } from "../../Slices/user/userSlice";
import { validateEmail, validatePassword } from "../../Validate";
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

  const navigate = useNavigate();
  function handleClick() {
    dispatch(resetErrorMsg());
    resetAllStates();
    navigate("/login");
  }

  return (
    <div>
      <div className="register-bar">
          <div className="register-logo"></div>
          <div className="register-title"> Sign Up </div>
      </div>
        
      <form className="register-full-form">        
        <div className="register-form-full-name">
          <div className="register-animated-input-name">
            <input 
              type="text" 
              id="name-employee" 
              className="register-animated-input-name__input" 
              value = {name} 
              maxLength={15} 
              onChange={(e) => setName(e.target.value)} 
              autocomplete="off" 
              placeholder=" "/>
            <label for="name-employee" className="register-animated-input-name__label"> Name <span className="req">*</span></label>
            <p className="errorForm" id="errorname"></p>
          </div>

          <div className="register-animated-input-name">
            <input 
              type="text" 
              id="first-last-name-employee"
              className="register-animated-input-name__input" 
              value={lastname1} 
              maxLength={15} 
              onChange={(e) => setLastName1(e.target.value)} 
              autocomplete="off" 
              placeholder=" "/>
            <label for="first-last-name-employee" className="register-animated-input-name__label">First Last Name<span className="req">*</span></label>
            <p className="errorForm" id="error-first-lastname-input"></p>
          </div>

          <div className="register-animated-input-name">
            <input 
              type="text" 
              id="second-last-name-employee" 
              className="register-animated-input-name__input" 
              value={lastname2}
              maxLength={15}
              onChange={(e) => setLastName2(e.target.value)}
              autocomplete="off" 
              placeholder=" "/>
            <label for="second-last-name-employee" className="register-animated-input-name__label">Second Last Name<span className="req">*</span></label>
            <p className="errorForm" id="error-second-lastname-input"></p>
          </div>
          
        </div>
        <div className="register-form-id-phone">
          <div className="register-animated-input-id-phone">
            <input 
              type="text" 
              id="id-employee" 
              className="register-animated-input-id-phone__input" 
              value={id} 
              maxLength={15} 
              onChange={(e) => setID(e.target.value)} 
              autocomplete="off" 
              placeholder=" "/>
            <label for="id-employee" className="register-animated-input-id-phone__label">Id<span className="req">*</span></label>
            <p className="errorForm" id="error-id-employee"></p>
          </div>
          <div className="register-animated-input-id-phone">
            <input 
              type="text" 
              id="phone-number" 
              className="register-animated-input-id-phone__input"
              value={phoneNumber}
              maxLength={8}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autocomplete="off" 
              placeholder=" "/>
            <label for="phone-number" className="register-animated-input-id-phone__label">Phone Number<span className="req">*</span></label>
          </div>
        </div>

        <div className="register-form-email-password">
          <div className="register-animated-input-email">
            <input 
              type="text" 
              id="email-employee" 
              className="register-animated-input-email__input" 
              value={email}
              maxLength={50}
              onChange={(e) => { if(validateEmail(e.target.value)) { setEmail(e.target.value)} }}
              autocomplete="off" 
              placeholder=" "/>
            <label for="email-employee" className="register-animated-input-email__label"> Email <span className="req">*</span> </label>
            <p className="errorForm" id="error-email-input"></p>
          </div>
          <div className="register-animated-input-email">
            <input 
              type="password" 
              id="password-employee" 
              className="register-animated-input-email__input" 
              value={password}
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="off" 
              placeholder=" "/>
            <p className="errorForm" id="error-password-input"></p>
            <label for="password-employee" className="register-animated-input-email__label"> Password <span className="req">*</span> </label>
          </div>
        </div>

        <div className="register-btn-box">
          <button className="register-btn-sumbit" >
            Create
          </button>
          <button className="register-btn-cancel" >
            Cancel
          </button>
        </div>

      </form>
      <footer className="logIn-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </div>
  );
};