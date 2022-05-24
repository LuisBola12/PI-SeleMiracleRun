import { Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import NewProjectForm from '../../Components/newProjectForm/NewProjectForm'
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import './SelectProject.css'
import { useProjectsData } from './useProjectsData';



const SelectProject = () => {
  const navigate = useNavigate();

  const [viewModal, setViewModal] = useState(false);
  const { projects, handleProjectSelection, addNewEntry, loading, error } = useProjectsData();



  const handleCloseChild = () => {
    setViewModal(false);
  }

  return (

    < div className='project-style'>
      {console.log(projects)}
      <div className='project-header'>
        <div className='project-logo'></div>
        <button onClick={() => navigate(-1)} className='project-backButton'>X</button>
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
          <button className="project-buttonCreate" onClick={() => setViewModal(true)}>+</button>
          <p className='project-AddNewProjectText'>Add new Project</p>
        </div>
      </div>

      <Modal show={viewModal} centered={true} dialogClassName='modal-90w'>
        <NewProjectForm cover={handleCloseChild} addNewEntry={addNewEntry}
          actualData={projects} />
      </Modal>



    </div >



  )
}

export default SelectProject