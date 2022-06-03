import '../../App.css'
import './CreateVolDeduction.scss'
import { usePostToDatabase } from "./usePostToDatabase";
import validate from './volDedutionValidations';
import useForm from '../../shared/hooks/useForm'
import { useNavigate } from "react-router-dom";
import { useGetVolDeductionsFromDatabase } from './useGetVolDeductionsFromDatabase';
import { maskCurrency } from '../../shared/moneyFormatTransform';


export const CreateVolDeduction = () => {
  const { verifyNames } = useGetVolDeductionsFromDatabase();
  const { submitVolDeduction } = usePostToDatabase();
  const navigate = useNavigate();

  const submit = async () => {
    const notExit = await verifyNames(formValues.Name);
    if (notExit === true) {
      submitVolDeduction(formValues.Name, formValues.Cost, formValues.Description);
      navigate("/VolDeductions")
    } else {
      alert("That voluntary deduction already exists")
    }
  }

  const { formValues, handleInputChange, handleSubmit, errors } = useForm(submit, validate);
  return (
    <>
      <div className="volDeductions-form">
        <div className="form-title">
          <div className="image-volDeduction"></div>
          Create Voluntary Deduction
        </div>
        <div className="form-group-volDeductions">
          <div className='Name-input'>
            <div className="animated-input">
              <input
                type="text"
                id="Name"
                className="animated-input__input"
                autoComplete="off"
                placeholder=" "
                maxLength={50}
                value={formValues.Name || ''}
                onChange={handleInputChange} />
              <label htmlFor="Name" className="animated-input__label">Name<span className="req">*</span></label>
              </div>
            <label  className = 'error-message' > {errors.Name} </label>
          </div>
          <div className='Cost-input'>
            <div className="animated-input">
              <input
                type="text"
                id="Cost"
                className="animated-input__input"
                autoComplete="off"
                placeholder=" "
                maxLength={50}
                value={formValues.Cost || ''}
                onChange={(e) => { handleInputChange(maskCurrency(e)) }} ></input>
              <label htmlFor="Cost" className="animated-input__label">Cost<span className="req">*</span></label>
            </div>
            <label  className = 'error-message' > {errors.Cost} </label>
          </div>
        </div>
        <div className="animated-input">
          <textarea
            type="text"
            id="Description"
            className="animated-input__textarea"
            autoComplete="off" 
            placeholder=" "
            maxLength={300}
            value={formValues.Description || ''}
            onChange={handleInputChange} />
          <label htmlFor="Description" className="animated-input__label">Description</label>
          <label  className = 'error' > {errors.Description} </label>
        </div>
        <div className="buttons">
          <button
            className="create-volDeduction-btn"
            onClick={handleSubmit}>
            create
          </button>
          <button
            className="cancel-volDeduction-btn"
            onClick={() => { navigate("/volDeductions") }}>
            cancel
          </button>
        </div>
      </div>
    </>
  )
};
