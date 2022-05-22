import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { useState } from "react";
import '../../App.css'
import { useSelector } from "react-redux";

export const VolDeductionsModal = ({ data, setData }) => {
  const [viewModal, setViewModal] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');
  const apiVolDeductions = `http://localhost:4000/volDeductions`

  const submitVolDeduction = async () => {
    const postFetch = await fetch(apiVolDeductions, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        PorcentajeEmpleador: 0.0,
        PorcentajeEmpleado: 0.0,
      }),
    });
    console.log(postFetch);
  }

  const addToTable = () => {
    if (name && name.trim().length > 0) {
      const names = [];
      data.map((index) => names.push(index.Nombre))
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
        };
        setData([...data, newData]);
        submitVolDeduction();
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
              maxLength="50"
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
