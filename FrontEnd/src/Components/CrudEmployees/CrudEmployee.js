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
import history from "../../history";


const database = [
  { Name: "Javier", LastName: "Molina", Id: "118020915", Contract: "Medio Tiempo", Email: "A@example.com", NetSalary: 800000 },
  { Name: "Jarod", LastName: "Venegas", Id: "118020915", Contract: "Tiempo Completo", Email: "A@example.com", NetSalary: 600000 },
  { Name: "Josef", LastName: "Ruzicka", Id: "118020915", Contract: "Servicios", Email: "A@example.com", NetSalary: 300000 },
  { Name: "Charlie", LastName: "Solorzano", Id: "118020915", Contract: "Servicios", Email: "A@example.com", NetSalary: 1200000 },
  { Name: "Luis", LastName: "Bolanos", Id: "118020915", Contract: "Tiempo Completo", Email: "A@example.com", NetSalary: 650000 },


];

export const CrudEmployee = () => {

  const [infoReceived, setInfoReceived] = useState(false);
  const [data, setData] = useState(database);
  useEffect(() => {
    const fetchSeleAPI = async () => {
      const seleUrl = "http://localhost:4000/employees";
      try {
        const response = await fetch(seleUrl);
        const newData = await response.json();
        setData(newData);
        setInfoReceived(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeleAPI();
  }, []);
  return !infoReceived ? <div class="loader"></div> : (
    <>
      <Container className="content-container">
        <br />
        <button className="create-button" onClick=
          {() => {
            history.push('employees/createEmployee')
            history.go()
          }}>
          {" "}
          Create New Employee
        </button>
        <br />
        <table className="Table">
          <thead>
            <tr className="table-header">
              <th className="table-left-border">Name</th>
              <th>Last Name</th>
              <th>Second Last Name</th>
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
              <tr key={element.Nombre}>
                <td>{element.Nombre}</td>
                <td>{element.Apellido1}</td>
                <td>{element.Apellido2}</td>
                <td>{element.Cedula}</td>
                <td>{element.Email}</td>
                <td>{element.TipoContrato}</td>
                <td>₡0.0</td>
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
    </>
  )

};