import {
  Container,
} from "reactstrap";

import { useState, useEffect,useContext} from "react";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectContext from "../../Contexts/ProjectContext";
import history from "../../history";

export const CrudEmployee = () => {

  const [infoReceived, setInfoReceived] = useState(false);
  const { activeProject } = useContext(ProjectContext);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchSeleAPI = async () => {
      const seleUrl = `http://localhost:5000/employees/${activeProject}`;
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