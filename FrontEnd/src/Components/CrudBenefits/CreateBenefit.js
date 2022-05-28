import '../../App.css'
import './CreateBenefit.scss'
import { usePostToDatabase } from "./usePostToDatabase";
import { useNavigate } from "react-router-dom";
import { useGetBenefitsFromDatabase } from './useGetBenefitsFromDatabase';


export const CreateBenefit = () => {
  const { name, setName, cost, setCost, submitBenefit } = usePostToDatabase();
  const { verifyNames } = useGetBenefitsFromDatabase();
  const navigate = useNavigate();

  const submit = async () => {
    const notExit = await verifyNames(name);
    if (notExit === true) {
      submitBenefit();
      setName("");
      setCost("");
      navigate("/benefits")
    } else {
      alert("Beneficio existente")
    }
  }

  const cheackNumber = (value) => {
    return String(value).toLowerCase().match(/^[0-9]*$/)
  }
  return (
    <>
      <div className="benefits-form">
        <div className="form-title">
          <div className="image-benefit"></div>
          Create Benefit
        </div>
        <div className="form-group-benefits">
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
            id="Description"
            className="animated-input__textarea"
            autoComplete="off" placeholder=" ">
          </textarea>
          <label htmlFor="Description" className="animated-input__label">Description</label>
        </div>
        <div className="buttons">
          <button
            className="create-benefit-btn"
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
            className="cancel-benefit-btn"
            onClick={() => {
              setName("");
              setCost("");
              navigate("/benefits")
            }}>
            cancel
          </button>
        </div>
      </div>
    </>
  )
};
