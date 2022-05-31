import React, { useState, useEffect } from 'react'
import { useAddNewProject } from './useAddNewProject';
import { useNavigate } from 'react-router-dom';
import "./createProject.scss";
export const CreateProjectsForm = (actualData, setActualData) => {
  // const { addToTable, name, setName, paymentPeriod, setPaymentPeriod, warning, setWarning,
  //   benefitsMaxAmount, setBenefitsMaxAmount,
  //   maxQuantityOfBenefits, setMaxQuantityOfBenefits } = useAddNewProject(actualData, setActualData);

  const initialValues = {
    projectName: "", paymentPeriod: "Mensual",
    maxBenefitsQuantity: '', maxBenefitsMoneyAmount: '', description: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
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
      errors.maxBenefitsMoneyAmount = 'Max Money in Benefits Per employee';
    }
    if (!values.description) {
      errors.description = 'Description required';
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
            <input type="text" id="projectName" className="row-Element__input" value={formValues.projectName}
              onChange={handleFormChange} autoComplete="off" placeholder=" " />
            <label htmlFor="projectName" className='row-Element__label'> Project Name <span className="req">*</span></label>
            <p className='error' >{formErrors.projectName}</p>
          </div>

          <div className='row-Element'>
            <select id='paymentPeriod' className='row-Element__dropDown' onChange={handleFormChange} name="paymentPeriod">
              <option value='Mensual'>Mensual</option>
              <option value='Quincenal'>Quincenal</option>
              <option value='Quincenal'>Semanal</option>
            </select>
            <label htmlFor="paymentPeriod" className="row-Element__dropDown__label"> Payment Period <span className="req">*</span></label>

          </div>
        </div>

        <div className='row' >

          <div className="row-Element">
            <input type="number" id="maxBenefitsQuantity" className="row-Element__input" value={formValues.maxBenefitsQuantity}
              onChange={handleFormChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="maxBenefitsQuantity" className="row-Element__label"> Max Benefits Quantity <span className="req"     >*</span></label>
            <p className='error'>{formErrors.maxBenefitsQuantity}</p>
          </div>

          <div className="row-Element">
            <input type="number" id="maxBenefitsMoneyAmount" className="row-Element__input" value={formValues.maxBenefitsMoneyAmount}
              onChange={handleFormChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="maxBenefitsMoneyAmount" className="row-Element__label"> Max Money On Benefits Per Employee <span className="req">*</span></label>
            <p className='error'>{formErrors.maxBenefitsMoneyAmount}</p>
          </div>

        </div>

        <div className='row'>

          <div className="row-Element">

            <textarea type="Description" id="Description" className="row-Element__textArea" autocomplete="off" placeholder=" "></textarea>
            <label htmlFor='Description' for="Description" className="row-Element__label">Description</label>
            <p className='error'>{formErrors.description}</p>

          </div>




        </div>

        <div className='row'>
          <div className="register-btn-box">
            <button onClick={handleSubmit} className="register-btn-sumbit" >
              Create
            </button>
            <button className="register-btn-cancel" onClick={() => navigate(-1)}  >
              Cancel
            </button>
          </div>



        </div>
      </form>
      <footer className="logIn-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </>

  )
}
