import React from 'react';
import { IconContext } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { useForm } from './../../shared/hooks/useForm';
import { useSelector } from 'react-redux';
import { usePutEditUser } from '../../Utils/UserProfile/putEditProfile';
import {
  validateEditUserForm,
} from './../../Utils/UserProfile/editUserProfile';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAnEntity } from '../../Utils/getAnEntity';

export const ProjectInfo = () => {
  const { updateEmployee,updateEmployeer } = usePutEditUser();

  const [ isEditing, setIsEditing ] = useState( false );
  const [inputCss, setInputCss] = useState('user-profile-input')
  const [isLoading, setIsLoading] = useState(true)
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [projectData, setProjectData] = useState([])
  const submit = async () => {
  };

  const { formValues, handleInputChange, handleSubmit, errors, setFormValues } = useForm( submit, validateEditUserForm );
  useEffect(() => {
    setIsLoading(true)
    const loadProjectData = async () => {
      const result = await getAnEntity('projects/',activeProject)
      console.log(result)
      setProjectData( result[0] )
      setIsLoading(false)
    }
  loadProjectData() 
  }, [activeProject])
  
  return isLoading ? (
    <div className='loader'></div>
  ) : (
    <>

      <div className='user-info-container'>
        <div className='user-profile-header'>
          <div className='project-info-title' >Project Information</div>
          <div className='user-profile-edit-icon'>
            <IconContext.Provider
              value={{
                className: 'user-profile-edit-button',
              }}
            >
              <button className='edit-profile-button' onClick={() =>{
                setIsEditing( true );
                setInputCss('input-editing')
              }
              } >
                <FaEdit />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      
   
        <div className='user-profile-form'>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>ProjectName</label>
              <label id='erroProjectName' className='error-label'>
                {errors.projectName}
              </label>
            </div>
            <input
              id='projectName'
              className = {inputCss}
              placeholder = {projectData.Nombre}
              autoComplete = 'off'
              value={ isEditing ? formValues.projectName || '' : projectData.Nombre }
              onChange={handleInputChange}
              disabled = {!isEditing}  
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>PaymentPeriod</label>
              <label id='paymentPeriod' className='error-label'>
                {errors.paymentPeriod}
              </label>
            </div>
            {
              isEditing ? (
              <select id='paymentPeriod' className={inputCss} onChange={handleInputChange} >
                <option value=''>Select Payment Period</option>
                <option value='Mensual'>Mensual</option>
                <option value='Quincenal'>Quincenal</option>
                <option value='Semanal'>Semanal</option>
              </select>
              ):
              <input
                id='paymentPeriod'
                className = {inputCss}
                disabled = {!isEditing}  
                value={ isEditing ? formValues.paymentPeriod || projectData.TipoPeriodo : projectData.TipoPeriodo  }
                onChange={handleInputChange}
              ></input>
              }
          </div>

          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Max Benefits Quantity</label>
              <label id='errorMaxBenefitsQuantity' className='error-label'>
                {errors.maxBenefitsQuantity}
              </label>
            </div>
            <input
              id='maxBenefitsQuantity'
              className = {inputCss}
              disabled = {!isEditing}  
              autoComplete = 'off'
              placeholder = {projectData.CantidadMaximaBeneficiosEmpleado}
              value={ isEditing ? formValues.maxBenefitsQuantity || '' : projectData.CantidadMaximaBeneficiosEmpleado  }
              onChange={handleInputChange}
            ></input>
          </div>

          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Max Benefits Money Amount</label>
              <label id='error-id-user' className='error-label'>
                {errors.email}
              </label>
            </div>
            <input
              id='maxBenefitsMoneyAmount'
              className = {inputCss}
              disabled = {!isEditing} 
              placeholder = {projectData.MontoMaximoBeneficiosEmpleado}
              autoComplete = 'off'
              value={isEditing ? formValues.maxBenefitsMoneyAmount || '' : projectData.MontoMaximoBeneficiosEmpleado}
              onChange={handleInputChange}
            ></input>
          </div>
        
          
          {
            isEditing ? (

          <div id='user-profile-buttons-div addFlex' className='editProjectButtons'>
            <button className='submit-change-btn' onClick={handleSubmit}>
              Submit
            </button>
            <button className='dont-change-btn' onClick={() =>{
              setIsEditing(false)
              setInputCss('user-profile-input')
              setFormValues([])
            } }>
              Cancel
            </button>
          </div>
            ):<></>

          }
        </div>
      </div>
    </>
  );
};
