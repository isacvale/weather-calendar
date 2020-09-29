import React, { useState } from 'react'
import './ConfirmDelete.css'

const ConfirmDelete = props => {
  const { mainLabel } = props

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className='ConfirmDelete'
    >
      <button
        className='ConfirmDelete__Button ConfirmDelete__Main-Button --danger link-button'
        onClick={() => setIsOpen(true)}
      >{mainLabel}</button>

      <ConfirmDeletePanel
        config={{...props}}
        isOpen={isOpen}
        onClosePanel={() => setIsOpen(false)}
      />
    </div>
  )
}

const ConfirmDeletePanel = props => {
  const { config, isOpen, onClosePanel } = props
  const { onClick, cancelLabel, confirmLabel, message } = config

  return (
    <div className={`ConfirmDelete__Panel ${isOpen ? '--open' : ''}`}>
      { isOpen
        ? <div>
            <div className='ConfirmDelete__Message --danger'>{message}</div>
            <div className='ConfirmDelete__Button-Wrapper'>
              <button
                className='ConfirmDelete__Button --danger link-button'
                onClick={onClick}
              >{confirmLabel}</button>
      
              <button
                className='ConfirmDelete__Button link-button'
                onClick={onClosePanel}
              >{cancelLabel}</button>
            </div>
          </div>
        : null
      }
    </div>
  )
}

export default ConfirmDelete