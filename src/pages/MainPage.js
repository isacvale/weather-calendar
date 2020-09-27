import React from 'react'
import {
    Calendar,
    CalendarDay
} from 'components'

const MainPage = props => {
    return (
        <div>
            <div>This is the main page.</div>
            <Calendar />
            <CalendarDay />
        </div>
    )
}

export default MainPage