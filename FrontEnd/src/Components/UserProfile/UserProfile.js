import React from "react";
import { IconContext } from "react-icons";
import { FaEdit } from "react-icons/fa";
import { useForm } from "./../../shared/hooks/useForm";
import { useGetProfileData } from "./../../Utils/UserProfile/getUserProfile";
import { usePutEditUser } from "../../Utils/UserProfile/putEditProfile";
import {
  removeNoEdit,
  applyNoEdit,
  validateEditUserForm,
} from "./../../Utils/UserProfile/editUserProfile";
export const UserProfile = () => {
  const {updateUser} = usePutEditUser();
  const submit = async () => {
    const result = updateUser(formValues,setIsSubmitting);
    if(result){
      applyNoEdit();
    }
  }
  const {
    formValues,
    handleInputChange,
    handleSubmit,
    errors,
    setIsSubmitting,
  } = useForm(submit, validateEditUserForm);
  const { userInfo, infoReceived } = useGetProfileData(formValues);
  return !infoReceived ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="user-info-container">
        <div className="user-profile-header">
          <div className="user-profile-logo">LB</div>
          <div className="user-profile-edit-icon">
            <IconContext.Provider
              value={{
                className: "user-profile-edit-button",
              }}
            >
              <button className="edit-profile-button" onClick={removeNoEdit}>
                <FaEdit />
              </button>
            </IconContext.Provider>
          </div>
        </div>
        <div className="user-profile-form">
          <div className="user-profile-inner-div">
            <div className="div-profile">
              <label className="user-profile-label">Name</label>
              <label id="error-name-user" className="error-label">
                {errors.name}
              </label>
            </div>
            <input
              id="name"
              className="user-profile-input"
              disabled
              value={(formValues.name = userInfo[0].Nombre)}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className="user-profile-inner-div">
            <div className="div-profile">
              <label className="user-profile-label">First Last Name</label>
              <label id="error-fLastname-user" className="error-label">
                {errors.lastname}
              </label>
            </div>
            <input
              id="lastname"
              className="user-profile-input"
              disabled
              value={(formValues.lastName = userInfo[0].Apellido1)}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className="user-profile-inner-div">
            <div className="div-profile">
              <label className="user-profile-label">Second Last Name</label>
              <label id="error-Slastname-user" className="error-label">
                {errors.secondlastname}
              </label>
            </div>
            <input
              id="secondlastname"
              className="user-profile-input"
              disabled
              value={(formValues.secondlastname = userInfo[0].Apellido2)}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className="user-profile-inner-div">
            <div className="div-profile">
              <label className="user-profile-label">Identification</label>
              <label id="error-id-user" className="error-label">
                {errors.email}
              </label>
            </div>
            <input
              id="id"
              className="user-profile-input"
              disabled
              value={(formValues.id = userInfo[0].Cedula)}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className="user-profile-inner-div">
            <div className="div-profile">
              <label className="user-profile-label">Email</label>
              <label id="error-email-user" className="error-label">
                {errors.email}
              </label>
            </div>
            <input
              id="email"
              className="user-profile-input"
              disabled
              value={(formValues.email = userInfo[0].Email)}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className="user-profile-inner-div">
            <div className="div-profile">
              <label className="user-profile-label">Phone Number</label>
              <label id="error-phoneNumber-user" className="error-label">
                {errors.phoneNumber}
              </label>
            </div>
            <input
              id="phoneNumber"
              className="user-profile-input"
              disabled
              value={(formValues.phoneNumber = userInfo[0].Telefono)}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className="user-profile-inner-div"></div>

          <div id="user-profile-buttons-div" className="user-profile-buttons">
            <button className="submit-change-btn" onClick={handleSubmit}>
              Submit
            </button>
            <button className="dont-change-btn" onClick={applyNoEdit}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
