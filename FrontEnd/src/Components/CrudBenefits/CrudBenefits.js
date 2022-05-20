import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import { useState, useEffect } from "react";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";

const database = [
  {
    Nombre: '',
    CostoActual: 0
  }

];

const projectName = 'Radiadores Solceri';
const apiBenefits = `http://localhost:5000/benefits/${projectName}`

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

  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const fetchSeleAPI = async () => {
      try {
        const response = await fetch(apiBenefits);
        const newData = await response.json();
        setData(newData);
        console.log(newData)
        setInfoReceived(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeleAPI();
  }, []);
  return !infoReceived ? <div className="loader" ></div > : (
    <>
      <Container className="content-container">
        <br />
        <button className="create-button" onClick={() => setViewModal(true)}>
          {" "}
          Create New Benefit
        </button>
        <br />
        <table className="Table">
          <thead>
            <tr className="table-header">
              <th className="table-left-border">Benefit </th>
              <th>Actual Cost</th>
              <th>Edit</th>
              <th className="table-right-border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.Nombre}>
                <td>{element.Nombre}</td>
                <td>{element.CostoActual} ₡</td>
                <td>
                  <button className=" button"> Edit </button>
                </td>
                <td>
                  <button className=" button cancel-button" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
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
