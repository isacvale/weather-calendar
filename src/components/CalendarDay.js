import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  CalendarReminder,
  ConfirmDelete,
  DialogReminder,
  Modal
} from 'components'
import {
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

  const { reminders } = mainStore.data
  const data = reminders[year]?.[month]?.[day] || []

  const isWeekEnd = weekDay === 0 || weekDay === 6


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

  return (
    <section
      className={`CalendarDay ${isWeekEnd ? '--weekEnd' : ''}`}
      onClick={ev => {
        if (ev.target.classList.contains('CalendarDay')) {
          createNewReminder()
        }
      }}
    >
      <header
        onClick={createNewReminder}
      >
        <div className='CalendarDay_Number'>{day}</div>
      </header>
      
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