import "./createProject.scss";
import validate from './NewProjectValidationRules';
import useForm from "../../shared/hooks/useForm";
import { useNavigate } from 'react-router-dom';
import usePost from "../../shared/hooks/usePost";
import { useSelector } from "react-redux";

export const CreateProjectsForm = () => {



  const navigate = useNavigate();
  const { postError, post } = usePost("http://localhost:4000/projects");

  const emailFromUser = useSelector((state) => state.user.user.Email);

  const sendToDatabase = () => {
    let string = JSON.stringify(formValues);
    string = JSON.stringify({
      Nombre: formValues.projectName,
      Periodo: formValues.paymentPeriod,
      Email: emailFromUser,
    })
    post(string);
    navigate(-1);
  }

  const { formValues, handleInputChange, handleSubmit, errors } = useForm(sendToDatabase, validate);

  return (
    <>
      <div className="project-bar">
        <div className="project-logo"></div>
        <div className="project-title"> Create New Project </div>
      </div>

      <form className="form">

        <div className='row' >
          <div className="row-Element">
            <input type="text" id="projectName" className={`row-Element__input ${errors.projectNameErrorCss}` } value={formValues.projectName || ''}
              onChange={handleInputChange} autoComplete="off" placeholder=" " />
            <label htmlFor="projectName" className='row-Element__label'> Project Name <span className="req">*</span></label>
            <p className='error' >{errors.projectName}</p>
          </div>

          <div className='row-Element'>
            <select id='paymentPeriod' className={`row-Element__dropDown ${errors.paymentPeriodErrorCss}`} onChange={handleInputChange} >
              <option value=''>Select Payment Period</option>
              <option value='Mensual'>Mensual</option>
              <option value='Quincenal'>Quincenal</option>
              <option value='Semanal'>Semanal</option>
            </select>
            <label htmlFor="paymentPeriod" className="row-Element__dropDown__label"> Payment Period <span className="req">*</span></label>
            <p className='error' >{errors.paymentPeriod}</p>
          </div>
        </div>

        <div className='row' >

          <div className="row-Element">
            <input type="number" id="maxBenefitsQuantity" className={`row-Element__input ${errors.maxBenefitsQuantityCss}` } value={formValues.maxBenefitsQuantity || ''}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="maxBenefitsQuantity" className="row-Element__label"> Max Benefits Quantity <span className="req"     >*</span></label>
            <p className='error'>{errors.maxBenefitsQuantity}</p>
          </div>

          <div className="row-Element">
            <input type="number" id="maxBenefitsMoneyAmount" className={`row-Element__input ${errors.maxBenefitsQuantityCss}`} value={formValues.maxBenefitsMoneyAmount || ''}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder=" " />
            <label htmlFor="maxBenefitsMoneyAmount" className="row-Element__label"> Max Money On Benefits Per Employee <span className="req">*</span></label>
            <p className='error'>{errors.maxBenefitsMoneyAmount}</p>
          </div>

        </div>

        <div className='row'>

          <div className="row-Element">
            <textarea id="Description" className="row-Element__textArea" autoComplete="off" placeholder=" "></textarea>
            <label htmlFor='Description' className="row-Element__label center">Description</label>
            <p className='error deeper'>{errors.description}</p>
          </div>


        </div>

        <div className='row'>
          <div className="project-btn-box">
            <button onClick={handleSubmit} className="project-btn-sumbit" >
              Create
            </button>
            <button className="project-btn-cancel" onClick={() => navigate('/')}  >
              Cancel
            </button>
          </div>



        </div>
      </form>
      <footer className="logIn-footerCopyRights"> &copy; SeleMiracleRun </footer>
    </>

  )
}
