import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.scss';
import React from 'react';
import { useNavigate } from "react-router-dom";
import {Modal, Button, Form} from 'react-bootstrap';

const CalendarComp = () => {
  const [date, setDate] = useState(new Date());
  const dateMin = null
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }
  
  const handleShow = () => {
    setShow(true);
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
      {
      date.length > 0 ? 
        (
          <p className='text-center'>
            <span className='bold'>Start:</span>{' '}
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()}
          </p>
        ) : (
              <p className='text-center'>
                <span className='bold'>Selected date:</span>{' '}
                {date.toDateString()}
              </p>
            )
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Hours for {date.toDateString()} :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Hours"
                autoFocus
              />
            </Form.Group>
          </Form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CalendarComp;
