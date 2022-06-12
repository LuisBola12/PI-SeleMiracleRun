import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetvoluntaryDeductionsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [projectvoluntaryDeductions, setProjectvoluntaryDeductions] = useState([{}]);

  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const getvoluntaryDeductions = async () => {
      setProjectvoluntaryDeductions(await getAnEntity('voluntaryDeductions/', activeProject));
      setInfoReceived(true);
    };
    getvoluntaryDeductions();
  }, []);
  return {
    projectvoluntaryDeductions, infoReceived
  };
};
