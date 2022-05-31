import '../../App.css'
import './CreateVolDeduction.scss'
import { usePostToDatabase } from "./usePostToDatabase";
import { useNavigate } from "react-router-dom";
import { useGetVolDeductionsFromDatabase } from './useGetVolDeductionsFromDatabase';


export const CreateVolDeduction = () => {
  const { name, setName, cost, setCost, description, setDescription, submitVolDeduction } = usePostToDatabase();
  const { verifyNames } = useGetVolDeductionsFromDatabase();
  const navigate = useNavigate();

  const submit = async () => {
    const notExit = await verifyNames(name);
    if (notExit === true) {
      submitVolDeduction();
      setName("");
      setCost("");
      setDescription("");
      navigate("/VolDeductions")
    } else {
      alert("Deducción voluntaria existente")
    }
  }

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
              value={name}
              onChange={(e) => setName(e.target.value)}>
            </input>
            <label htmlFor="Name" className="animated-input__label">Name<span className="req">*</span></label>
          </div>

          <div className="animated-input">
            <input
              type="text"
              id="Cost"
              className="animated-input__input"
              autoComplete="off"
              placeholder=" "
              value={cost}
              onChange={(e) => { if (cheackNumber(e.target.value)) { setCost(e.target.value) } }}
            ></input>
            <label htmlFor="Cost" className="animated-input__label">Cost<span className="req">*</span></label>
          </div>
        </div>
        <div className="animated-input">
          <textarea
            type="text"
            id="Description"
            className="animated-input__textarea"
            autoComplete="off" 
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="Description" className="animated-input__label">Description</label>
        </div>
        <div className="buttons">
          <button
            className="create-volDeduction-btn"
            onClick={() => {

              if (name && cost && name.trim().length > 0) {
                submit();
              } else {
                alert("!!!Error!!!");
              }
            }}>
            create
          </button>
          <button
            className="cancel-volDeduction-btn"
            onClick={() => {
              setName("");
              setCost("");
              setDescription("");
              navigate("/volDeductions")
            }}>
            cancel
          </button>
        </div>
      </div>
    </>
  )
};
