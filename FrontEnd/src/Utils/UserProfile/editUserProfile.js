export const removeNoEdit = () => {
    document.getElementById("user-profile-input-name").removeAttribute('disabled')
    document.getElementById("user-profile-input-lastname").removeAttribute('disabled');
    document.getElementById("user-profile-input-secondlastname").removeAttribute('disabled');
    document.getElementById("user-profile-input-email").removeAttribute('disabled');
    document.getElementById("user-profile-input-phoneNumber").removeAttribute('disabled');
    document.getElementById("user-profile-input-name").removeAttribute('readOnly')
    document.getElementById("user-profile-input-lastname").removeAttribute('readOnly');
    document.getElementById("user-profile-input-secondlastname").removeAttribute('readOnly');
    document.getElementById("user-profile-input-email").removeAttribute('readOnly');
    document.getElementById("user-profile-input-phoneNumber").removeAttribute('readOnly');
    document.getElementById("user-profile-buttons-div").style.display = 'flex';
}

export const applyNoEdit = () => {
    document.getElementById("user-profile-input-name").setAttribute('disabled','true')
    document.getElementById("user-profile-input-lastname").setAttribute('disabled','true');
    document.getElementById("user-profile-input-secondlastname").setAttribute('disabled','true');
    document.getElementById("user-profile-input-email").setAttribute('disabled','true');
    document.getElementById("user-profile-input-phoneNumber").setAttribute('disabled','true');
    document.getElementById("user-profile-input-name").setAttribute('readOnly','true')
    document.getElementById("user-profile-input-lastname").setAttribute('readOnly','true');
    document.getElementById("user-profile-input-secondlastname").setAttribute('readOnly','true');
    document.getElementById("user-profile-input-email").setAttribute('readOnly','true');
    document.getElementById("user-profile-input-phoneNumber").setAttribute('readOnly','true');
    document.getElementById("user-profile-buttons-div").style.display = 'none';
}
