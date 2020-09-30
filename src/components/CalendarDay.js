import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  CalendarReminder,
  ConfirmDelete,
  DialogReminder,
  Modal
} from 'components'
import {
  holidayStore,
  mainStore,
  weatherStore
} from 'stores'
import {
  closeRemindDialog,
  normalString,
} from 'utils'
import './CalendarDay.css'

const CalendarDay = observer(props => {
  const { day = 1, month = 0, weekDay, year = 2020 } = props

  holidayStore.getHolidays(year)

  const dayHolidays = holidayStore.data.viewHolidays
    ? (holidayStore.data?.[year]?.[month] || [])
      .filter(holiday => holiday.day === day)
    : []

  // const monthHolidays = holidayStore.data?.[year]?.[month] || []
  // const dayHolidays = monthHolidays
  //   .filter(holiday => holiday.day === day)

  const { reminders } = mainStore.data
  const data = reminders[year]?.[month]?.[day] || []

  const isWeekEnd = weekDay === 0 || weekDay === 6

  const dateObj = new Date(year, month, day)
  const dayLetter = dateObj.toLocaleDateString('en-us', { weekday: 'long' })

  // New Reminders
  const [isNewReminderOpen, setIsNewReminderOpen] = useState(false)
  const [newReminder, setNewReminder] = useState({})
  const {
    year: newYear,
    month: newMonth,
    day: newDay,
    id: newId
  } = newReminder

  const createNewReminder = () => {
    setNewReminder(mainStore.addReminder({
      dateString: normalString(new Date(year, month, day, 9, 0))
    }))
    setIsNewReminderOpen(true)
  }

  const closeNewDialog = () => {
    closeRemindDialog(newReminder)
    setIsNewReminderOpen(!isNewReminderOpen)
  }

  let sectionClasses = 'CalendarDay'
  if (isWeekEnd) sectionClasses += ' --weekEnd'
  if (month !== mainStore.data.selectedMonth) sectionClasses += ' ommitable'

  return (
    <section
      className={sectionClasses}
      onClick={ev => {
        if (ev.target.classList.contains('CalendarDay')) {
          createNewReminder()
        }
      }}
    >
      <header
        onClick={createNewReminder}
      >
        <span className='CalendarDay_Number'>
          {day}
        </span>
        <span className='CalendarDay_DayLetter'>
          {dayLetter}
        </span>
      </header>

      <div
        style={{ pointerEvents: 'none' }}
      >{ dayHolidays.length
        ? dayHolidays.map((cur, idx) =>
          <div
            key={idx}
            className={'CalendarDay__Holiday'}
          >{cur.name}</div>
        )
        : null
      }</div>
      
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
        ? <ConfirmDelete
          onClick={() => mainStore.clearDay(year, month, day)}
          cancelLabel='cancel'
          confirmLabel='clear'
          mainLabel='clear'
          message="Clear all day?"
        />
        : null
      }

      { newReminder
        ? <Modal
          closeCallback={closeNewDialog}
          isOpen={isNewReminderOpen}
        >
          <DialogReminder
            id={newId}
            year={newYear}
            month={newMonth}
            day={newDay}
            // editTime={true}
          />
        </Modal>
        : null
      }
    </section>
  )
})

export default CalendarDay