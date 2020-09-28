import React from 'react'
import { observer } from 'mobx-react'
import { mainStore } from 'stores'
import { CalendarReminder } from 'components'
import { weatherStore } from 'stores'
import './CalendarDay.css'

const CalendarDay = observer(props => {
  const { day = 1, month = 0, year = 2020 } = props
  const { reminders } = mainStore.data
  const data = reminders[year]?.[month]?.[day] || []

  return (
    <section
      className='CalendarDay'
    >
      <header>{day}</header>
      <div className='CalendarDay__NotesContainer'>
        { data.map((cur, idx) => {
            weatherStore.fetchWeather(cur.city)
            return (
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
          })
        }
      </div>
      { data.length
        ? <button
          className='CalendarDay_Clear-Button link-button'
          onClick={() => mainStore.clearDay(year, month, day)}
        >clear</button>
        : null
      }
    </section>
  )
})

export default CalendarDay