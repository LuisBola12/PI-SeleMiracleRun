import React from "react";
import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';
import { transformCost } from "../../shared/moneyFormatTransform";
import history from './../../history';
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const PayrollDetails = () => {
    const [startDate,setStartDate] = useState();
    const [endDate,setEndDate] = useState();
    const location = useLocation();
    const data = [{
            'id':118020915,
            'name': 'Luis Bolanos',
            'hoursWorked': 40,
            'grossSalary': 750000,
            'mandatoryDeductions':75000,
            'voluntaryDeductions':40000,
            'benefits':35000,
            'netSalary': 600000
        },{
            'id':118020915,
            'name': 'Luis Bolanos',
            'hoursWorked': 40,
            'grossSalary': 750000,
            'mandatoryDeductions':75000,
            'voluntaryDeductions':40000,
            'benefits':35000,
            'netSalary': 600000 
        },
        {
            'id':118020915,
            'name': 'Luis Bolanos',
            'hoursWorked': 40,
            'grossSalary': 750000,
            'mandatoryDeductions':75000,
            'voluntaryDeductions':40000,
            'benefits':35000,
            'netSalary': 600000
        }
    ]
    const back = () => {
      history.push('/payroll')
      history.go()
    }
    useEffect(() => {
      setStartDate(location.state.StartDate)
      setEndDate(location.state.EndDate)
    }, [])
  return (
    <>
        <h1 className="details-head-title">
          {`PaySlips from: ${startDate} - ${endDate}`}
        </h1>
        <div className="details-table-button">
                <IconContext.Provider value={{ color: "gray", className: "global-class-name", size: "3rem"}}>
                <button className="back-arrow-button" onClick={()=>{back()}}>
                    <FaArrowLeft />
                </button>
              </IconContext.Provider>
            <br />
        </div>
        <table className="Table">
            <thead>
              <tr className="table-header">
                <th className="left-td table-left-border">Id</th>
                <th className="left-td">Name</th>
                <th className="left-td">Hours Worked</th>
                <th className="right-td">Gross Salary</th>
                <th className="right-td">Mandatory Deductions</th>
                <th className="right-td">Voluntary Deductions</th>
                <th className="right-td">Benefits</th>
                <th className="table-right-border">Net Salary</th>
                {/* <th className="table-right-border">Employees Payslips</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td className="left-td table-left-border">{element.id}</td>
                  <td className="left-td">{element.name}</td>
                  <td className="left-td">{element.hoursWorked}</td>
                  <td className="right-td">₡{transformCost(element.grossSalary)}</td>
                  <td className="right-td">₡{transformCost(element.mandatoryDeductions)}</td>
                  <td className="right-td">₡{transformCost(element.voluntaryDeductions)}</td>
                  <td className="right-td">₡{transformCost(element.benefits)}</td>
                  <td className="table-right-border right-td">₡{transformCost(element.netSalary)}</td>
                </tr>
              ))}
            </tbody>
         </table>
    </>
  );
};
