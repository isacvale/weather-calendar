import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  colorAliasToCSSVar,
  colorPalette,
} from 'utils'
import { mainStore } from 'stores'
import './DialogReminder.css'

const DialogReminder = observer(props => {
  const { closeCallback, year, month, day, id } = props


  const reminder = mainStore.data.reminders[year][month][day]
    .find(x => x.id === id)

  return (
    <section
      className='DialogReminder'
      style={{ 
        backgroundColor: colorAliasToCSSVar(reminder.color) || 'white'
      }}
    >
      <div className='DialogReminder__Form'>

        <DateTime reminder={reminder} />

        {/* <div className='DialogReminder__WeekDay'>{weekDayStr}</div>
        <div className='DialogReminder__Date'>{dateStr}</div>
        <div className='DialogReminder__Time'>3:00 PM</div>
        { isEditingTime
          ? <input
              className='DialogReminder__Time-Edit'
              type='datetime-local'
            />
          : <button
              className='DialogReminder__Date-Button link-button'
              onClick={() => setIsEditingTime(true)}
            >
              change date
            </button>
        } */}
        

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
          <div className='DialogReminder__Letter-Count'>12/30 characters used</div>
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

        <div className='DialogReminder_Weather'>Weather: Rainy</div>
        <div className='DialogReminder_Weather-Subheading'>(weather data from <a>OpenWeather</a>)</div>

        <div className='DialogReminder_Color-Picker-Label __Label'>Color</div>
        <ColorPicker reminder={reminder} />
      </div>

      <footer>
        <DialogCloseButton onClose={closeCallback} />
        <button
          className='link-button'
          style={{ color: 'red' }}
          // onClick={}
        >Or delete this message</button>
      </footer>
    </section>
  )
})

const DateTime = observer(props => {
  const { reminder } = props
  const { year, month, day } = reminder

  const [isEditingTime, setIsEditingTime] = useState(false)

  const date = new Date(year, month, day)

  const weekDayStr = date.toLocaleDateString('en-us', { weekday: 'long' })
  const dateStr = date.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })

  return isEditingTime
    ? (
      <>
        <div className='__Label'>
          Date and Time
        </div>
        <input
          className='DialogReminder__Time-Edit'
          type='datetime-local'
          onChange={ev => {
            const date = new Date(ev.target.value)
            reminder.newDateTime=date
          }}
        />
      </>
    )
    : (
      <>
        <div className='DialogReminder__WeekDay'>{weekDayStr}</div>
        <div className='DialogReminder__Date'>{dateStr}</div>
        <div className='DialogReminder__Time'>3:00 PM</div>
        <button
          className='DialogReminder__Date-Button link-button'
          onClick={() => setIsEditingTime(true)}
        >
          change date
        </button>
      </>
    )
  // return (
  //   <div>
      
  //     { isEditingTime
  //       ? 
  //       : <button
  //           className='DialogReminder__Date-Button link-button'
  //           onClick={() => setIsEditingTime(true)}
  //         >
  //           change date
  //         </button>
  //     }
  //   </div>
  // )
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