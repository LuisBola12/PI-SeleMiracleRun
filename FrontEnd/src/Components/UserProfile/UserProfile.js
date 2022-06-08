import React from 'react';
import { IconContext } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { useForm } from './../../shared/hooks/useForm';
import { validateForm } from '../../Utils/CreateEmployee/CreateEmployee';
import { useGetProfileData } from './../../Utils/UserProfile/getUserProfile';
import { removeNoEdit,applyNoEdit } from './../../Utils/UserProfile/editUserProfile';

export const UserProfile = () => {
  const editUser = () => {};
  const {
    formValues,
    handleInputChange,
    handleSubmit,
  } = useForm(editUser, validateForm);
  const {userInfo,infoReceived} = useGetProfileData(formValues);

  return !infoReceived ? <div className='loader' ></div > :(
    <>
      <div className='user-info-container'>
        <div className='user-profile-header'>
          <div className='user-profile-logo'>LB</div>
          <div className='user-profile-edit-icon'>
            <IconContext.Provider
              value={{
                className: 'user-profile-edit-button',
              }}
            >
              <button className='edit-profile-button' onClick={removeNoEdit}>
                <FaEdit />
              </button>
            </IconContext.Provider>
          </div>
        </div>
        <div className='user-profile-form'>
          <div className='user-profile-inner-div'>

            <label className='user-profile-label'>Name</label>
            <input
              id='user-profile-input-name'
              className='user-profile-input'
              disabled
              value={formValues.name = userInfo[0].Nombre}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>

            <label className='user-profile-label'>First Lastname</label>
            <input
              id='user-profile-input-lastname'
              className='user-profile-input'
              disabled
              value={formValues.lastName = userInfo[0].Apellido1}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>

            <label className='user-profile-label'>Second Lastname</label>
            <input
              id='user-profile-input-secondlastname'
              className='user-profile-input'
              disabled
              value={formValues.secondlastname = userInfo[0].Apellido2}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>

            <label className='user-profile-label'>Identification</label>
            <input
              className='user-profile-input'
              disabled
              value={formValues.id = userInfo[0].Cedula}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <label className='user-profile-label'>Email</label>
            <input
              id='user-profile-input-email'
              className='user-profile-input'
              disabled
              value={formValues.email = userInfo[0].Email}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <label className='user-profile-label'>Phone Number</label>
            <input
              id='user-profile-input-phoneNumber'
              className='user-profile-input'
              disabled
              value={formValues.phoneNumber = userInfo[0].Telefono}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'></div>

          <div id= 'user-profile-buttons-div'className='user-profile-buttons'>

            <button className='submit-change-btn'
              onClick={handleSubmit}>
              Submit
            </button>
            <button className='dont-change-btn' onClick={applyNoEdit} >
              Cancel
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
