import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.scss';
import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import useForm from '../../shared/hooks/useForm';
import validate from './calendarValidations';

export const CalendarComp = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const dateMin = null;
  const sendToDatabase = () =>{
    setIsSubmitting(false);
  }

  const { formValues, handleInputChange, handleSubmit, setIsSubmitting, errors, setErrors } = useForm(sendToDatabase, validate);

  const handleClose = () => {
    setErrors({});
    setShow(false);
  }
  
  const handleShow = () => {
    setShow(true);
  }

  const handleSave = async () => {
    handleSubmit();
    let error = JSON.stringify(errors);
    if(error === '{}' ){
      setShow(false);
    }
  }

  return (
    <div className='calendar-page'>
      <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          value = {date}
          onChange = {setDate}
          onClickDay={handleShow}
          minDetail='year'
          maxDate={new Date()}
          minDate={dateMin}
          next2Label={null}
          prev2Label={null}
        
        />
      </div>
      { date && 
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
                id = 'calendar_hours'
                type = 'text'
                value = {formValues.hours}
                onChange = {handleInputChange}
                placeholder='Hours'
                autoFocus
              />
              <div>
                <label className='calendar-error' id='calendar_error_name'>{errors.calendar_hours}</label>
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