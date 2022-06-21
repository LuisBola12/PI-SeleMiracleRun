import { useSelector } from 'react-redux';

export const usePostToBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiBenefits = 'http://localhost:4000/benefits';
  const apiBenefitsToEmplyee = 'http://localhost:4000/myBenefits'
  const employeeEmail = useSelector((state) => state.user.user.Email);

  const submitBenefit = async (name, cost, description) => {
    const newCost = cost.split(' ').join('');
    const postFetch = await fetch(apiBenefits, {
      method: 'POST',
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

  const submitBenefitToEmployee = async (benefitName) => {
    const postFetch = await fetch(apiBenefitsToEmplyee, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Email: employeeEmail,
        NombreProyecto: activeProject,
        NombreBeneficio: benefitName,
      }),
    });
    console.log(postFetch);
  };

  return {
    submitBenefit, submitBenefitToEmployee
  };
};