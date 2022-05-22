import {
  Container,
} from "reactstrap";
import { useState, useEffect} from "react";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../../history";
import { useSelector } from 'react-redux';

export const CrudEmployee = () => {

  const [infoReceived, setInfoReceived] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchSeleAPI = async () => {
      console.log(activeProject);
      const seleUrl = `http://localhost:4000/employees/${activeProject}`;
      try {
        const response = await fetch(seleUrl);
        const newData = await response.json();
        console.log(newData);
        setData(newData);
        setInfoReceived(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeleAPI();
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