import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAnEntity } from '../getAnEntity'

export const useGetBenefitsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [data, setData] = useState([{}]);

  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const getBenefits = async () => {
      setData(await getAnEntity('benefits/', activeProject));
      setInfoReceived(true);
    }
    getBenefits();
  }, [])
  return {
    data, infoReceived
  }
}
