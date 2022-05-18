import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../Slices/user/requests/postLogin";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";
import './style.css';

const LoginComp = () => {
  // Data of the username
  const [username, setUsername] = useState("");
  // Data of the password
  const [password, setPassword] = useState("");

  // To get the state of the user that intent to log in
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch(); 

  return userIsLoggedIn ? (
    <Navigate to="/home" />
  ) : (
    <div className="logInpage">
      <div className="logo"></div>
      <div className="logInbox">
        <div>
          <input
            className= "inputText"
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
            className={`inputText`}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="boxButton">
        <button className="buttonCheckIn">
            <a href="/register" className="buttonCheckIn-link">Check in</a>
          </button>
          <button
            className="buttonLogIn"
            onClick={() => {
              dispatch(postLogin({ username, password }));
            }}
          >
            Log In
          </button>
        </div>
        {
          errorMessage && (
            <span className="errorMessage" >{errorMessage}</span>
          )
        }
      </div>
      <footer className="footerCopyRights"> &copy; SeleMiracleRun </footer>
    </div>
  );
}
  
export default LoginComp;
