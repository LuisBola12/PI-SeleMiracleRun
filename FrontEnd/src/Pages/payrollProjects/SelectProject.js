import React from 'react'
import NewProjectForm from '../../Components/ProjectsComponents/NewProjectForm'
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import './SelectProject.css'
import { useProjectsData } from './useProjectsData';



const SelectProject = () => {
  const navigate = useNavigate();
  const { projects, setProjects, handleProjectSelection, loading, error } = useProjectsData();



  return (
    < div className='project-style'>
      <div className='project-header'>
        <div className='project-logo'></div>
        <button className='project-backButton' onClick={() => { navigate(-1) }}>X</button>
      </div>

      <div className=" project-projectsRow">
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
            )
          })
          : null
        }

        <div>
          <NewProjectForm actualData={projects} setActualData={setProjects} />
        </div>
      </div>

    </div >



  )
}

export default SelectProject