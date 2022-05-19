import { Modal } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import NewProjectForm from '../../Components/newProjectForm/NewProjectForm'
import ProjectContext from '../../Contexts/ProjectContext'
import { useNavigate } from 'react-router-dom';

import '../../App.css'
import './SelectProject.css'



const employeesDatabase = ['Charlie', 'Jarod', 'Javier', 'Luis', 'Josef'];

const SelectProject = () => {
  const navigate = useNavigate();
  const { activeProject, setActiveProject, projects, setProjects } = useContext(ProjectContext);
  const [viewModal, setViewModal] = useState(false);

  const handleCloseChild = () => {
    setViewModal(false);
  }
  const addNewEntry = (newEntry) => {
    setProjects([...projects, newEntry]);
  }

  const handleProjectSelection = (projectName) => {
    console.log(`global:${activeProject}`);
    console.log(`El seleccionado:${projectName}`);
    setActiveProject(projectName);
    navigate('/');

  }

  const handleBackButton = () => {
    navigate(-1);
  }



  return (

    < div className='project-style'>

      <div className='project-header'>
        <div className='project-logo'></div>
        <button onClick={handleBackButton} className='project-backButton'>X</button>
      </div>


      <div className=" project-projectsRow">
        {
          projects.map((project) => {
            return (
              <div key={project.name} className='project-projectBox'>
                <button

                  onClick={() => handleProjectSelection(project.name)} className='project-projectLogo'>
                  {project.name.charAt(0).toLocaleUpperCase()}
                </button>
                <div className='project-projectName'>{project.name}</div>
              </div>
            )
          })}

        <div>
          <button className="project-buttonCreate" onClick={() => setViewModal(true)}>+</button>
          <p className='project-AddNewProjectText'>Add new Project</p>
        </div>
      </div>

      <Modal show={viewModal} centered={true} dialogClassName='modal-90w'>
        <NewProjectForm cover={handleCloseChild} addNewEntry={addNewEntry}
          actualData={projects} employeesDatabase={employeesDatabase} />
      </Modal>



    </div >



  )
}

export default SelectProject