import { useSelector } from 'react-redux';

export const usePostTovoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apivoluntaryDeductions = 'http://localhost:4000/voluntaryDeductions';

  const submitvoluntaryDeduction = async (name, cost, description) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apivoluntaryDeductions, {
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
    submitvoluntaryDeduction
  };
};