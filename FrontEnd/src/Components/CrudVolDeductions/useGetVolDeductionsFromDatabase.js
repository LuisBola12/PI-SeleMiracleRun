import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const getVolDeductions = async (apiGetVolDeductions, setData, setInfoReceived) => {
  try {
    const response = await fetch(apiGetVolDeductions);
    const newData = await response.json();
    setData(newData);
    setInfoReceived(true);
  } catch (error) {
    console.log(error);
  }
}

export const useGetVolDeductionsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiGetVolDeductions = `http://localhost:4000/volDeductions/${activeProject}`;
  const [data, setData] = useState([{}]);
  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    getVolDeductions(apiGetVolDeductions, setData, setInfoReceived);
  }, [])
  return {
    data, setData, infoReceived
  }
}
