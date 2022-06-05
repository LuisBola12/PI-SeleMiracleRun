import {
  Container
} from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetBenefitsFromDatabase } from "../../Utils/Benefits/useGetBenefitsFromDatabase";
import { useNavigate } from "react-router-dom";
import { transformCost } from "../../shared/moneyFormatTransform";

export const CrudBenefits = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/benefits/CreateBenefit")
  }
  const handleEditClick = (element) => {
    navigate('/benefits/editBenefit', { state: element })
  }
  const { projectBenefits, infoReceived } = useGetBenefitsFromDatabase();
  return !infoReceived ? <div className="loader" ></div > : (
    <>
      <Container className="content-container">
        <br />
        <button className="create-button"
          onClick={handleCreateClick}
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
            {projectBenefits.map((element) => (
              <tr key={element.Nombre}>
                <td className="left-td bottom-border table-left-border">{element.Nombre}</td>
                <td className="description-cell left-td bottom-border">{((element.Descripción) ? element.Descripción : "No description")}</td>
                <td className="right-td bottom-border">₡ {transformCost(element.CostoActual)}</td>
                <td className="right-button bottom-border">
                  <button className="button" onClick={() => handleEditClick(element)}> Edit </button>
                </td>
                <td className="right-button bottom-border table-right-border">
                  <button className="button cancel-button" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <label className="Empty-message">{(projectBenefits.length === 0) ? "No benefits added yet" : ""}</label>
      </Container>
    </>
  )
};
