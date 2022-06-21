import { useSelector } from 'react-redux';

export const usePutToVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const unlinkVoluntaryDeductionApi = 'http://localhost:4000/myVoluntaryDeductions'
  const apiVoluntaryDeductions = 'http://localhost:4000/voluntaryDeductions'

  const updateVoluntaryDeduction = async (name, cost, description, apiVoluntaryDeductions) => {
    const newCost = cost.split(' ').join('');
    const postFetch = await fetch(apiVoluntaryDeductions, {
      method: 'PUT',
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

  const unlinkEmployeeToVoluntaryDeduction = async (name) => {
    const postFetch = await fetch(unlinkVoluntaryDeductionApi, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Email: employeeEmail,
        Proyecto: activeProject,
        NombreDeduccionVoluntaria: name
      }),
    });
    console.log(postFetch);
  };

  const deactivateVoluntaryDeduction = async (name) => {
    const postFetch = await fetch(apiVoluntaryDeductions, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
      }),
    });
    console.log(postFetch);
  };

  return {
    updateVoluntaryDeduction, unlinkEmployeeToVoluntaryDeduction, deactivateVoluntaryDeduction
  };
};