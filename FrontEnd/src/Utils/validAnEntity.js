export const validAnEntity = async (url, entity) => {
  const seleUrl = `http://localhost:4000/${url}${entity}`;
  try {
    const response = await fetch(seleUrl);
    const newData = await response.json();
    console.log(newData);
    if (newData.length === 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}