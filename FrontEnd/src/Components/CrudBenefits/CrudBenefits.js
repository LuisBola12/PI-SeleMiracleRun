import {
  Container
} from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetBenefitsFromDatabase } from "./useGetBenefitsFromDatabase";
import { useNavigate } from "react-router-dom";




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
