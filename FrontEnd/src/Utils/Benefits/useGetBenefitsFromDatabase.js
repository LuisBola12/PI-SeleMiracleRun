import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetBenefitsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [projectBenefits, setProjectBenefits] = useState([{}]);

  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const getBenefits = async () => {
      setProjectBenefits(await getAnEntity('benefits/', activeProject));
      setInfoReceived(true);
    };
    getBenefits();
  }, []);
  return {
    projectBenefits, infoReceived
  };
};
