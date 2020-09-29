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
      <Header />
      <Navigation />
      <SideBar />
      <div className='MainPage__CalendarContainer' style={{ gridArea: 'calendar' }}>
        <Calendar />
      </div>
    </div>
  )
}

export default MainPage