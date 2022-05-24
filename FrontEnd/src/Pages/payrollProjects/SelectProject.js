import { Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import NewProjectForm from '../../Components/newProjectForm/NewProjectForm'
import { useNavigate } from 'react-router-dom';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';
import { useDispatch, useSelector } from "react-redux";
import '../../App.css'
import './SelectProject.css'
import { useFetch } from '../../shared/hooks/useFetch';




const database = [
];


const SelectProject = () => {
  const emailFromUser = useSelector((state) => state.user.user.Email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = useState(false);
  const [projects, setProjects] = useState(database);
  const { loading, error } = useFetch(`http://localhost:4000/projects/${emailFromUser}`, setProjects);

  const submitNewProject = async (name, paymentPeriod) => {
    const postFetch = await fetch("http://localhost:4000/projects", {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        Periodo: paymentPeriod,
        Email: emailFromUser,
      }),
    });
    console.log(postFetch);
  }

  const handleCloseChild = () => {
    setViewModal(false);
  }


  const addNewEntry = (newEntry) => {
    setProjects([...projects, newEntry]);
    submitNewProject(newEntry.Nombre, newEntry.TipoPeriodo);
  }

  const handleProjectSelection = (projectName) => {
    console.log(`El seleccionado:${projectName}`);
    dispatch(updateActiveProject(projectName));
    navigate('/employees');

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