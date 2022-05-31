import React, { useState, useEffect } from 'react'
import { useAddNewProject } from './useAddNewProject';

import "./createProject.scss";
export const CreateProjectsForm = (actualData, setActualData) => {
  // const { addToTable, name, setName, paymentPeriod, setPaymentPeriod, warning, setWarning,
  //   benefitsMaxAmount, setBenefitsMaxAmount,
  //   maxQuantityOfBenefits, setMaxQuantityOfBenefits } = useAddNewProject(actualData, setActualData);

  const initialValues = { projectName: "", paymentPeriod: "Mensual", maxBenefitsQuantity: '', maxBenefitsMoneyAmount: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
    console.log(formValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, isSubmit, formValues]);

  const validate = (values) => {
    const errors = {};
    const regex = '';
    if (values.projectName === '') {
      errors.projectName = 'Project Name is Required';
    }
    if (!values.maxBenefitsQuantity) {
      errors.maxBenefitsQuantity = 'Max Benefits Quantity Required';
    }
    if (!values.maxBenefitsMoneyAmount) {
      errors.maxBenefitsMoneyAmount = 'Max Money on Benefits Per Employe Required';
    }
    return errors;
  }

  return (
    <>
      <div className="project-bar">
        <div className="project-logo"></div>
        <div className="project-title"> Create New Project </div>
      </div>

      <form className="form">

        <div className='row' >
          <div className="row-Element">
            <input
              type="text"
              id="projectName"
              className="row-Element__input"
              value={formValues.projectName}
              onChange={handleFormChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="projectName" className='row-Element__label'> Project Name <span className="req">*</span></label>
            <p className='error' >{formErrors.projectName}</p>
          </div>

          <div className='row-Element'>
            <select id='paymentPeriod' className='row-Element__dropDown' onChange={handleFormChange} name="paymentPeriod">
              <option value='hola'>Mensual</option>
              <option value='Quincenal'>Quincenal</option>
              <option value='Quincenal'>Semanal</option>
            </select>
            <label htmlFor="paymentPeriod" className="row-Element__dropDown__label"> Payment Period <span className="req">*</span></label>
          </div>
        </div>

        <div className='row' >
          <div className="row-Element">
            <input
              type="number"
              id="maxBenefitsQuantity"
              className="row-Element__input"
              value={formValues.maxBenefitsQuantity}
              onChange={handleFormChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="maxBenefitsQuantity" className="row-Element__label"> Max Benefits Quantity <span className="req"     >*</span></label>
            <p>{formErrors.maxBenefitsQuantity}</p>
          </div>

          <div className="row-Element">
            <input
              type="number"
              id="maxBenefitsMoneyAmount"
              className="row-Element__input"
              value={formValues.maxBenefitsMoneyAmount}
              onChange={handleFormChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="maxBenefitsMoneyAmount" className="row-Element__label"> Max $ On Benefits Per Employee <span className="req">*</span></label>
            <p>{formErrors.maxBenefitsMoneyAmount}</p>
          </div>
        </div>

        <div className="register-btn-box">
          <button onClick={handleSubmit} className="register-btn-sumbit" >
            Create
          </button>
          <button className="register-btn-cancel" >
            Cancel
          </button>
        </div>

      </form>
      <footer className="logIn-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </>

  )
}
