export const calculateNetSalary = (
  grossSalary,
  totalCostVolDeductions,
  totalCostOblDeductions
) => {
  let netSalary = grossSalary - totalCostOblDeductions;
  netSalary = netSalary - totalCostVolDeductions;
  return netSalary;
};
export const calculateAmount = (Salary, Percentage) => {
  const salaryI = parseFloat(Salary);
  const percentageI = parseFloat(Percentage);
  if (
    salaryI === null ||
    percentageI === null ||
    salaryI === undefined ||
    percentageI === undefined ||
    salaryI <= 0 ||
    percentageI <= 0
  ) {
    return 0;
  } else {
    return salaryI * (percentageI / 100);
  }
};
export const estimateIncomeTax = (TotalSalary, TipoJornada) => {
  if (TotalSalary <= 863000 / TipoJornada) {
    return 0;
  } else {
    if (
      TotalSalary > 863000 / TipoJornada &&
      TotalSalary < 1267000 / TipoJornada
    ) {
      return TotalSalary * 0.1;
    } else {
      if (
        TotalSalary >= 1267000 / TipoJornada &&
        TotalSalary < 2223000 / TipoJornada
      ) {
        return TotalSalary * 0.15;
      } else {
        if (
          TotalSalary >= 2223000 / TipoJornada &&
          TotalSalary < 4445000 / TipoJornada
        ) {
          return TotalSalary * 0.2;
        } else {
          if (TotalSalary >= 4445000 / TipoJornada) {
            return TotalSalary * 0.25;
          }
        }
      }
    }
  }
};
