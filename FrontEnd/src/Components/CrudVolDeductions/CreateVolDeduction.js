import '../../App.css'
import './CreateVolDeduction.scss'
import { usePostToDatabase } from "./usePostToDatabase";
import validate from './volDedutionValidations';
import useForm from '../../shared/hooks/useForm'
import { useNavigate } from "react-router-dom";
import { useGetVolDeductionsFromDatabase } from './useGetVolDeductionsFromDatabase';


export const CreateVolDeduction = () => {
  //const { formValues, handleInputChange, handleSubmit, errors } = useForm();
  //const { name, setName, cost, setCost, description, setDescription, submitVolDeduction } = usePostToDatabase();
  const { verifyNames } = useGetVolDeductionsFromDatabase();
  const navigate = useNavigate();

  const submit = async () => {
    //const notExit = await verifyNames(name);
    //if (notExit === true) {
      //submitVolDeduction();
      //setName("");
      //setCost("");
      //setDescription("");
      navigate("/VolDeductions")
    //} else {
    //  alert("Deducción voluntaria existente")
    //}
  }

  const { formValues, handleInputChange, handleSubmit, errors } = useForm(submit, validate);

  const cheackNumber = (value) => {
    return String(value).toLowerCase().match(/^[0-9]*$/)
  }
  return (
    <>
      <div className="volDeductions-form">
        <div className="form-title">
          <div className="image-volDeduction"></div>
          Create Voluntary Deduction
        </div>
        <div className="form-group-volDeductions">
          <div className="animated-input">
            <input
              type="text"
              id="Name"
              className="animated-input__input"
              autoComplete="off"
              placeholder=" "
              value={formValues.Name || ''}
              onChange={handleInputChange} />
            <label htmlFor="Name" className="animated-input__label">Name<span className="req">*</span></label>
            <label  className = 'error' > {errors.Name} </label>
          </div>

          <div className="animated-input">
            <input
              type="text"
              id="Cost"
              className="animated-input__input"
              autoComplete="off"
              placeholder=" "
              value={formValues.Cost || ''}
              onChange={handleInputChange} />
            <label htmlFor="Cost" className="animated-input__label">Cost<span className="req">*</span></label>
            <label  className = 'error' > {errors.Cost} </label>
          </div>
        </div>
        <div className="animated-input">
          <textarea
            type="text"
            id="Description"
            className="animated-input__textarea"
            autoComplete="off" 
            placeholder=" "
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
