import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form
} from 'react-bootstrap'
import React, { useState } from 'react'
import './NewProject.css'

// import Multiselect from 'multiselect-react-dropdown'
const optionss = [
  { name: 'char', value: false },
  { name: 'jo', value: false },
  { name: 'ja', value: false },
]



const NewProjectForm = ({ cover, addNewEntry, actualData, employeesDatabase }) => {

  const [name, setName] = useState('');
  const [employees, setEmployees] = useState(employeesDatabase);
  const [paymentPeriod, setPaymentPeriod] = useState('Mensual');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [options, settOptions] = useState(optionss);

  const [warning, setWarning] = useState('');


  const addToTable = () => {
    if (name && paymentPeriod) {
      const names = [];
      actualData.map((index) => {
        names.push(index.name);
      })
      if (!names.includes(name)) {
        const newData = {
          name: name,
          paymentPeriod: paymentPeriod,
        };
        addNewEntry(newData);
        setWarning('');
        setName("");
        setPaymentPeriod("");
        cover();
      } else {
        setWarning('*That benefit already exist')
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

        {/* <FormGroup className='modal-element'>
          <label className='modal-element'>Empleados:</label>
          <Multiselect
            isObject={false}
            onKeyPressFn={function noRefCheck() { }}
            onRemove={(event) => {
              setSelectedEmployees(event);
              console.log({ selectedEmployees })

            }}
            onSearch={function noRefCheck() { }}
            onSelect={(event) => {
              setSelectedEmployees(event);
              console.log({ selectedEmployees })
            }}
            options={employees}
          />
        </FormGroup> */}




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