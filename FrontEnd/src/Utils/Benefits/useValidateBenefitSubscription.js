import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const launchInfoMessage = (title, icon, message, buttonColor) => {
  Swal.fire( {
    icon: icon,
    title: title,
    text: message,
    confirmButtonColor:buttonColor,
  } );

}



const useValidateBenefitSubscription = () => {
  const url = 'validateBenefit' ;
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  

  const canSuscribe = async (benefitToValidateName) => {
  let errorMessageForUser = ``;
  const responseFromApi = await fetch(`http://localhost:4000/${url}/${activeProject}/${employeeEmail}/${benefitToValidateName}`)
  const validateInfo = await responseFromApi.json();
  console.log(validateInfo);

  if (responseFromApi.status === 500){
  errorMessageForUser = 'Error de conexion con la base de datos, intente de nuevo mas tarde';
  launchInfoMessage('Error De Conexión', 'info', errorMessageForUser,'darkgreen');
  return;
  }
  if (validateInfo.isValid){
  launchInfoMessage('Suscrito a Beneficio', 'success', `Se ha suscrito al beneficio: ${benefitToValidateName}`,'darkgreen');
    return true;
  }
  else if (validateInfo.exceedsMoneyAmountLimit) { 
    errorMessageForUser = `El beneficio: ${benefitToValidateName} supera el monto máximo de dinero permitido por empleado.
    El monto maximo por empleado es de: ${validateInfo.maxMoneyAmountAllowed}`;
  }
  if (validateInfo.exceedsBenefitsQtyLimit) { 
    if(validateInfo.exceedsMoneyAmountLimit){
      errorMessageForUser = errorMessageForUser+'. ';
    }
    errorMessageForUser = errorMessageForUser + `Se excede la cantidad maxima de beneficios permitida, que es de: ${validateInfo.maxBenefitsQtyAllowed}`
  }

  launchInfoMessage('Error', 'error', errorMessageForUser ,'darkgreen');
 return false;
 }
  
  
  
  
  
  
  return {
  canSuscribe 
  }
}

export default useValidateBenefitSubscription;