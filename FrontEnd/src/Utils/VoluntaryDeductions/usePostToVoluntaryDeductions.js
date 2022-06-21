import { useSelector } from 'react-redux';

export const usePostToVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiVoluntaryDeductions = 'http://localhost:4000/voluntaryDeductions';
  const apiVoluntaryDeductionsToEmplyee = 'http://localhost:4000/myVoluntaryDeductions'
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const submitVoluntaryDeduction = async (name, cost, description) => {
    const newCost = cost.split(' ').join('');
    const postFetch = await fetch(apiVoluntaryDeductions, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        Costo: parseInt(newCost),
        Descripcion: description,
      }),
    });
    console.log(postFetch);
  };

  const submitVoluntaryDeductionToEmployee = async (voluntaryDeductionName) => {
    const postFetch = await fetch(apiVoluntaryDeductionsToEmplyee, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Email: employeeEmail,
        NombreProyecto: activeProject,
        NombreDeduccionVoluntaria: voluntaryDeductionName,
      }),
    });
    console.log(postFetch);
  };

  return {
    submitVoluntaryDeduction, submitVoluntaryDeductionToEmployee
  };
};