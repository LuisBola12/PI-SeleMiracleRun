import { useSelector } from 'react-redux';

export const usePutToBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const unlinkBenefitApi = 'http://localhost:4000/myBenefits'

  const updateBenefit = async (name, cost, description, apiBenefits) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apiBenefits, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        CostoActual: parseInt(newCost),
        Descripción: description,
      }),
    });
    console.log(postFetch);
  };

  const unlinkEmployeeToBenefit = async (name) => {
    const postFetch = await fetch(unlinkBenefitApi, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Email: employeeEmail,
        Proyecto: activeProject,
        NombreBeneficio: name
      }),
    });
    console.log(postFetch);
  };

  return {
    updateBenefit, unlinkEmployeeToBenefit
  };
};