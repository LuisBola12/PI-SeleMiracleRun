import { React, useState, useEffect } from "react";
import "./EmployeePayslip.scss";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeTimeFromDate } from "../../shared/removeTimeFromDate";
import {
  getOblDeductionsOfAPayslip,
  getVolDeductionsOfAPayslip,
} from "../../Utils/PaySlipReport/getDeductionsData";

export const PayslipReportComp = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [totalSalaryCost, setTotalSalaryCost] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [category, setCategory] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [obligatoryDeductions, setObligatoryDeductions] = useState([]);
  const [totalObligatoryDeductionsCost, setTotalObligatoryDeductionsCost] =
    useState(0);
  const [voluntaryDeductions, setVoluntaryDeductions] = useState([]);
  const [voluntaryDeductionsCost, setTotalVoluntaryDeductionsCost] =
    useState(0);

  let formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CRC",
  });

  const handleReport = async () => {
    let doc = new jsPDF("p", "mm", "a4");
    let file;
    await doc.html(document.getElementById("payrollReport"), {
      margin: [0, 0, 0, 23],
      callback: function (doc) {
        file = doc.output("datauristring");
      },
      html2canvas: { scale: 0.23 },
    });
    return file;
  };

  const sendEmail = async () => {
    const file = await handleReport();
    if (file) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_LOCALHOST}sendFileEmail`, {
          file: file,
          email: "javmoli045@gmail.com",
        })
        .then((res) => {
          if (res.status === 200) console.log("Yeah!");
          else console.log(":(");
        });
    }
  };

  useEffect(() => {
    const getTotalObligatoryDeductions = async () => {
      const data = await getOblDeductionsOfAPayslip(
        location.state.ConsecutivoPago
      );
      if (data) {
        setObligatoryDeductions(data);
        let total = 0;
        data.forEach((element) => {
          total += element.MontoEmpleado;
        });
        setTotalObligatoryDeductionsCost(total);
      }
    };
    const getTotalVoluntaryDeductions = async () => {
      const data = await getVolDeductionsOfAPayslip(
        location.state.ConsecutivoPago
      );
      if (data) {
        setVoluntaryDeductions(data);
        let total = 0;
        data.forEach((element) => {
          total += element.MontoDeduccion;
        });
        setTotalVoluntaryDeductionsCost(total);
      }
    };

    getTotalObligatoryDeductions();
    getTotalVoluntaryDeductions();
  }, []);

  return (
    <>
      <div className="payrollReport-button">
        <label className="payrollReport-header__title">Report</label>
        <button
          className="create-button"
          onClick={() => {
            sendEmail();
          }}
        >
          Enviar
        </button>
      </div>
      <div className="payrollReport-page">
        <div id="payrollReport">
          <div className="payrollReport-header">
            <div className="payrollReport-header__title">{activeProject}</div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Empleado </b>
                {`${user.Nombre} ${user.Apellido1} ${user.Apellido2} - ${user.Cedula} ${location.state.TipoContrato}`}
              </label>
            </div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Consectivo De Pago: </b>
                {location.state.ConsecutivoPago}
              </label>
            </div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Fecha De Pago: </b>
                {removeTimeFromDate(location.state.FechaFin)}
              </label>
            </div>
          </div>
          <div className="payrollReport-salaries">
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">
                Salario Bruto:{" "}
              </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(location.state.SalarioBruto)}
              </label>
            </div>
            <hr></hr>
          </div>
          <div className="payrollReport-lawDeductions">
            <div className="payrollReport-div">
              <label className="payrollReport__title">
                Deducciones por ley
              </label>
            </div>
            {obligatoryDeductions.map((element, index) => (
              <div key={index} className="payrollReport-div">
                <label className="payrollReport__text">
                  {`${element.NombreDeduccionObligatoria}`}
                </label>
                <label className="payrollReport__total">
                  {formatter.format(element.MontoEmpleado)}
                </label>
              </div>
            ))}
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">Total: </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(totalObligatoryDeductionsCost)}
              </label>
            </div>
            <hr></hr>
          </div>
          <div className="payrollReport-lawDeductions">
            <div className="payrollReport-div">
              <label className="payrollReport__title">
                Deducciones Voluntarias
              </label>
            </div>
            {voluntaryDeductions.map((element, index) => (
              <div key={index} className="payrollReport-div">
                <label className="payrollReport__text">
                  {`${element.NombreDeduccion}`}
                </label>
                <label className="payrollReport__total">
                  {formatter.format(element.MontoDeduccion)}
                </label>
              </div>
            ))}
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">Total: </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(voluntaryDeductionsCost)}
              </label>
            </div>
            <hr></hr>
          </div>
          <div className="payrollReport-div">
            <label className="payrollReport__totalCostText">
              Salario Neto:{" "}
            </label>
            <label className="payrollReport__totalCost">
              {formatter.format(
                location.state.SalarioNeto
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
