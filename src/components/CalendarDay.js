import React from 'react'
import { mainStore } from 'stores'

const CalendarDay = props => {
  const { day = 1, month = 0, year = 2020, store = mainStore } = props
  const { reminders } = store.data
  const data = reminders[year]?.[month]?.[day] || []
    
  return (
    <div>
      day: {year}/{month}/{day} - {data.map(x => ` ${x} `)}
    </div>
  )
}

export default CalendarDay