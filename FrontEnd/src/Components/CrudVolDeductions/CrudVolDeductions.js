import { Container } from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetVolDeductionsFromDatabase } from "./useGetVolDeductionsFromDatabase";
import { useNavigate } from "react-router-dom";

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
              <th className="table-left-border">Voluntary Deduction </th>
              <th>Cost</th>
              <th>Edit</th>
              <th className="table-right-border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.Nombre}>
                <td>{element.Nombre}</td>
                <td>{element.Costo} ₡</td>
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
