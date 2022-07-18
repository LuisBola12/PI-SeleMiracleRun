import { React, useState, useEffect } from "react";
import { putVerificationUser } from "../../Utils/CreateUser/putVerificationUser";
import "../../App.css";
import "./VerificationComp.scss";
import { IconContext } from "react-icons";
import { BsCheck2Circle } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const VerificationComp = () => {
  const [infoReceived, setInfoReceived] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const getEmail = () => {
    const userUrl = window.location.href;
    const start = userUrl.indexOf("=");
    const end = userUrl.length;
    let userEmail = userUrl.slice(start + 1, end);
    return userEmail;
  };

  const verificateUser = async () => {
    const data = await putVerificationUser(getEmail());
    if (data.status === 200) {
      setInfoReceived(true);
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  useEffect(() => {
    verificateUser();
  }, []);

  return !infoReceived ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="verification-page">
        <div className="register-bar">
          <div className="register-logo"></div>
          <div className="register-title"> Sele Miracle Run </div>
        </div>        
        {verified ? (
          <>
            <h2 className="verify-text">
              Your SeleMiracleRun accunt has been verified.
            </h2>
            <IconContext.Provider
              value={{
                color: "green",
                className: "icon",
                size: "10rem",
              }}
            >
              <BsCheck2Circle />
            </IconContext.Provider>
            <div>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="create-button verify-btn-login"
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="verify-text">
              An error occurr during the verification process.
            </h2>
            <IconContext.Provider
              value={{
                color: "darkred",
                className: "icon",
                size: "10rem",
              }}
            >
              <BiErrorCircle />
            </IconContext.Provider>
            <div>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="create-button verify-btn-login"
              >
                {" "}
                Login{" "}
              </button>
              <button
                onClick={() => {
                  verificateUser();
                }}
                className="create-button verify-btn-resend"
              >
                {" "}
                Resend Email{" "}
              </button>
            </div>
          </>
        )}

        <footer className="register-footerCopyRights">
          {" "}
          &copy; SeleMiracleRun{" "}
        </footer>
      </div>
    </>
  );
};

{/* <h2>
<b>Almost done, jdvenegas50!</b>
</h2>
<div
style={{
  border: "solid gray 1px",
  width: "500px",
  "padding-top": "20px",
}}
>
<div style={{ "margin-bottom": "50px" }}>
  To secure your SeleMiracleRun account, you just need to verify your
  email address.
</div>
<div>
  <a
    style={{
      border: "solid gray 1px",
      'text-decoration': 'none',
      color: 'white',
      padding: '8px 30px',
      background: 'darkgreen',
     'border-radius': '8px',
     'margin-bottom': '100px'
    }}
    href="http://localhost:3000/verification?emial=jdvenegas50@gmail.com"
  >
    {" "}
    Verify Email{" "}
  </a>{" "}
</div>
</div> */}