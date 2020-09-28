import React, { useState } from 'react'
import {
  DialogReminder,
  Modal,
} from 'components'
import { 
  normalString,
} from 'utils'
import {
  mainStore
} from 'stores'
import './SideBar.css'

const SideBar = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [reminder, setReminder] = useState({})

  const createNewReminder = () => {
    setReminder(mainStore.addReminder())
  }
  
  const { year, month, day, id } = reminder

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

      { reminder
        ? <Modal
          // closeCallback={closeDialog}
          isOpen={isOpen}
        >
          <DialogReminder
            id={id}
            year={year}
            month={month}
            day={day}
          />
        </Modal>
        : null
      }
    </aside>
  )
}

export default SideBar