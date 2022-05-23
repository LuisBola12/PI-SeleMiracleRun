import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form
} from 'react-bootstrap'
import React, { useState } from 'react'
import './NewProject.css'




const NewProjectForm = ({ cover, addNewEntry, actualData }) => {

  const [name, setName] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('Mensual');

  const [warning, setWarning] = useState('');


  const addToTable = () => {
    if (name && paymentPeriod) {
      const names = [];
      actualData.map((index) => {
        return names.push(index.name);
      })
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
          TipoPeriodo: paymentPeriod,
        };
        addNewEntry(newData);
        setWarning('');
        setName("");
        setPaymentPeriod("");
        cover();
      } else {
        setWarning('*That Project Name already exist')
      }

    }
    else {
      setWarning('*Please enter all the values')
    }
  }

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
            addToTable();
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