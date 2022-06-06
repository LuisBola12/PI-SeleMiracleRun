import { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.scss';
import React from 'react';

const CalendarComp = () => {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState('');

  const reset = () =>{
    date[1] = null;    
  }

  const prueba22 = async (info) =>{
  }

  const prueba = async () => {

  }

  return (
    <div className='app'>
      <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          id = "Calendar"
          onChange={setDate}
          value={date}
          selectRange={true}
          minDetail='year'
          next2Label={null}
          prev2Label={null}
          // onClickDay={prueba}
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
                <span className='bold'>Default selected date:</span>{' '}
                {date.toDateString()}
              </p>
            )
      }
      <div className='calendar-btn-box'>
        <div>
          <input type='date'/>
        </div>
        <button className='calendar-sumbit-btn' onClick={reset}>Reset</button>
        <button className='calendar-sumbit-btn' onClick={prueba22}>Sumbit</button>
        <button className='calendar-sumbit-btn' onClick={reset}>Cancel</button>
      </div>
    </div>
  );
}

export default CalendarComp;
