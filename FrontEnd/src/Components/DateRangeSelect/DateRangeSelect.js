import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import '../../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const DateRangeSelect = ({ range, setRange }) => {


  const [open, setOpen] = useState(false)

  const refOne = useRef(null)

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  return (
    <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="project-date-filter"
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open &&
          <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
            maxDate={new Date()}
          />
        }
      </div>

    </div>
  )
}
