import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './SelectProject.scss';
import { useProjectsData } from '../../Utils/PayrollProjects/useProjectsData';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Slices/user/userSlice';

export const SelectProjectComp = () => {
  const navigate = useNavigate();
  const { projects, handleProjectSelection, loading, error } = useProjectsData();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const dispatch = useDispatch();


  return (
    < div className='project-style'>
      <div className='project-header'>
        <div className='project-logo'></div>
        <button className='project-backButton' onClick={() => {
          if (activeProject === '') {
            dispatch(logout());
            navigate('/Login');
          } else {
            navigate('employees');
          }
        }}
        >
          X</button>
      </div>

      <div className='project-projectsRow'>
        {!loading && error == null ?
          projects.map((project) => {
            return (
              <div key={project.Nombre} className='project-projectBox'>

                <button
                  onClick={() => handleProjectSelection(project.Nombre)} className='project-projectLogo'>
                  {project.Nombre.charAt(0).toLocaleUpperCase()}
                </button>
                <div className='project-projectName'>{project.Nombre}</div>
              </div>
            );
          })
          : null
        }

        <div>
          {/* <NewProjectForm actualData={projects} setActualData={setProjects} /> */}
          <button centered='true' className='project-buttonCreate' onClick={() => navigate('/newProjectForm')}>+</button >
          <p className='project-AddNewProjectText'>Add new Project</p>

        </div>
      </div>
      <footer className='project-footerCopyRights'> &copy; SeleMiracleRun </footer>
    </div >
  );
};