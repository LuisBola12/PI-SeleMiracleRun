import {
  Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../../history";
import { useSelector } from 'react-redux';
import { getAnEntity } from './../../Utils/getAnEntity';

export const CrudEmployee = () => {

  const [infoReceived, setInfoReceived] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const newData = await getAnEntity('employee/', activeProject)
      setData(newData);
      setInfoReceived(true);
    }
    getData();
  }, []);
  return !infoReceived ? <div className="loader"></div> : (
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
              <th>Email</th>
              <th>Contract</th>
              <th>Net Salary</th>
              <th>Edit</th>
              <th className="table-right-border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.Nombre}>
                <td className="table-left-border">{element.Nombre}</td>
                <td>{element.Apellido1}</td>
                <td>{element.Apellido2}</td>
                <td>{element.Cedula}</td>
                <td>{element.Email}</td>
                <td>{element.TipoContrato}</td>
                <td>₡0.0</td>
                <td>
                  <button className=" button"> Edit </button>
                </td>
                <td className="table-right-border">
                  <button className=" button cancel-button" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <label className="Empty-message">{(data.length === 0) ? "No employees added yet" : ""}</label>
      </Container>
    </>
  )

};