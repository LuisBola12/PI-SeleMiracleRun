import { Container } from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { VolDeductionsModal } from "./VolDeductionsModal";
import { useGetVolDeductionsFromDatabase } from "./useGetVolDeductionsFromDatabase";

export const CrudVolDeductions = () => {
  const { data, setData, infoReceived } = useGetVolDeductionsFromDatabase();
  return !infoReceived ? <div className="loader" ></div > : (
    <>
      <Container className="content-container">
        <br />
        <VolDeductionsModal data={data} setData={setData} />
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
