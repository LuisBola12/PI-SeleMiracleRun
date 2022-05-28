import { ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import './NewProject.css'
import { useAddNewProject } from './useAddNewProject';



const NewProjectForm = ({ actualData, setActualData, }) => {
  const [viewModal, setViewModal] = useState(false);
  const { addToTable, name, setName, setPaymentPeriod, warning, setWarning, benefitsMaxAmount, setBenefitsMaxAmount, maxQuantityOfBenefits, setMaxQuantityOfBenefits } = useAddNewProject(actualData, setActualData);

  return (
    <>

      <button centered="true" className="project-buttonCreate" onClick={() => setViewModal(true)}>+</button>
      <p className='project-AddNewProjectText'>Add new Project</p>


      <Modal show={viewModal} centered={true} dialogClassName='modal-90w'>
        <ModalHeader className="projectForm-header">
          New Proyect
        </ModalHeader>

        <ModalBody className="modal_BigHeight" >
          <FormGroup className='modal-element'>
            <label className='modal-element'>Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder='New Project'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </FormGroup>


          <FormGroup className='modal-element'>
            <label className='modal-element'>Payment Period:</label>
            <Form.Select onChange={(e) => setPaymentPeriod(e.target.value)}>
              <option >Mensual</option>
              <option >Quincenal</option>
              <option >Semanal</option>
            </Form.Select>
          </FormGroup>

          <FormGroup className='modal-element'>
            <label className='modal-element'>Max Quantity of Benefits Per Employee</label>
            <input
              className="form-control"
              type="number"
              placeholder='0'
              value={maxQuantityOfBenefits}
              onChange={(e) => setMaxQuantityOfBenefits(e.target.value)}
            ></input>
          </FormGroup>

          <FormGroup className='modal-element'>
            <label className='modal-element'>Max Money In Benefits Per Employe</label>
            <input
              className="form-control"
              type="number"
              placeholder='0'
              value={benefitsMaxAmount}
              onChange={(e) => setBenefitsMaxAmount(e.target.value)}
            ></input>
          </FormGroup>



        </ModalBody>

        <ModalFooter className="projectForm-content">
          <label className="warning-message">{warning}</label>
          <button
            className="button create-button"
            onClick={() => {
              addToTable(setViewModal);
            }}
          >
            Insert
          </button>
          <button className="button cancel-button" onClick={() => {
            setViewModal(false)
            setName("");
            setPaymentPeriod("");
            setWarning('');
          }}>
            Cancel
          </button>
        </ModalFooter>


      </Modal>

    </>

  )
}

export default NewProjectForm