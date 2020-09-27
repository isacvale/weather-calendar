import React from 'react'
import { observer } from 'mobx-react'
import { mainStore } from 'stores'
import { CalendarReminder } from 'components'
import './CalendarDay.css'

const CalendarDay = observer(props => {
  const { day = 1, month = 0, year = 2020 } = props
  const { reminders } = mainStore.data
  const data = reminders[year]?.[month]?.[day] || []

  console.log('111',reminders )
  console.log('222',reminders[year] )
  console.log('333',reminders[year]?.[month] )
  console.log('444',reminders[year]?.[month]?.[day] )

  return (
    <section
      className='CalendarDay'
    >
      <header>{day}</header>
      { data.map((cur, idx) =>
          <CalendarReminder
            key={cur.id}
            day={day}
            month={month}
            year={year}
            id={cur.id}
            city={cur.city}
            text={cur.text}
            time={cur.time}
            color={cur.color}
          />
        )
      }
    </section>
  )
})

export default CalendarDay