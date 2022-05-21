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


export const BenefitsModal = ({ data, setData }) => {
  const [viewModal, setViewModal] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [warning, setWarning] = useState('');

  const apiBenefits = `http://localhost:4000/benefits`

  const submitBenefit = async () => {
    const postFetch = await fetch(apiBenefits, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        CostoActual: cost,
      }),
    });
    console.log(postFetch);
  }



  const addToTable = () => {
    if (name && cost) {
      const names = [];
      data.map((index) => {
        return names.push(index.Nombre);
      })
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
          CostoActual: cost,
        };
        setData([...data, newData]);
        submitBenefit();
        setWarning('');
        setViewModal(false);
        setName("");
        setCost("");
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
      <button className="create-button" onClick={() => setViewModal(true)}>
        Create New Benefit
      </button>
      <Modal className='modal-window' isOpen={viewModal}>
        <ModalHeader>
          <div>
            <h3>Insert New Benefit</h3>
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

          <FormGroup>
            <label>Cost:</label>
            <input
              className="form-control"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
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
            setCost("");
            setWarning('');
          }}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
};
