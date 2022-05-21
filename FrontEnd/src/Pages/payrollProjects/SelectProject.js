import { Modal } from 'react-bootstrap'
import React, { useContext, useState, useEffect } from 'react'
import NewProjectForm from '../../Components/newProjectForm/NewProjectForm'
import ProjectContext from '../../Contexts/ProjectContext'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import '../../App.css'
import './SelectProject.css'




const database = [
  { Nombre: "Javier" }

];


const SelectProject = () => {
  const navigate = useNavigate();
  const { activeProject, setActiveProject } = useContext(ProjectContext);
  const [viewModal, setViewModal] = useState(false);
  const [projects, setProjects] = useState(database);

  const user = useSelector(
    (state) => state.user.user
  );

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