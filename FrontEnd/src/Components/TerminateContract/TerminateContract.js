import { React, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./TerminateContract.scss";
import { useSelector } from "react-redux";
import usePost from './../../shared/hooks/usePost';
export const TerminateContract = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [employeevalues, setEmployeeValues] = useState({});
  const [reasonOfEndContract, setReasonOfEndContract] = useState("");
  const post = usePost('http://localhost:4000/deleteEmployee')
  const location = useLocation();
  const handleSend = () =>{

  }
  useEffect(() => {
    setEmployeeValues({
      Nombre: location.state.Nombre,
      Apellido1: location.state.Apellido1,
      Apellido2: location.state.Apellido2,
      Cedula: location.state.Cedula,
      TipoContrato: location.state.TipoContrato,
    });
  }, []);
  return (
    <>
      <div className="form-end-contract">
        <IconContext.Provider
          value={{
            color: "gray",
            className: "global-class-name",
            size: "2.6rem",
          }}
        >
          <button className="back-arrow-button" onClick={() => {}}>
            <FaArrowLeft />
          </button>
        </IconContext.Provider>
        <div className="form-end-contract-title">
          <div className="image-terminateContract"></div>
          <div className="form-terminateContract-employee">
            {" "}
            Termination Of Contract{" "}
          </div>
        </div>
      </div>
      <div className="employee-to-EndContract">
        {`${employeevalues.Nombre} ${employeevalues.Apellido1} ${employeevalues.Apellido2}
           - ${employeevalues.Cedula} - ${employeevalues.TipoContrato}
        `}
      </div>
      <div className="reason-to-end-contract">
        <div className="animated-reason-input">
          <textarea
            id="Description"
            className="animated-reason-input__textarea"
            autoComplete="off"
            placeholder=" "
            value={reasonOfEndContract}
            onChange={(e) => {
              setReasonOfEndContract(e.target.value);
            }}
          ></textarea>
          <label htmlFor="Description" className="animated-reason-input__label">
            Reason
          </label>
          <label className="error-message" id="benefit-description"></label>
        </div>
      </div>
      <div className="buttons-terminate-contract">
        <button className="create-employee-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </>
  );
};
