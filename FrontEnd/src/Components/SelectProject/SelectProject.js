import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './SelectProject.scss';
import { useProjectsData } from '../../Utils/PayrollProjects/useProjectsData';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Slices/user/userSlice';




export const SelectProjectComp = () => {
  const navigate = useNavigate();
  const { projects, handleProjectSelection, loading, error } = useProjectsData();
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const rolFromUser = useSelector( ( state ) => state.user.user.Roles );
  const dispatch = useDispatch();
  const [ isDeletingProject, setIsDeletingProject ] = useState( false );

  const proceedToEliminate = ( projectName ) => {
    console.log( `Eliminating: ${projectName}` );
    console.log( 'proceding eliminate project From database ' );

  };
  
  const eliminateProject = async( projectName ) => {
    console.log( projectName );
    try {
      const activeEmployeesApiResponse = await fetch( `http://localhost:4000/getEmployeesInfo/${projectName}` );
      const activeEmployees = await activeEmployeesApiResponse.json();
      console.log( activeEmployees );
      if ( activeEmployees.length == 0 ){
        proceedToEliminate( projectName );
      } else {
        console.log( 'NO se puede eliminar: El proyecto Tiene empleados' );
      }      console.log( 'entra' );

    } catch ( error ) {
      console.log( `Error en la solicitud de base de datos: ${error}` );  
    }
    
  };

  const handleProjectClick = ( projectName ) =>{
    if ( isDeletingProject ){
      eliminateProject( projectName );
    }
    else {
      handleProjectSelection( projectName );
    }
  };


  return (
    < div className='project-style'>
      <div className='project-header'>
        <div className='project-logo'></div>
        <button className='project-backButton' onClick={() => {
          if ( activeProject === '' ) {
            dispatch( logout() );
            navigate( '/' );
          } else {
            rolFromUser === 'admin' ?
              ( navigate( '/employees' ) ) :
              ( navigate( '/home' ) );
          }
        }}
        >
          X</button>
      </div>

      <div className='project-projectsRow'>
        {!loading && error == null ?
          projects.map( ( project ) => {
            return (
              <div key={project.Nombre} className='project-projectBox'>
                {
                  ( isDeletingProject ) ? <button className = 'eliminateMinus-button' onClick={() => eliminateProject( project.Nombre )}>-</button> : <></>

                }
                <button
                  onClick={  () => handleProjectClick( project.Nombre )  } className='project-projectLogo'>
                  {project.Nombre.charAt( 0 ).toLocaleUpperCase()}
                </button>
                <div className='project-projectName'>{project.Nombre}</div>
              </div>
            );
          } )
          : null
        }
        
        {rolFromUser === 'admin' ? (
          <div>
            <button centered='true' className='project-buttonCreate' onClick={() => navigate( '/newProjectForm' )}>+</button >
            <p className='project-AddNewProjectText'>Add new Project</p>
          </div>
        ) : ( <></> )}
      </div>
      {isDeletingProject && rolFromUser === 'admin' ? <button onClick={ ()=> setIsDeletingProject( false )}  >cancel</button> : <></>}
      <div>

        {rolFromUser === 'admin' ? (
          <>  
            <button className = 'eliminateProjects-icon' onClick={() =>setIsDeletingProject( true )}> </button>
          
          </>
        ) : <></>}
        <footer className='project-footerCopyRights'> &copy; SeleMiracleRun </footer>
      </div>
    </div >
  );
};
