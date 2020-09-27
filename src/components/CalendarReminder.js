import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  DialogReminder,
  Modal,
} from 'components'
import {
  colorAliasToCSSVar,
  colorPalette,
} from 'utils'
import './CalendarReminder.css'
import { mainStore } from 'stores/index'

const CalendarReminder = observer(props => {

  const { city, color, day, id, month, text, time, year } = props
  const [isOpen, setIsOpen] = useState(false)

  const reminder = mainStore.data.reminders[year][month][day]
    .find(x => x.id === id)
  const cssColor = colorAliasToCSSVar(color) || 'white'
  const toggleIsOpen = () => setIsOpen(!isOpen)

  const closeDialog = () => {
    const newDate = reminder.newDateTime
    if (newDate) {
      mainStore.addReminder(newDate.getFullYear(),newDate.getMonth(), newDate.getDate(), id, reminder)
      mainStore.deleteReminder(year, month, day, id)
    }
    setIsOpen(!isOpen)
  }

  return (
    <section
      className={`CalendarReminder`}
      style={{
        backgroundColor: cssColor
      }}
    >
      <header>
        <div className='CalendarReminder__Time'>{time}</div>
        <button
          className='CalendarReminder__Edit-Button link-button'
          onClick={toggleIsOpen}
        >edit</button>
      </header>
      <div
        className='CalendarReminder__Text'
      >{text}</div>
      <footer
        className='CalendarReminder__City'
      >{city}</footer>
      <Modal
        closeCallback={closeDialog}
        isOpen={isOpen}
      >
        <DialogReminder
          id={id}
          year={year}
          month={month}
          day={day}
        />
      </Modal>
    </section>
  )
})

export default CalendarReminder