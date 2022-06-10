export const getAnEntity = async (url, project) => {
  const seleUrl = `http://localhost:4000/${url}${project}`;
  try {
    const response = await fetch(seleUrl);
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};