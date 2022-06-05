import Swal from 'sweetalert2'
import {
  Container
} from "reactstrap";
import '../../App.css'
import { transformCost } from "../../shared/moneyFormatTransform";
import { useGetBenefitsFromDatabase } from '../../Utils/Benefits/useGetBenefitsFromDatabase';
import { useState } from 'react';

const database = [
  {
    Nombre: 'Spa',
    CostoActual: 25000,
    Descripción: 'Dinero para spa'
  },
  {
    Nombre: 'Almuerzo',
    CostoActual: 20000,
    Descripción: 'Dinero para que los empleados compren sus almuerzos'
  }

];


export const EmployeeBenefits = () => {
  const isVinculated = (name) => {
    for (let i = 0; i < database.length; i++) {
      if (database[i].Nombre == name) {
        return true;
      }
    }
    return false;
  }
  const { projectBenefits, infoReceived } = useGetBenefitsFromDatabase();
  const [data, setdata] = useState(database);
  const handleAddButton = (element) => {
    //En desarrollo, se agregó este agregado básico solo para pruebas.
    setdata([...data, element]);
  }
  return !infoReceived ? <div className="loader" ></div > : (
    <>
      <Container className="content-container">
        <br />
        <br />
        <h2>My Benefits</h2>
        <table className="Table">
          <thead>
            <tr className="table-header">
              <th className="table-left-border left-td">Benefit</th>
              <th className="left-td">Description</th>
              <th className="right-td">Actual Cost</th>
              <th className="table-right-border right-td">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.Nombre}>
                <td className="left-td bottom-border table-left-border">{element.Nombre}</td>
                <td className="description-cell left-td bottom-border">{((element.Descripción) ? element.Descripción : "No description")}</td>
                <td className="right-td bottom-border">₡ {transformCost(element.CostoActual)}</td>
                <td className="right-button bottom-border table-right-border">
                  <button className="button cancel-button" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <label className="Empty-message">{(data.length === 0) ? "No benefits selected added yet" : ""}</label>

        <h2>Offered Benefits</h2>
        <table className="Table">
          <thead>
            <tr className="table-header">
              <th className="table-left-border left-td">Benefit</th>
              <th className="left-td">Description</th>
              <th className="right-td">Actual Cost</th>
              <th className="table-right-border right-td">Add</th>
            </tr>
          </thead>
          <tbody>
            {projectBenefits.map((element) => (
              <tr key={element.Nombre}>
                {isVinculated(element.Nombre) == false &&
                  <>
                    <td className="left-td bottom-border table-left-border">{element.Nombre}</td>
                    <td className="description-cell left-td bottom-border">{((element.Descripción) ? element.Descripción : "No description")}</td>
                    <td className="right-td bottom-border">₡ {transformCost(element.CostoActual)}</td>
                    <td className="right-button bottom-border table-right-border">
                      <button className="button add-button" onClick={() => handleAddButton(element)}> Add</button>
                    </td>
                  </>
                }
              </tr>
            ))}
          </tbody>
        </table>
        <label className="Empty-message">{(projectBenefits.length === 0) ? "No benefits added added yet" : ""}</label>
      </Container>
    </>
  )
}