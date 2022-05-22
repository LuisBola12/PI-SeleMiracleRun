import {
  Container
} from "reactstrap";

import { useState, useEffect, useContext } from "react";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BenefitsModal } from "./BenefitsModal";
import { useSelector } from "react-redux";


export const CrudBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [data, setData] = useState([{}]);
  const [infoReceived, setInfoReceived] = useState(false);

  const apiBenefits = `http://localhost:4000/benefits/${activeProject}`

  useEffect(() => {
    const fetchSeleAPI = async () => {
      try {
        const response = await fetch(apiBenefits);
        const newData = await response.json();
        setData(newData);
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
        <BenefitsModal data={data} setData={setData} />
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

    </>
  )

};
