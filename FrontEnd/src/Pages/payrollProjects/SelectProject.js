import { Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import NewProjectForm from '../../Components/newProjectForm/NewProjectForm'
import { useNavigate } from 'react-router-dom';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';
import { useDispatch } from "react-redux";

import '../../App.css'
import './SelectProject.css'




const database = [
];


const SelectProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = useState(false);
  const [projects, setProjects] = useState(database);

  useEffect(() => {
    const fetchSeleAPI = async () => {
      const seleUrl = "http://localhost:4000/projects/josefR@example.com";
      try {
        const response = await fetch(seleUrl);
        const newData = await response.json();
        setProjects(newData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeleAPI();
  }, []);
  const handleCloseChild = () => {
    setViewModal(false);
  }
  const addNewEntry = (newEntry) => {
    setProjects([...projects, newEntry]);
  }

  const handleProjectSelection = (projectName) => {
    console.log(`El seleccionado:${projectName}`);
    dispatch(updateActiveProject(projectName));
    navigate('/employees');

  }

  const handleBackButton = () => {
    navigate(-1);
  }



  return (

    < div className='project-style'>
      {console.log(projects)}
      <div className='project-header'>
        <div className='project-logo'></div>
        <button onClick={handleBackButton} className='project-backButton'>X</button>
      </div>


      <div className=" project-projectsRow">
        {
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
          })}

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