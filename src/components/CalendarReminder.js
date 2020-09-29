import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  DialogReminder,
  Modal,
} from 'components'
import {
  colorAliasToCSSVar,
  closeRemindDialog,
  getTime
} from 'utils'
import './CalendarReminder.css'
import {
  mainStore,
  weatherStore
} from 'stores/index'

const CalendarReminder = observer(props => {

  const { city, color, day, id, month, text, year } = props

  const [isOpen, setIsOpen] = useState(false)
  const reminder = mainStore.data.reminders[year][month][day]
    .find(x => x.id === id)

  const cssColor = colorAliasToCSSVar(color) || 'white'
  const toggleIsOpen = () => setIsOpen(!isOpen)

  const closeDialog = () => {
    closeRemindDialog(reminder)
    setIsOpen(!isOpen)
  }

  const time = getTime(new Date(reminder.dateString))
  const weatherTime = weatherStore.formatTime(year, month, day, time.match(/(\d+):/)[1])
  const weatherLabel = weatherStore.data?.[city]?.[weatherTime]

  return (
    <section
      className={`CalendarReminder`}
      style={{
        backgroundColor: cssColor
      }}
    >
      <header>
        <div className='CalendarReminder__Time'>
          {time}
        </div>
      </header>
      <div
        className='CalendarReminder__Text'
      >{text}</div>
      <footer
        className='CalendarReminder__City'
      >{city}</footer>

      { weatherLabel
        ? <div
          className='CalendarReminder__Weather'
        >
          weather: {weatherLabel}
        </div>
        : null
      }

      <button
        className='CalendarReminder__Edit-Button link-button'
        onClick={toggleIsOpen}
      >edit</button>

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