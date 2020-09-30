import React from 'react'
import { observer } from 'mobx-react'
import {
  listDays,
} from 'utils'
import { mainStore } from 'stores'
import { CalendarDay } from 'components'
import './Calendar.css'

const Calendar = observer(props => {
  const today = new Date()
  const {
    year = mainStore.data.selectedYear || today.getFullYear()
  } = props

  const month = (!mainStore.data.selectedMonth && mainStore.data.selectedMonth !== 0)
    ? today.getMonth()
    : mainStore.data.selectedMonth

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
})

const CalendarHeader = props => {
  const daysOfTheWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]

  return (
    <>
      { daysOfTheWeek.map(day =>
        <div key={day} className={`CalendarHeader__WeekDayLabel ommitable`}>{day}</div>
      )}
    </>
  )
}

export default Calendar