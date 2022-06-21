export const getLastDate = async (EmployeeId, ProjectName, ActualDate) => {
  const seleUrl = `http://localhost:4000/lastDateForCalendar/${EmployeeId}/${ProjectName}/${ActualDate}`;
  try {
    const response = await fetch(seleUrl);
    const newData = await response.json();
    console.log(newData)
    return newData;
  } catch (error) {
    console.log(error);
  }
};

export const getFirstDate = async (EmployeeId, ProjectName,) => {
  const seleUrl = `http://localhost:4000/firstContractDate/${EmployeeId}/${ProjectName}`;
  try {
    const response = await fetch(seleUrl);
    const newData = await response.json();
    console.log(newData)
    return newData;
  } catch (error) {
    console.log(error);
  }
};