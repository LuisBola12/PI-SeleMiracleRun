import React from 'react';
import '../../App.css';
import './CreatevoluntaryDeduction.scss';
import { usePostTovoluntaryDeductions } from '../../Utils/voluntaryDeductions/usePostTovoluntaryDeductions';
import validatevoluntaryDeductionForm from '../../Utils/voluntaryDeductions/validatevoluntaryDeductionForm';
import useForm from '../../shared/hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { maskCurrency } from '../../shared/moneyFormatTransform';
import { validAnEntity } from '../../Utils/validAnEntity';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const CreatevoluntaryDeduction = () => {
  const { submitvoluntaryDeduction } = usePostTovoluntaryDeductions();
  const activeProject = useSelector((state) => state.activeProject.projectName);

  const navigate = useNavigate();
  const submit = async () => {
    const notExists = await validAnEntity('voluntaryDeductions/' + activeProject + '/', formValues.Name);
    if (notExists === true) {
      submitvoluntaryDeduction(formValues.Name, formValues.Cost, formValues.Description);
      navigate('/voluntaryDeductions');
    } else {
      setIsSubmitting(false);
      Swal.fire({
        icon: 'error',
        title: 'error...',
        text: 'That voluntary deduction already exists',
        confirmButtonColor: 'darkgreen',
      });
    }
  };

  const { formValues, handleInputChange, handleSubmit, errors, setIsSubmitting } = useForm(submit, validatevoluntaryDeductionForm);
  return (
    <>
      <div className='voluntaryDeductions-form'>
        <div className='form-title-voluntaryDeductions'>
          <div className='image-voluntaryDeduction'></div>
          Create Voluntary Deduction
        </div>
        <div className='form-group-voluntaryDeductions'>
          <div className='Name-input'>
            <div className='animated-input'>
              <input
                type='text'
                id='Name'
                className='animated-input__input'
                autoComplete='off'
                placeholder=' '
                maxLength={50}
                value={formValues.Name || ''}
                onChange={handleInputChange} />
              <label htmlFor='Name' className='animated-input__label'>Name<span className='req'>*</span></label>
            </div>
            <label  className = 'error-message' > {errors.Name} </label>
          </div>
          <div className='Cost-input'>
            <div className='animated-input'>
              <input
                type='text'
                id='Cost'
                className='animated-input__input'
                autoComplete='off'
                placeholder=' '
                maxLength={50}
                value={formValues.Cost || ''}
                onChange={(e) => { handleInputChange(maskCurrency(e)); }} ></input>
              <label htmlFor='Cost' className='animated-input__label'>Cost<span className='req'>*</span></label>
            </div>
            <label  className = 'error-message' > {errors.Cost} </label>
          </div>
        </div>
        <div className='animated-input'>
          <textarea
            type='text'
            id='Description'
            className='animated-input__textarea'
            autoComplete='off' 
            placeholder=' '
            maxLength={300}
            value={formValues.Description || ''}
            onChange={handleInputChange} />
          <label htmlFor='Description' className='animated-input__label'>Description</label>
          <label  className = 'error' > {errors.Description} </label>
        </div>
        <div className='buttons-voluntaryDeduction'>
          <button
            className='create-voluntaryDeduction-btn'
            onClick={handleSubmit}>
            create
          </button>
          <button
            className='cancel-voluntaryDeduction-btn'
            onClick={() => { navigate('/voluntaryDeductions'); }}>
            cancel
          </button>
        </div>
      </div>
    </>
  );
};
