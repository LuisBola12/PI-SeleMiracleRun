import { Modal } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import NewProjectForm from '../../Components/newProjectForm/NewProjectForm'
import ProjectContext from '../../Contexts/ProjectContext'
import { useNavigate } from 'react-router-dom';

import '../../App.css'
import './SelectProject.css'

const database = [
  { name: "Coca Cola", periodoDePago: 'semanal' },
  { name: "Pepsi", periodoDePago: 'mensual' },
  { name: "Radiadores Solceri", periodoDePago: 'quincenal' },
]

const employeesDatabase = ['Charlie', 'Jarod', 'Javier', 'Luis', 'Josef'];

const SelectProject = () => {
  const navigate = useNavigate();
  const { activeProject, setActiveProject } = useContext(ProjectContext);
  const [data, setData] = useState(database);
  const [viewModal, setViewModal] = useState(false);


  const handleCloseChild = () => {
    setViewModal(false);
  }
  const addNewEntry = (newEntry) => {
    setData([...data, newEntry]);
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
          data.map((project) => {
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

      {/* <div>
        <button className="project-buttonCreate" onClick={() => printActiveProject()}>+</button>
        <p className='project-AddNewProjectText'></p>
      </div> */}


      <Modal show={viewModal} centered={true} dialogClassName='modal-90w'>
        <NewProjectForm cover={handleCloseChild} addNewEntry={addNewEntry}
          actualData={data} employeesDatabase={employeesDatabase} />
      </Modal>



    </div >



  )
}

export default SelectProject