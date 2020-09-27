import React from 'react'
import {
    Calendar,
    CalendarDay
} from 'components'
import './MainPage.css'

const MainPage = props => {
    return (
        <div className='MainPage'>
            <div style={{ gridArea: 'header' }}>Weather Calendar</div>
            <div style={{ gridArea: 'nav' }}>Nav</div>
            <div style={{ gridArea: 'bar' }}>Bar</div>
            <div className='MainPage__CalendarContainer' style={{ gridArea: 'calendar' }}>
                <Calendar />
            </div>
        </div>
    )
}

export default MainPage