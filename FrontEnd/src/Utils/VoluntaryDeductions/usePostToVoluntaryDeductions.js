import { useSelector } from 'react-redux';

export const usePostToVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiVoluntaryDeductions = 'http://localhost:4000/voluntaryDeductions';

  const submitVoluntaryDeduction = async (name, cost, description) => {
    const newCost = cost.split('.').join('');
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

  return {
    submitVoluntaryDeduction
  };
};