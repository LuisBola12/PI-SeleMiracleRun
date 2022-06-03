import {
  Container
} from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetBenefitsFromDatabase } from "./useGetBenefitsFromDatabase";
import { useNavigate } from "react-router-dom";
import { transformCost } from "../../shared/moneyFormatTransform";

export const CrudBenefits = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/benefits/CreateBenefit")
  }
  const { data, infoReceived } = useGetBenefitsFromDatabase();
  return !infoReceived ? <div className="loader" ></div > : (
    <>
      <Container className="content-container">
        <br />
        <button className="create-button"
          onClick={handleClick}
        >Create New Benefit</button>
        <br />
        <table className="Table">
          <thead>
            <tr className="table-header">
              <th className="table-left-border left-td">Benefit</th>
              <th className="left-td">Description</th>
              <th className="right-td">Actual Cost</th>
              <th className="right-td">Edit</th>
              <th className="table-right-border right-td">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.Nombre}>
                <td className="left-td">{element.Nombre}</td>
                <td className="description-cell left-td">{((element.Descripción) ? element.Descripción : "No description")}</td>
                <td className="right-td">{transformCost(element.CostoActual)}</td>
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
        <label className="Empty-benefit-message">{(data.length === 0) ? "No benefits added yet" : ""}</label>
      </Container>
    </>
  )
};
