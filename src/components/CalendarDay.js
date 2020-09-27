import React from 'react'
import { mainStore } from 'stores'
import { CalendarReminder } from 'components'
import './CalendarDay.css'

const CalendarDay = props => {
  const { day = 1, month = 0, year = 2020, store = mainStore } = props
  const { reminders } = store.data
  const data = reminders[year]?.[month]?.[day] || []

  return (
    <section
      className='CalendarDay'
    >
      <header>{day}</header>
      { data.map((cur, idx) =>
          <CalendarReminder
            key={idx}
            day={day}
            month={month}
            year={year}
            city={cur.city}
            text={cur.text}
            time={cur.time}
          />
        )
      }
    </section>
  )
}

export default CalendarDay