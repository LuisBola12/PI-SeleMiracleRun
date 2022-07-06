export const removeTimeFromDate = (date) => {
  let myDate = new Date(date);
  let noTimeDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
  return noTimeDate.toDateString();
};