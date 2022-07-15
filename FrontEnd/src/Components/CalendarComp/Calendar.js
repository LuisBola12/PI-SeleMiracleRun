<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import {  Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.scss';
import {Modal, Button, Form} from 'react-bootstrap';
import validate from '../../Utils/Calendar/calendarValidations';
=======
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.scss';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import validate from './calendarValidations';
>>>>>>> 79f4583105648eb5658a35e3c728f4bdaae00e9b
import usePost from '../../shared/hooks/usePost';
import { useSelector } from 'react-redux';
import { getLastDate, getFirstDate } from '../../Utils/Calendar/datesFromDB';

export const CalendarComp = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [hours, setHours] = useState('');
<<<<<<< HEAD
  const { post } = usePost('http://localhost:4000/employee/hours');
  const [dateMin, setDateMin ] = useState(null);

  const dateToString = (Idate) => {
    return `${Idate.getFullYear()}-${Idate.getMonth()+1}-${Idate.getDay()}`
=======
  const { post } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + 'employee/hours');
  const dateMin = null;

  const dateToString = () => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
>>>>>>> 79f4583105648eb5658a35e3c728f4bdaae00e9b
  };
  const userEmail = useSelector((state) => state.user.user.Email);
  const project = useSelector((state) => state.activeProject.projectName);
  const employeeID = useSelector((state) => state.user.user.Cedula);
  const actualDate = new Date();

  const handleClose = () => {
    setShow(false);
    setHours('');
  }

  const handleShow = () => {
    setShow(true);
  }

<<<<<<< HEAD
  const handleSave = async () => {
    const dateToGetInto = dateToString(date);
    if (validate(hours) === false){
=======
  const handleSave = () => {
    const actualDate = dateToString();
    if (validate(hours) === false) {
>>>>>>> 79f4583105648eb5658a35e3c728f4bdaae00e9b
      let string = '';
      string = JSON.stringify({
        Email: userEmail,
        Proyecto: project,
        Fecha: dateToGetInto,
        CantidadHoras: hours
      });
      post(string);
      handleClose();
    }
    handleClose();
  }

  useEffect(() => {
    const dateToSend = dateToString(actualDate);
    let results = getLastDate(employeeID, project, dateToSend);
    if(results.length === 0){
      results = getFirstDate(employeeID, project);
      // setDateMin(new Date (results[0].FechaInicio))
    }
  },[dateMin]);

  return (
    <div className='calendar-page'>
      <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          value={date}
          onChange={setDate}
          onClickDay={handleShow}
          minDetail='year'
          maxDate={new Date()}
          minDate={dateMin}
          next2Label={null}
          prev2Label={null}
<<<<<<< HEAD
          locale={'en'}
=======

>>>>>>> 79f4583105648eb5658a35e3c728f4bdaae00e9b
        />
      </div>
      {date &&
        <p className='text-center'>
          <span className='bold'>Selected date:</span>{' '}
          {date.toDateString()}
        </p>
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Hours for {date.toDateString()} :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                id='calendar_hours'
                type='text'
                value={hours}
                onChange={(e) => { setHours(e.target.value); }}
                placeholder='Hours'
                autoFocus
              />
              <div>
                <label className='calendar-error' id='calendar_error_name'></label>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleSave}>
            Save
          </Button>
          <Button variant='danger' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}