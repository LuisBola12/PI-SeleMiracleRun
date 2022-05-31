import '../../App.css'
import './CreateBenefit.scss'
import { usePostToDatabase } from "./usePostToDatabase";
import { useNavigate } from "react-router-dom";
import { useGetBenefitsFromDatabase } from './useGetBenefitsFromDatabase';


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
      alert("Beneficio existente")
    }
  }

  const maskCurrency = (e) => {
    let value = e.target.value
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{3})$/, "$1.$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e.target.value = value
    return e
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
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="Name" className="animated-input__label">Name<span className="req">*</span></label>
          </div>

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
        </div>
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
              navigate("/benefits")
            }}>
            cancel
          </button>
        </div>
      </div>
    </>
  )
};
