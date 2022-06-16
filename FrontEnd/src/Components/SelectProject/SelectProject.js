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
                  ( isDeletingProject ) ? <button> x</button> : <></>

                }
                <button
                  onClick={() => handleProjectSelection( project.Nombre )} className='project-projectLogo'>
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
      <button onClick={() =>setIsDeletingProject( true )}>d</button>
      {isDeletingProject ? <buttton onClick={ ()=> setIsDeletingProject( false )}  >cancel</buttton> : <></>}
      <footer className='project-footerCopyRights'> &copy; SeleMiracleRun </footer>
    </div >
  );
};
