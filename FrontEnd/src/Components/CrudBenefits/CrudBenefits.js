import {
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import { useState } from "react";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";


const database = [
  { id: 1, name: "Gym", actualCost: 20000 },
  { id: 2, name: "Transporte", actualCost: 300000 },
  { id: 3, name: "Fisioterapia", actualCost: 40000 },
];

export const CrudBenefits = () => {
  const [data, setData] = useState(database);
  const [viewModal, setViewModal] = useState(false);
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [warning, setWarning] = useState('');

  const addToTable = () => {
    if (name && cost) {
      const names = [];
      data.map((index) => {
        names.push(index.name);
      })
      if (!names.includes(name)) {
        const newData = {
          id: data.length + 1,
          name: name,
          actualCost: cost,
        };
        setData([...data, newData]);
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
      <Container className="content-container">
        <br />
        <button className=" button create-button" onClick={() => setViewModal(true)}>
          {" "}
          Create New Benefit
        </button>
        <br />
        <Table className="tabla" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Benefit</th>
              <th>Actual Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.actualCost} ₡</td>
                <td>
                  <button className=" button"> Edit </button>
                </td>
                <td>
                  <button className=" button cancel-button" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal isOpen={viewModal}>
        <ModalHeader>
          <div>
            <h3>Insert New Benefit</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>#:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={data.length + 1}
            ></input>
          </FormGroup>

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
