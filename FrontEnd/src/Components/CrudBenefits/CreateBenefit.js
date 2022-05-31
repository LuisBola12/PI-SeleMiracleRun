import '../../App.css'
import './CreateBenefit.scss'
import { usePostToDatabase } from "./usePostToDatabase";
import { useNavigate } from "react-router-dom";
import { useGetBenefitsFromDatabase } from './useGetBenefitsFromDatabase';
import { validateBenefitForm } from './validateBenefitForm';
import { maskCurrency } from '../../shared/moneyFormatTransform';

export const CreateBenefit = () => {
  const { name, setName, cost, setCost, description, setDescription, submitBenefit } = usePostToDatabase();
  const { verifyNames } = useGetBenefitsFromDatabase();
  const navigate = useNavigate();

  const submit = async () => {
    const notExit = await verifyNames(name);
    if (notExit === true) {
      submitBenefit();
      navigate("/benefits")
    } else {
      alert("That benefit already exits")
    }
  }

  return (
    <>
      <div className="benefits-form">
        <div className="form-title">
          <div className="image-benefit"></div>
          Create Benefit
        </div>
        <div className="form-group-benefits">
          <div className='Name-input'>
            <div className="animated-input">
              <input
                type="text"
                id="Name"
                className="animated-input__input"
                autoComplete="off"
                placeholder=" "
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label htmlFor="Name" className="animated-input__label">Name<span className="req">*</span></label>
            </div>
            <label className="error-message" id="benefit-name"></label>
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
                value={cost}
                onChange={(e) => setCost(maskCurrency(e).target.value)}
              ></input>
              <label htmlFor="Cost" className="animated-input__label">Cost<span className="req">*</span></label>
            </div>
            <label className="error-message" id="benefit-cost"></label>
          </div>
        </div>
        <div>
          <div className="animated-input">
            <textarea
              id="Description"
              className="animated-input__textarea"
              autoComplete="off" placeholder=" "
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="Description" className="animated-input__label">Description</label>
            <label className="error-message" id="benefit-description"></label>
          </div>
        </div>
        <div className="buttons">
          <button
            className="create-benefit-btn"
            onClick={() => {
              if (validateBenefitForm(name, cost) === true) {
                submit();
              }
            }}>
            create
          </button>
          <button
            className="cancel-benefit-btn"
            onClick={() => {
              navigate("/benefits")
            }}>
            cancel
          </button>
        </div>
      </div>
    </>
  )
};
