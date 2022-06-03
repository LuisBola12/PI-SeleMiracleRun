import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Slices/user/requests/postLogin";
import { usePostUserFromDatabase } from "./usePostUserFromDatabase";
import { resetErrorMsg } from "../../Slices/user/userSlice";
import { validateEmail, validatePassword, validateName, validateId } from "../../Validate";
import './createUserStyle.scss';

export const CreateUser = () => {
  const {registerUser, email, setEmail, password, setPassword, 
        name, setName, lastname1, setLastName1, lastname2, setLastName2, 
        id, setID, phoneNumber, setPhoneNumber, errorMessage, setErrorMessage} = usePostUserFromDatabase();

  const validateForm = () =>{
    let validCount = 0;
    if(email){
      if(!validateEmail(email)){
        document.getElementById("register-error-email").style.display = "inline";
        document.getElementById("register-error-email").innerHTML = "You must enter a valid format for an email.";
        document.getElementById("email-register").style.borderColor = "red";
      }else{
        document.getElementById("register-error-email").style.display = "";
        document.getElementById("email-register").style.borderColor = "gray";
        validCount++;
      }
    }else{
      document.getElementById("register-error-email").style.display = "inline";
      document.getElementById("register-error-email").innerHTML = "Please enter an email.";
      document.getElementById("email-register").style.borderColor = "red";
    }
  
    if(password){
      if(!validatePassword(password)){
        document.getElementById("register-error-password").style.display = "inline";
        document.getElementById("register-error-password").innerHTML = "Password must be 6 characters longer and have at least 2 words.";
        document.getElementById("password-register").style.borderColor = "red";
      }else{
        document.getElementById("register-error-password").style.display = "";
        document.getElementById("password-register").style.borderColor = "gray";
        validCount++;
      }
    }else{
      document.getElementById("register-error-password").style.display = "inline";
      document.getElementById("register-error-password").innerHTML = "Please enter a password.";
      document.getElementById("password-register").style.borderColor = "red";
    }
  
    if(!validateName(name)){
      document.getElementById("register-error-name").style.display = "inline";
      document.getElementById("register-error-name").innerHTML = "Please enter a name.";
      document.getElementById("name-register").style.borderColor = "red";
    }else{
      document.getElementById("register-error-name").style.display = "";
      document.getElementById("name-register").style.borderColor = "gray";
      validCount++;
    }
  
    if(!validateName(lastname1)){
      document.getElementById("register-error-lastname1").style.display = "inline";
      document.getElementById("register-error-lastname1").innerHTML = "Please enter a first last name.";
      document.getElementById("lastname1-register").style.borderColor = "red";
    }else{
      document.getElementById("register-error-lastname1").style.display = "";
      document.getElementById("lastname1-register").style.borderColor = "gray";
      validCount++;
    }
  
    if(!validateName(lastname2)){
      document.getElementById("register-error-lastname2").style.display = "inline";
      document.getElementById("register-error-lastname2").innerHTML = "Please enter a second last name.";
      document.getElementById("lastname2-register").style.borderColor = "red";
    }else{
      document.getElementById("register-error-lastname2").style.display = "";
      document.getElementById("lastname2-register").style.borderColor = "gray";
      validCount++;
    }

    if(id){
      if(!validateId(id)){
        document.getElementById("register-error-ID").style.display = "inline";
        document.getElementById("register-error-ID").innerHTML = "Id must follow the Costa Rican format.";
        document.getElementById("id-register").style.borderColor = "red";
      }else{
        document.getElementById("register-error-ID").style.display = " ";
        document.getElementById("id-register").style.borderColor = "gray";
        validCount++;
      }
    }else{
      document.getElementById("register-error-ID").style.display = "inline";
      document.getElementById("register-error-ID").innerHTML = "Please enter an Id.";
      document.getElementById("id-register").style.borderColor = "red";
    }
    if (validCount === 6){
      return true;
    }else{
      return false;
    }
  }

  const dispatch = useDispatch();
  const submitEmployee = async () =>{
    if(validateForm() === true){
      if(errorMessage !== ""){
        setErrorMessage("");
      }
      const prueba = await registerUser();
      if(prueba === true){
        dispatch(postLogin({ email, password }));
        navigate("/");
      }
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

  const validateAll = () =>{
    const result = validateForm();
    console.log(result)
  }

  return (
    <div>
      <div className="register-bar">
          <div className="register-logo"></div>
          <div className="register-title"> Sign Up </div>
      </div>
        
      <div className="register-full-form">        
        <div className="register-form-full-name">
          <div>
            <div className="register-animated-input-name">
              <input 
                type="text" 
                id="name-register" 
                className="register-animated-input-name__input" 
                value = {name} 
                maxLength={15} 
                onChange={(e) => setName(e.target.value)} 
                autocomplete="off" 
                placeholder=" "/>
              <label for="name-register" className="register-animated-input-name__label"> Name <span className="req">*</span></label>
            </div>
            <div>
              <p className="register-error" id="register-error-name"></p>
            </div>
          </div>

          <div>
            <div className="register-animated-input-name">
              <input 
                type="text" 
                id="lastname1-register"
                className="register-animated-input-name__input" 
                value={lastname1} 
                maxLength={15} 
                onChange={(e) => setLastName1(e.target.value)} 
                autocomplete="off" 
                placeholder=" "/>
              <label for="lastname1-register" className="register-animated-input-name__label">First Last Name<span className="req">*</span></label>
            </div>
            <div>
              <p className="register-error" id="register-error-lastname1"></p>
            </div>
          </div>

          <div>
            <div className="register-animated-input-name">
              <input 
                type="text" 
                id="lastname2-register" 
                className="register-animated-input-name__input" 
                value={lastname2}
                maxLength={15}
                onChange={(e) => setLastName2(e.target.value)}
                autocomplete="off" 
                placeholder=" "/>
              <label for="lastname2-register" className="register-animated-input-name__label">Second Last Name<span className="req">*</span></label>
            </div>
            <div>
                <p className="register-error" id="register-error-lastname2"></p>
            </div>
          </div>          
        </div>
          <div className="register-form-id-phone">
            <div>
            <div className="register-animated-input-id-phone">
              <input 
                type="text" 
                id="id-register" 
                className="register-animated-input-id-phone__input" 
                value={id} 
                maxLength={15} 
                onChange={(e) => setID(e.target.value)} 
                autocomplete="off" 
                placeholder=" "/>
              <label for="id-register" className="register-animated-input-id-phone__label">Id<span className="req">*</span></label>
            </div>
            <div>
              <p className="register-error" id="register-error-ID"></p>
            </div>
          </div>
          <div>
            <div className="register-animated-input-id-phone">
              <input 
                type="text" 
                id="phoneNumber-register" 
                className="register-animated-input-id-phone__input"
                value={phoneNumber}
                maxLength={8}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autocomplete="off" 
                placeholder=" "/>
              <label for="phoneNumber-register" className="register-animated-input-id-phone__label">Phone Number</label>
            </div>
            <div>
              <p className="register-error" id="register-error-phoneNumber"></p>
            </div>
          </div>
        </div>

        <div className="register-form-email-password">
          <div>
            <div className="register-animated-input-email">
              <input 
                type="text" 
                id="email-register" 
                className="register-animated-input-email__input" 
                value={email}
                maxLength={50}
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="off" 
                placeholder=" "/>
              <label for="email-register" className="register-animated-input-email__label"> Email <span className="req">*</span> </label>
            </div>
            <div>
                <p className="register-error" id="register-error-email"></p>
            </div>
          </div>
          <div>
            <div className="register-animated-input-email">
              <input 
                type="password" 
                id="password-register" 
                className="register-animated-input-email__input" 
                value={password}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="off" 
                placeholder=" "/>
              <label for="password-register" className="register-animated-input-email__label"> Password <span className="req">*</span> </label>
            </div>
            <div>
              <p className="register-error" id="register-error-password"></p>
            </div>
          </div>
        </div>

        <div className="register-btn-box">
          <button className="register-btn-sumbit" onClick={()=>{validateAll()}}>
            Create
          </button>
          <button className="register-btn-cancel" onClick={handleClick}>
            Cancel
          </button>
        </div>
      </div>
      <footer className="register-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </div>
  );
};