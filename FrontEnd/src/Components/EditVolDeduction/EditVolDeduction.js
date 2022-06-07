import '../../App.css'
import '../CreateVolDeduction/CreateVolDeduction.scss';
import { useNavigate } from "react-router-dom";
import { maskCurrency } from '../../shared/moneyFormatTransform';
import validateVolDeductionForm from '../../Utils/VolDeductions/validateVolDeductionForm';
import useForm from '../../shared/hooks/useForm';
import { validAnEntity } from '../../Utils/validAnEntity';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { transformCost } from "../../shared/moneyFormatTransform";
import { usePutToVolDeductions } from '../../Utils/VolDeductions/usePutToVolDeductions';
import Swal from 'sweetalert2';


export const EditVolDeduction = () => {
  const apiVolDeductions = `http://localhost:4000/volDeductions`;
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const location = useLocation();
  const oldName = location.state.Nombre;
  const navigate = useNavigate();
  const { updateVolDeduction } = usePutToVolDeductions();
  const submit = async () => {
    const notExists = await validAnEntity('volDeductions/' + activeProject + '/', formValues.Name);
    if (notExists === true || oldName === formValues.Name) {
      updateVolDeduction(formValues.Name, formValues.Cost, formValues.Description, apiVolDeductions + `/${oldName}`);
      navigate("/volDeductions");
    } else {
      setIsSubmitting(false);
      Swal.fire({
        icon: 'error',
        title: 'error...',
        text: 'That voluntary deduction already exists',
        confirmButtonColor: 'darkgreen',
      })
    }
  }
  const {
    formValues,
    handleInputChange,
    handleSubmit,
    errors,
    setIsSubmitting,
    setFormValues
  } = useForm(submit, validateVolDeductionForm);
  useEffect(() => {
    setFormValues({
      Name: location.state.Nombre,
      Cost: transformCost(location.state.Costo),
      Description: location.state.Descripcion
    });
  }, [])

  return (
    <>
      <div className="voluntaryDeductions-form">
        <div className="form-title">
          <div className="image-volDeduction"></div>
          Edit Deduction
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
                onChange={handleInputChange}
              ></input>
              <label htmlFor="Name" className="animated-input__label">Name<span className="req">*</span></label>
            </div>
            <label className="error-message" id="volDeduction-name">{errors.Name}</label>
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
                onChange={(e) => { handleInputChange(maskCurrency(e)) }}
              ></input>
              <label htmlFor="Cost" className="animated-input__label">Cost ₡<span className="req">*</span></label>
            </div>
            <label className="error-message" id="volDeduction-cost">{errors.Cost}</label>
          </div>
        </div>
        <div>
          <div className="animated-input">
            <textarea
              id="Description"
              className="animated-input__textarea"
              autoComplete="off" placeholder=" "
              maxLength={300}
              value={formValues.Description || ''}
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="Description" className="animated-input__label">Description</label>
            <label className="error-message" id="volDeduction-description"></label>
          </div>
        </div>
        <div className="buttons">
          <button
            className="create-volDeduction-btn"
            onClick={handleSubmit}>
            Edit
          </button>
          <button
            className="cancel-volDeduction-btn"
            onClick={() => {
              navigate("/volDeductions")
            }}>
            cancel
          </button>
        </div>
      </div>
    </>
  )
};
