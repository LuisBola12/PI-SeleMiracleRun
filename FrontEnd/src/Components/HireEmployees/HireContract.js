import { React, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "./../../shared/hooks/useForm";
import { useGetTypeOfContracts } from "../../Utils/HireAEmployee/useGetTypeOfContracts";
import { showContractValues } from "../../Utils/CreateEmployee/CreateEmployee";

export const HireContract = () => {
  const navigate = useNavigate();
  const {
    formValues,
    handleInputChange,
    handleSubmit,
    errors,
    setIsSubmitting,
  } = useForm();
  const back = () => {
    navigate(-1);
  };
  const { typeOfContracts, contractsReceived } = useGetTypeOfContracts();

  return !contractsReceived ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="hire-header">
        <div className="hire-header-title">
          <div className="image-employee"></div>
          Hire Employee
        </div>
      </div>

      <div className="form-contract-employee">
        <div>
          <div className="animated-input-employee-contract">
            <select
              id="contract"
              className="animated-input-employee-contract__input"
              value={formValues.contract || ""}
              onChange={(e) => {
                handleInputChange(e);
                showContractValues(e);
              }}
            >
              <option value={""}>Select a Contract </option>
              {typeOfContracts.map((element) => (
                <option key={element.TipoJornada} value={element.TipoJornada}>
                  {element.TipoJornada}
                </option>
              ))}
            </select>
            <label
              htmlFor="contract"
              className="animated-input-employee-contract__label"
            >
              Type of Contract<span className="req">*</span>
            </label>
          </div>
          <div>
            <p className="errorForm" id="error-contract-input">
              {errors.contract}
            </p>
          </div>
          <div className="animated-input-employee-service-contract">
            <input
              type="date"
              id="contractDeadline"
              className="animated-input-employee-service-contract__input"
              value={formValues.contractDeadline || ""}
              maxLength={50}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder=" "
            ></input>
            <label
              htmlFor="contractDeadline"
              className="animated-input-employee-service-contract__label"
            >
              Hired Until
            </label>
          </div>
          <div className="form-profesional-contract" id="profesional service">
            <div className="animated-input-employee-service-contract">
              <input
                type="text"
                id="serviceName"
                className="animated-input-employee-service-contract__input"
                value={formValues.serviceName}
                maxLength={50}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder=" "
              ></input>
              <label
                htmlFor="serviceName"
                className="animated-input-employee-service-contract__label"
              >
                Service Name
              </label>
            </div>
            <div className="animated-input-employee-service-contract">
              <input
                type="text"
                id="serviceValue"
                className="animated-input-employee-service-contract__input"
                value={formValues.serviceValue}
                maxLength={50}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder=" "
              ></input>
              <label
                htmlFor="serviceValue"
                className="animated-input-employee-service-contract__label"
              >
                Service Value
              </label>
            </div>
          </div>
          <div className="form-others-contract" id="other-contract">
            <div className="animated-input-employee-other-contract">
              <input
                type="number"
                id="hWage"
                className="animated-input-employee-other-contract__input"
                value={formValues.hWage || ""}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder=" "
              ></input>
              <label
                htmlFor="hWage"
                className="animated-input-employee-other-contract__label"
              >
                Hourly Wage
              </label>
            </div>
          </div>
          <div className="buttons-employee">
            <button className="create-employee-btn" onClick={handleSubmit}>
              Create
            </button>
            <button
              className="cancel-employee-btn"
              onClick={() => {
                back();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
