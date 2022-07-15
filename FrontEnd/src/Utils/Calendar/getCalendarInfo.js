export const getHoursEmployer = async( ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'getHours';
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}