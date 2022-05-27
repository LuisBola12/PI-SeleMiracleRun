import { FormGroup } from "reactstrap";
import '../../App.css'
import './CreateBenefit.scss'
import { usePostToDatabase } from "./usePostToDatabase";


export const CreateBenefit = () => {
  const { name, setName, cost, setCost, viewModal, setViewModal, addToTable } = usePostToDatabase();
  return (
    <>
      <form className="benefits-form">
        <div className="form-title">
          <div className="image-benefit"></div>
          Create Benefit
        </div>
        <div className="form-group-benefits">
          <div className="animated-input">
            <input type="text" id="Name" className="animated-input__input" autocomplete="off" placeholder=" "></input>
            <label for="Name" className="animated-input__label">Name<span className="req">*</span></label>
          </div>

          <div className="animated-input">
            <input type="Number" id="Cost" className="animated-input__input" autocomplete="off" placeholder=" "></input>
            <label for="Cost" className="animated-input__label">Cost<span className="req">*</span></label>
          </div>
        </div>
        <div className="animated-input">
          <textarea type="Description" id="Description" className="animated-input__textarea" autocomplete="off" placeholder=" "></textarea>
          <label for="Description" className="animated-input__label">Description</label>
        </div>
        <div className="buttons">
          <button className="create-benefit-btn" >
            create
          </button>
          <button className="cancel-benefit-btn" >
            cancel
          </button>
        </div>
      </form>


    </>
  )
};
