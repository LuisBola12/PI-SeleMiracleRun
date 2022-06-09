import { validAnEntity } from "./../validAnEntity";
import { useSelector } from "react-redux";
export const usePutEditUser = () => {
    const user = useSelector((state) => state.user.user);
  const updateUser = async (formValues, setIsSubmitting) => {
    const apiEmployee = `http://localhost:4000//updateEmployee`;
    const apiEmployeer = `http://localhost:4000//updateEmployeer`;
    let string = JSON.stringify(formValues);
    string = JSON.stringify({
      Email: formValues.email,
      Nombre: formValues.name,
      Apellido1: formValues.lastname,
      Apellido2: formValues.secondlastname,
      Cedula: formValues.id,
      Telefono: formValues.phoneNumber,
    });
    const userExist = await validAnEntity("users/", formValues.email);
    if (user.Roles === "admin") {
      const idExist = await validAnEntity("employer/", formValues.id);
      if (userExist === true && idExist === true) {
        const putFetch = await fetch(apiEmployee, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: string,
        });
        return putFetch;
      } else {
        setIsSubmitting(false);
        alert("There is already an user with those credentials.");
      }
    } else {
      const idExist = await validAnEntity("employee/", formValues.id);
      if (userExist === true && idExist === true) {
        const putFetch = await fetch(apiEmployeer, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: string,
        });
        return putFetch;
      } else {
        setIsSubmitting(false);
        alert("There is already an user with those credentials.");
        return false;
      }
    }
  };
  return{
      updateUser
  }
};
