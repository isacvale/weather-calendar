import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  DialogReminder,
  Modal,
} from 'components'
import {
  mainStore,
} from 'stores'
import {
  closeRemindDialog
} from 'utils'
import './SideBar.css'

const SideBar = observer(props => {
  const [isOpen, setIsOpen] = useState(false)
  const [reminder, setReminder] = useState({})

  const createNewReminder = () => {
    setReminder(mainStore.addReminder())
    setIsOpen(true)
  }
  
  const { year, month, day, id } = reminder

  const closeDialog = () => {
    closeRemindDialog(reminder)
    setIsOpen(!isOpen)
  }

  return (
    <aside className='SideBar'>
      <button
        className='SideBar__Add-Button big-button'
        onClick={createNewReminder}
      >
        Add reminder
      </button>

      <button
        className='SideBar__Random-Button link-button'
        onClick={mainStore.addRandomReminder}
      >
        Add random example
      </button>

      {/* <button
        onClick={() => weatherStore.fetchWeather('London')}
      >fetch weather</button>

      <button
        onClick={() => weatherStore.debouncedFetchWeather('London')}
      >debounced fetch weather</button> */}

      { reminder
        ? <Modal
          closeCallback={closeDialog}
          isOpen={isOpen}
        >
          <DialogReminder
            id={id}
            year={year}
            month={month}
            day={day}
            editTime={true}
          />
        </Modal>
        : null
      }
    </aside>
  )
})

export default SideBar