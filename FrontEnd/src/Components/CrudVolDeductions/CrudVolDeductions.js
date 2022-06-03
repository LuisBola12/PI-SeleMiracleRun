import { Container } from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetVolDeductionsFromDatabase } from "./useGetVolDeductionsFromDatabase";
import { useNavigate } from "react-router-dom";
import { transformCost } from "../../shared/moneyFormatTransform";

export const CrudVolDeductions = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/volDeductions/CreateVolDeductions")
  }
  const { data, infoReceived } = useGetVolDeductionsFromDatabase();
  return !infoReceived ? <div className="loader" ></div > : (
    <>
      <Container className="content-container">
        <br />
        <button className="create-button"
          onClick={handleClick}
        >Create New Voluntary Deduction</button><br />
        <br />
        <table className="Table">
          <thead>
          <tr className="table-header">
              <th className="table-left-border left-td">Voluntary Deduction</th>
              <th className="left-td">Description</th>
              <th className="right-td">Cost</th>
              <th className="right-td">Edit</th>
              <th className="table-right-border right-td">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.Nombre}>
                <td className="left-td">{element.Nombre}</td>
                <td className="description-cell left-td">{((element.Descripcion) ? element.Descripcion : "No description")}</td>
                <td className="right-td">{transformCost(element.Costo)}</td>
                <td className="right-button">
                  <button className=" button"> Edit </button>
                </td>
                <td className="right-button">
                  <button className=" button cancel-button" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <label className="Empty-volDeduction-message">{(data.length === 0) ? "No voluntary deductions added yet" : ""}</label>
      </Container>
    </>
  )
};
