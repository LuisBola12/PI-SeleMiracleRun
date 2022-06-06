import React from "react";
import { Container } from "reactstrap";
import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';

export const PayrollDetails = () => {
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
  return (
    <>
        <div className="table-button">
            <br />
            <button className="button cancel-button">Back</button>
          <br />
        </div>
        <table className="Table">
            <thead>
              <tr className="table-header">
                <th className="table-left-border">Id</th>
                <th className="">Name</th>
                <th className="">Hours Worked</th>
                <th className="">Gross Salary</th>
                <th className="">Mandatory Deductions</th>
                <th className="">Voluntary Deductions</th>
                <th className="">Benefits</th>
                <th className="table-right-border">Net Salary</th>
                {/* <th className="table-right-border">Employees Payslips</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td className="">{element.id}</td>
                  <td className="">{element.name}</td>
                  <td className="">{element.hoursWorked}</td>
                  <td className="">{element.grossSalary}</td>
                  <td className="">{element.mandatoryDeductions}</td>
                  <td className="">{element.voluntaryDeductions}</td>
                  <td className="">{element.benefits}</td>
                  <td className="">{element.netSalary}</td>
                </tr>
              ))}
            </tbody>
         </table>
    </>
  );
};
