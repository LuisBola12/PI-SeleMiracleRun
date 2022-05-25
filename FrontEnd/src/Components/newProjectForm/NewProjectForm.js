import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form
} from 'react-bootstrap'
import React from 'react'
import './NewProject.css'
import { useAddNewProject } from './useAddNewProject';



const NewProjectForm = ({ cover, actualData, setActualData, }) => {

  const { addToTable, name, setName, setPaymentPeriod, warning, setWarning } = useAddNewProject(cover, actualData, setActualData);

  return (

    <>
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


      </ModalBody>

      <ModalFooter className="projectForm-content">
        <label className="warning-message">{warning}</label>
        <button
          className="button create-button"
          onClick={() => {
            addToTable(cover);
          }}
        >
          Insert
        </button>
        <button className="button cancel-button" onClick={() => {
          cover()
          setName("");
          setPaymentPeriod("");
          setWarning('');
        }}>
          Cancel
        </button>
      </ModalFooter>


    </>


  )
}

export default NewProjectForm