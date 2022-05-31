
export const validateBenefitForm = (name, cost,) => {
  let validCount = 0;
  if (!name) {
    document.getElementById("benefit-name").style.display = "inline";
    document.getElementById("benefit-name").style.color = "red";
    document.getElementById("benefit-name").innerHTML = "You must enter a name for the benefit";
    document.getElementById("Name").style.borderColor = "red";
  } else {
    document.getElementById("benefit-name").innerHTML = "";
    document.getElementById("Name").style.borderColor = "gray";
    validCount++;
  }

  if (!cost) {
    document.getElementById("benefit-cost").style.display = "inline";
    document.getElementById("benefit-cost").style.color = "red";
    document.getElementById("benefit-cost").innerHTML = "The cost of the benefit can't be 0";
    document.getElementById("Cost").style.borderColor = "red";
  } else {
    document.getElementById("benefit-cost").innerHTML = "";
    document.getElementById("Cost").style.borderColor = "gray";
    validCount++;
  }

  if (validCount === 2) {
    return true;
  } else {
    return false;
  }
}