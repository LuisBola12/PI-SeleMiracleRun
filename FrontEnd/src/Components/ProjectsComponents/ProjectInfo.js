import React from 'react';
import { IconContext } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { useForm } from './../../shared/hooks/useForm';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAnEntity } from '../../Utils/getAnEntity';
import Swal from 'sweetalert2';
import usePost from '../../shared/hooks/usePost';
import validateEditProject from './editProjectValidate';


export const ProjectInfo = () => {

  const [ isEditing, setIsEditing ] = useState( false );
  const [ inputCss, setInputCss ] = useState( 'user-profile-input' );
  const [ isLoading, setIsLoading ] = useState( true );
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const [ projectData, setProjectData ] = useState( [] );


  const { post, postError } = usePost( process.env.REACT_APP_BACKEND_LOCALHOST + 'logicEliminateProject', 'PUT' );

  const submit = async () => {
    console.log( 'entra a submit' );
  };
  const proceedToEliminate = async ( projectName ) => {
    Swal.fire( {
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkgreen',
      cancelButtonColor: 'darkred',
      confirmButtonText: 'Yes, delete it!'
    } ).then( ( result ) => {
      if ( result.isConfirmed ) {
        console.log( `Eliminating: ${projectName}` );
        console.log( 'proceding eliminate project From database ' );
        let string = '';
        string = JSON.stringify( {
          Nombre: projectName,
        } );
        post( string );
        if ( postError ) {
          console.log( 'Error Trying to delete' );
        }
        Swal.fire( {
          title: 'Deleted!',
          text: `The Ptroject ${projectName} has been deleted.`,
          icon: 'success',
          confirmButtonColor: 'darkgreen',
        } );
      }
    } );
  };

  const eliminateProject = async ( projectName ) => {
    try {
      const activeEmployeesApiResponse = await fetch( process.env.REACT_APP_BACKEND_LOCALHOST + `getEmployeesInfo/${projectName}` );
      const activeEmployees = await activeEmployeesApiResponse.json();
      if ( activeEmployees.length == 0 ) {
        proceedToEliminate( projectName );
      } else {
        Swal.fire( {
          icon: 'error',
          title: 'Oops... Can\'t Delete Project',
          text: 'This project have active Employees',
          confirmButtonColor: 'darkgreen',
        } );


        console.log( 'NO se puede eliminar: El proyecto Tiene empleados' );
      } console.log( 'entra' );

    } catch ( error ) {
      console.log( `Error en la solicitud de base de datos: ${error}` );
    }

  };

  const { formValues, handleInputChange, handleSubmit, errors, setFormValues, setErrors } = useForm( submit, validateEditProject );
  //Cargar el contenido inicial
  useEffect( () => {
    setIsLoading( true );
    const loadProjectData = async () => {
      const result = await getAnEntity( 'projects/', activeProject );
      console.log( result );
      setProjectData( result[0] );
      setIsLoading( false );
      setFormValues( { ...formValues, ['projectName']: projectData.Nombre } );    };
    loadProjectData();
  }, [ activeProject ] );

  return isLoading ? (
    <div className='loader'></div>
  ) : (
    <>

      <div className='user-info-container'>
        <div className='user-profile-header'>
          <h2 className='projectEditTitle' >Project Info</h2>
          <div className='user-profile-edit-icon'>
            <IconContext.Provider
              value={{
                className: 'user-profile-edit-button',
              }}
            >
              <button className='edit-profile-button' onClick={() => {
                setIsEditing( true );
                setInputCss( 'input-editing' );
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
              <label id='errorsProjectName' className='editProjectsErrors'>
                {errors.projectName}
              </label>
            </div>
            <input
              id='projectName'
              className={inputCss + ' ' + errors.projectNameErrorCss}
              placeholder={projectData.Nombre}
              autoComplete='off'
              value={isEditing ? formValues.projectName || '' : projectData.Nombre}
              onChange={handleInputChange}
              disabled={!isEditing}
            ></input>
          </div>

          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>PaymentPeriod</label>
              <label id='errorsProjectName' className='editProjectsErrors'>
                {errors.paymentPeriod}
              </label>
            </div>
            {
              isEditing ? (
                <select id='paymentPeriod' className={inputCss + ' ' + errors.paymentPeriodErrorCss} onChange={handleInputChange} >
                  <option value=''>Select Payment Period</option>
                  <option value='Mensual'>Mensual</option>
                  <option value='Quincenal'>Quincenal</option>
                  <option value='Semanal'>Semanal</option>
                </select>
              ) :
                <input
                  id='paymentPeriod'
                  className={inputCss}
                  disabled={!isEditing}
                  value={isEditing ? formValues.paymentPeriod || projectData.TipoPeriodo : projectData.TipoPeriodo}
                  onChange={handleInputChange}
                ></input>
            }
          </div>

          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Max Benefits Quantity</label>
              <label id='errorMaxBenefitsQuantity ' className= {`error-label ${errors.projectNameErrorCss}`}>
                {errors.maxBenefitsQuantity}
              </label>
            </div>
            <input
              id='maxBenefitsQuantity'
              className={inputCss}
              disabled= {true}
              autoComplete='off'
              placeholder={isEditing ? `Can't edit max benefits quantity: ${projectData.CantidadMaximaBeneficiosEmpleado} ` : projectData.CantidadMaximaBeneficiosEmpleado}
              value={isEditing ? '' : projectData.CantidadMaximaBeneficiosEmpleado}
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
              className={inputCss}
              disabled= {true}
              placeholder={isEditing ? `Can't edit max benefits money amount: ${projectData.MontoMaximoBeneficiosEmpleado}` : projectData.MontoMaximoBeneficiosEmpleado}
              autoComplete='off'
              value={isEditing ? '' : projectData.MontoMaximoBeneficiosEmpleado}
            ></input>
          </div>


          {
            isEditing ? (
              <>

                <br></br>
                <div id='user-profile-buttons-div addFlex' className='editProjectButtons'>
                  <button onClick={ () => eliminateProject( activeProject )} className='button cancel-button' style={ { marginRight: '33rem', width:'10rem' }  } >Delete Project </button>
                  <button className='create-button' style={{ width: '5rem' }} onClick={handleSubmit}>
                  Submit
                  </button>
                  <button className='button cancel-button' onClick={() => {
                    setIsEditing( false );
                    setInputCss( 'user-profile-input' );
                    setFormValues( [] );
                    setFormValues( { ...formValues, ['projectName']: projectData.Nombre } );
                    setErrors( [] );    
                  }}>
                  Cancel
                  </button>
                </div>
              </>
            ) : <></>

          }
        </div>
      </div>
    </>
  );
};
