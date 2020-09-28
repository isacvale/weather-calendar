import React from 'react'
import {
    Calendar,
    Header,
    Navigation,
    SideBar,
} from 'components'
import './MainPage.css'

const MainPage = props => {
    return (
        <div className='MainPage'>
            <div style={{ gridArea: 'header' }}>
                <Header />
            </div>
            <div style={{ gridArea: 'nav' }}>
                <Navigation />
            </div>
            <div style={{ gridArea: 'bar' }}>
                <SideBar />
            </div>
            <div className='MainPage__CalendarContainer' style={{ gridArea: 'calendar' }}>
                <Calendar />
            </div>
        </div>
    )
}

export default MainPage