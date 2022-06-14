import { validAnEntity } from "./../validAnEntity";
import { useSelector } from "react-redux";
export const usePutEditUser = () => {
  const user = useSelector((state) => state.user.user);
  const updateEmployee = async (formValues) => {
    const apiEmployee = `http://localhost:4000/updateEmployee`;
    let string = JSON.stringify(formValues);
    string = JSON.stringify({
      Email: formValues.email,
      Nombre: formValues.name,
      Apellido1: formValues.lastname,
      Apellido2: formValues.secondlastname,
      Cedula: formValues.id,
      Telefono: formValues.phoneNumber,
      EmailViejo:user.Email,
    });
    const result = await fetch(apiEmployee, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: string
    });
    console.log(result);
  }
  const updateEmployeer = async (formValues) => {
    const apiEmployeer = `http://localhost:4000/updateEmployeer`;
    let string = JSON.stringify(formValues);
    string = JSON.stringify({
      Email: formValues.email,
      Nombre: formValues.name,
      Apellido1: formValues.lastname,
      Apellido2: formValues.secondlastname,
      Cedula: formValues.id,
      Telefono: formValues.phoneNumber,
      EmailViejo:user.Email,
    });
    const result = await fetch(apiEmployeer, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: string
    });
    console.log(result);
  }
  return {
    updateEmployee,updateEmployeer
  };
};
