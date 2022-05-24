import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const getBenefits = async (apiGetBenefits, setData, setInfoReceived) => {
  try {
    const response = await fetch(apiGetBenefits);
    const newData = await response.json();
    setData(newData);
    setInfoReceived(true);
  } catch (error) {
    console.log(error);
  }
}

export const useGetBenefitsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiGetBenefits = `http://localhost:4000/benefits/${activeProject}`;
  const [data, setData] = useState([{}]);
  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    getBenefits(apiGetBenefits, setData, setInfoReceived);
  }, [])
  return {
    data, setData, infoReceived
  }
}
