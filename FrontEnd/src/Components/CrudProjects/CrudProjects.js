import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'react-bootstrap'
import React, { useState } from 'react'
import NewProjectForm from './NewProjectForm'
import '../../App.css'

import './newProject.css'
import './projectsStyle.css'


const database = [
  { name: "Coca Cola", empleados: ['Luis', 'Jarod'], periodoDePago: 'semanal' },
  { name: "Pepsi", empleados: ['Carlos', 'Josef', 'Javier'], periodoDePago: 'mensual' },
  { name: "Radiadores Solceri", empleados: ['Emilio', 'Jose'], periodoDePago: 'quincenal' },


]

const employeesDatabase = ['Charlie', 'Jarod', 'Javier', 'Luis', 'Josef'];

const CrudProjects = () => {

  const [data, setData] = useState(database);
  const [viewModal, setViewModal] = useState(false);


  const handleCloseChild = () => {
    setViewModal(false);
  }
  const addNewEntry = (newEntry) => {
    setData([...data, newEntry]);
  }

  return (

    < div className='project-style'>
      <div className=" project-projectsRow">

        {
          data.map((project) => {
            return (
              <div key={project.name} className='project-projectBox'>
                <button className='project-projectLogo' >{project.name.charAt(0).toLocaleUpperCase()}</button>
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
          actualData={data} employeesDatabase={employeesDatabase} />
      </Modal>

      <footer className='project-footer'>&copy; Sele Miracle Run - UCR</footer>

    </div >



  )
}

export default CrudProjects