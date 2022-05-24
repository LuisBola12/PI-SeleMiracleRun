import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from '../../shared/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';



const submitNewProject = async (name, paymentPeriod, emailFromUser) => {
  const postFetch = await fetch("http://localhost:4000/projects", {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Nombre: name,
      Periodo: paymentPeriod,
      Email: emailFromUser,
    }),
  });
  console.log(postFetch);
}


export const useProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const emailFromUser = useSelector((state) => state.user.user.Email);
  const { loading, error } = useFetch(`http://localhost:4000/projects/${emailFromUser}`, setProjects);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const addNewEntry = (newEntry) => {
    setProjects([...projects, newEntry]);
    submitNewProject(newEntry.Nombre, newEntry.TipoPeriodo, emailFromUser, loading, error);
  }

  const handleProjectSelection = (projectName) => {
    console.log(`El seleccionado:${projectName}`);
    dispatch(updateActiveProject(projectName));
    navigate('/employees');

  }

  return { projects, setProjects, submitNewProject, addNewEntry, handleProjectSelection }
}
