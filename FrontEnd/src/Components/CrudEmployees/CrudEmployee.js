import {
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
    { Name: "Javier", LastName: "Molina", Id: "118020915",Contract:"Medio Tiempo",Email:"A@example.com",NetSalary:800000},
    { Name: "Jarod", LastName: "Venegas", Id: "118020915",Contract:"Tiempo Completo",Email:"A@example.com",NetSalary:600000},
    { Name: "Josef", LastName: "Ruzicka", Id: "118020915",Contract:"Servicios",Email:"A@example.com",NetSalary:300000},
    { Name: "Charlie", LastName: "Solorzano", Id: "118020915",Contract:"Servicios",Email:"A@example.com",NetSalary:1200000},
    { Name: "Luis", LastName: "Bolanos", Id: "118020915",Contract:"Tiempo Completo",Email:"A@example.com",NetSalary:650000},
  
  
  ];
  
  export const CrudEmployee = () => {
    const [data, setData] = useState(database);
    const [viewModal, setViewModal] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [contract, setContract] = useState('');
    const [email, setEmail] = useState('');
    const [netSalary, setNetSalary] = useState('');
  
    const addToTable = () => {
        const newData = {
            Name:name,
            LastName:lastName,
            Id:id,
            Contract:contract,
            Email:email,
            NetSalary:netSalary
        }
        setData([...data, newData]);
        resetCrud();
    }
    const resetCrud = () => {
        setViewModal(false);
        setName("");
        setLastName("");
        setId("");
        setContract("");
        setEmail("");
        setNetSalary(0);
    }
    return (
      <>
        <Container className="content-container">
          <br/>
          <button className="create-button" onClick={() => setViewModal(true)}>
            {" "}
            Create New Benefit
          </button>
          <br />
          <table className="Table">
            <thead>
              <tr className="table-header">
                <th className="table-left-border">Name</th>
                <th>Last Name</th>
                <th>Id</th>
                <th>Contract</th>
                <th>Email</th>
                <th>Net Salary</th>
                <th>Edit</th>
                <th className="table-right-border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td className="tds">{element.Name}</td>
                  <td>{element.LastName}</td>
                  <td>{element.Id}</td>
                  <td>{element.Contract}</td>
                  <td>{element.Email}</td>
                  <td>₡{element.NetSalary}</td>
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
              <h3>Create New Employee</h3>
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
              <label>LastName:</label>
              <input
                className="form-control"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </FormGroup>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              ></input>
            </FormGroup>
            <FormGroup>
              <label>Contract:</label>
              <input
                className="form-control"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              ></input>
            </FormGroup>
            <FormGroup>
              <label>Email:</label>
              <input
                className="form-control"
                type="text"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              ></input>
            </FormGroup>
            <FormGroup>
              <label>NetSalary:</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
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
              resetCrud();
            }}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </>
    )
  
  };