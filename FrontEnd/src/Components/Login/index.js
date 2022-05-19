import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../Slices/user/requests/postLogin";
import { Navigate, useNavigate} from "react-router-dom";
import { useState } from "react";
import './loginStyle.css';

const LoginComp = () => {
  // Data of the username
  const [username, setUsername] = useState("");
  // Data of the password
  const [password, setPassword] = useState("");

  // To get the state of the user that intent to log in
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch(); 

  let navigate = useNavigate();
  function handleClick() {
    navigate("/register");
  }

  return userIsLoggedIn ? (
    <Navigate to="/home" />
  ) : (
    <div className="logIn-page">
      <div className="logIn-logo"></div>
      <div className="logIn-box">
        <div>
          <input
            className= "logIn-input"
            placeholder="UserName"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className= "logIn-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="logIn-btn-box">
        <button className="logIn-btn-CheckIn" onClick={handleClick}>
          Check In
            {/* <a href="/register" className="logIn-btn-CheckIn-link">Check in</a> */}
          </button>
          <button
            className="logIn-btn-login"
            onClick={() => {
              dispatch(postLogin({ username, password }));
            }}
          >
            Log In
          </button>
        </div>
        {
          errorMessage && (
            <span className="logIn-error-message" >{errorMessage}</span>
          )
        }
      </div>
      <footer className="logIn-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </div>
  );
}
  
export default LoginComp;
