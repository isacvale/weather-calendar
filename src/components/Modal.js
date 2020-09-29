import React from 'react'
import './Modal.css'

const Modal = props => {

    const { children, closeCallback, isOpen } = props

    if (!isOpen) return null

    const closeIfClickedOnBackground = (ev) => {
        if (ev.target.classList.contains('Modal'))
            closeCallback && closeCallback()
    }

    return (
        <div
            className='Modal'
            onClick={closeIfClickedOnBackground}
        >
            {/* {children} */}
            {React.cloneElement(children, { closeCallback })}
        </div>
    )
}

export default Modal