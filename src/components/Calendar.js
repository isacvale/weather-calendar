import React from 'react'
import { observer } from 'mobx-react'
import {
  daysInMonth,
  extendDaysList,
  listDays,
  range
} from 'utils'
import { CalendarDay } from 'components'
import './Calendar.css'

const Calendar = props => {
  const today = new Date()
  const { month = today.getMonth(), year = today.getFullYear()} = props

  const listOfDays = listDays(month, year, true)

  return (
    <section
      className='Calendar'
    >
      <div className='Calendar__daysContainer'>
        <CalendarHeader />
        { listOfDays.map((cur, idx) => {
            const { day, month, year, weekDay } = cur
            return (
              <CalendarDay
                key={idx}
                day={day}
                month={month}
                year={year}
                weekDay={weekDay}
              />
            )
          })
        }
      </div>
    </section>
  )
}

const CalendarHeader = props => {
  const daysOfTheWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]
  return(
    // <div className='CalendarHeader'>
    <>
      { daysOfTheWeek.map(day =>
        <div key={day} className='CalendarHeader__Label'>{day}</div>
      )}
    </>
    // </div>
  )
}

export default Calendar