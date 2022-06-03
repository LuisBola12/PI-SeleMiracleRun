import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from '../../shared/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';






export const useProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const emailFromUser = useSelector((state) => state.user.user.Email);
  const { loading, error } = useFetch(`http://localhost:4000/projects/${emailFromUser}`, setProjects);
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const handleProjectSelection = (projectName) => {
    dispatch(updateActiveProject(projectName));
    navigate('/employees');

  }


  return {
    projects,
    handleProjectSelection,
    loading, error
  }
}
