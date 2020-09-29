import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  colorAliasToCSSVar,
  colorPalette,
  getTime,
  normalString
} from 'utils'
import { mainStore, weatherStore } from 'stores'
import './DialogReminder.css'

const DialogReminder = observer(props => {
  const { closeCallback, editTime, year, month, day, id } = props

  const reminder = mainStore.data.reminders[year][month][day]
    .find(x => x.id === id)

  const time = getTime(new Date(reminder.dateString))
  const weatherTime = weatherStore.formatTime(year, month, day, time.match(/(\d+):/)[1])
  const weatherLabel = weatherStore.data?.[reminder.city]?.[weatherTime]

  return (
    <section
      className='DialogReminder'
      style={{ 
        backgroundColor: colorAliasToCSSVar(reminder.color) || 'white'
      }}
    >
      <div className='DialogReminder__Form'>

        <DateTime reminder={reminder} editTime={editTime} />        

        <label className='DialogReminder__Message'>
          <div className='__Label'>
            Message
          </div>
          <textarea
            className='__Input'
            maxLength='30'
            value={reminder.text}
            onChange={ev => {
              reminder.text = ev.target.value
            }}
          />
          <div className='DialogReminder__Letter-Count'>{reminder.text.length}/30 characters used</div>
        </label>

        <label className='DialogReminder__City'>
          <div className='__Label'>City</div>
          <input
            className='__Input'
            type='text'
            value={reminder.city}
            onChange={ev => {
              reminder.city = ev.target.value
            }}
          />
        </label>

        { weatherLabel
            ? <>
              <div className='DialogReminder_Weather'>Weather: {weatherLabel}</div>
              <div className='DialogReminder_Weather-Subheading'>
                (weather data from <a href='https://https://openweathermap.org'>OpenWeather</a>)
              </div>
            </>
            : null
        }

        <div className='DialogReminder_Color-Picker-Label __Label'>Color</div>
        <ColorPicker reminder={reminder} />
      </div>

      <footer>
        <DialogCloseButton onClose={closeCallback} />
        <button
          className='DialogReminder__Delete-Button link-button'
          onClick={() => mainStore.deleteReminder(year, month, day, id)}
        >delete</button>
      </footer>
    </section>
  )
})

const DateTime = observer(props => {
  const { editTime, reminder } = props

  const dateFromString = new Date(reminder.dateString)

  const year = dateFromString.getFullYear() || reminder.year
  const month = dateFromString.getMonth() || reminder.month
  const day = dateFromString.getDate() || reminder.day

  const [isEditingTime, setIsEditingTime] = useState(editTime)

  const date = new Date(year, month, day)

  const weekDayStr = date.toLocaleDateString('en-us', { weekday: 'long' })
  const dateStr = date.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })

  const dateValue = normalString(reminder.newDateTime || reminder.dateString)

  return isEditingTime
    ? (
      <>
        <div className='__Label'>
          Date and Time
        </div>
        <input
          className='DialogReminder__Time-Edit'
          type='datetime-local'
          value={dateValue}
          onChange={ev => {
            reminder.newDateTime=ev.target.value
          }}
        />
      </>
    )
    : (
      <>
        <div className='DialogReminder__WeekDay'>{weekDayStr}</div>
        <div className='DialogReminder__Date'>{dateStr}</div>
        <div className='DialogReminder__Time'>{getTime(new Date(reminder.dateString))}</div>
        <button
          className='DialogReminder__Date-Button link-button'
          onClick={() => setIsEditingTime(true)}
        >
          change date
        </button>
      </>
    )
})

const ColorPicker = observer(props => {
  const { reminder } = props

  return (
    <div className='DialogReminder__ColorPicker'>
      { Object.keys(colorPalette).map((cur, idx) =>
        <ColorButton
          key={cur}
          label={cur}
          reminder={reminder}
        />
      )}
    </div>
  )
})

const ColorButton = observer(props => {
  const { label, reminder } = props
  const isSelected = label === reminder.color

  return (
    <button
      className={`DialogReminder__Color-Button ${isSelected ? '--selected' : ''}`}
      style={{
        backgroundColor: colorPalette[label]
      }}
      onClick={ev => {
        reminder.color = label
      }}
    >
      {label}
    </button>
  )
})

const DialogCloseButton = props => {
  const { onClose } = props
  return (
    <button
      className='DialogCloseButton'
      onClick={onClose}
    >
      Close
    </button>
  )
}

export default DialogReminder