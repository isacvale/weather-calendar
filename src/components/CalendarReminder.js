import React from 'react'
import './CalendarReminder.css'

const CalendarReminder = props => {
  const { city, color, day, month, text, time, year } = props

  const cssColor = {
    pink: 'var(--light-pink)',
    champagne: 'var(--deep-champagne)',
    yellow: 'var(--lemon-yellow-crayola)',
    green: 'var(--tea-green)',
    celeste: 'var(--celeste)',
    blue: 'var(--baby-blue-eyes)',
    purple: 'var(--maximum-blue-purple)',
    mauve: 'var(--mauve)'
  }['color'] || 'white'

  return (
    <section
      className={`CalendarReminder`}
      style={{
        backgroundColor: cssColor
      }}
    >
      <header
        className='CalendarReminder__Time'
      >{time}</header>
      <div
        className='CalendarReminder__Text'
      >{text}</div>
      <footer
        className='CalendarReminder__City'
      >{city}</footer>
    </section>
  )
}

export default CalendarReminder