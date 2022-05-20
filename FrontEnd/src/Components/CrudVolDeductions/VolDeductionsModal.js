import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import { useState } from "react";
import '../../App.css'

export const VolDeductionsModal = ({ data, setData }) => {
  const [viewModal, setViewModal] = useState(false);
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');

  const addToTable = () => {
    if (name) {
      const names = [];
      data.map((index) => {
        names.push(index.Nombre);
      })
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
        };
        setData([...data, newData]);
        setWarning('');
        setViewModal(false);
        setName("");
      } else {
        setWarning('*That voluntary deduction already exist')
      }

    }
    else {
      setWarning('*Please enter all the values')
    }
  }

  return (
    <>
      <button className="create-button" onClick={() => setViewModal(true)}>
        Create New Voluntary Deduction
      </button>
      <Modal className='modal-window' isOpen={viewModal}>
        <ModalHeader>
          <div>
            <h3>Insert New Voluntary Deduction</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
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
            setViewModal(false)
            setName("");
            setWarning('');
          }}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
};
