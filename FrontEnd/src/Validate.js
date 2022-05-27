export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
      );
}

export const validatePassword = (password) => {
  return String(password)
      .toLowerCase()
      .match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
      );
}
export const validateName = (name) =>{
    return String(name)
      .toLowerCase()
      .match(
        /^[A-Za-z\s]+$/
      );
}
export const validateId = (id) => {
    return String(id)
      .toLowerCase()
      .match(
        /^[1-9]-?\d{4}-?\d{4}$/
      );
}
