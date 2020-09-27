import React from 'react'
import {
  daysInMonth,
  extendDaysList,
  listDays,
  range
} from 'utils'

const Calendar = props => {
  const today = new Date()
  const { month = today.getMonth(), year = today.getFullYear()} = props

  // console.log('listDays', listDays(month, year, true))
  // console.log('XDlistDays', extendDaysList(listDays(month, year)))

  return (
    <div>calendar, yo {month}/{year}</div>
  )
}

export default Calendar