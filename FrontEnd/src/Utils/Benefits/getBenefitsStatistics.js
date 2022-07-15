export const getBenefitsStatistics = async( EmployerID ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'benefitsStatistics/' + EmployerID;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}