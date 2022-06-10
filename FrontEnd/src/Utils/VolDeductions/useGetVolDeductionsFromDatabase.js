import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetVolDeductionsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [projectVolDeductions, setProjectVolDeductions] = useState([{}]);

  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const getVolDeductions = async () => {
      setProjectVolDeductions(await getAnEntity('volDeductions/', activeProject));
      setInfoReceived(true);
    };
    getVolDeductions();
  }, []);
  return {
    projectVolDeductions, infoReceived
  };
};
