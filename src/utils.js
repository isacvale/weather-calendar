// Derived from
// https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = (month = (new Date().getMonth()), year = (new Date().getFullYear())) =>
  new Date(year, month + 1, 0).getDate()


const getWeekDay = (year, month, day) => new Date(year, month, day).getDay()

const listDays = (
    month = (new Date().getMonth()),
    year = (new Date().getFullYear()),
    extend = false
  ) => {
  const daysList = range(daysInMonth(month, year))
    .map(day => ({ day, month, year, weekDay: getWeekDay(year, month, day) }))
  return extend
    ? extendDaysList(daysList)
    : daysList
}

const extendDaysList = dayList => {
  const firstDay = dayList[0]
  if (firstDay.weekDay > 0) {
    const firstDayObj = new Date(firstDay.year, firstDay.month, firstDay.day)
    const dayBefore = new Date(firstDayObj.getTime())
    dayBefore.setDate(firstDayObj.getDate() - 1)

    return extendDaysList([
      {
        year: dayBefore.getFullYear(),
        month: dayBefore.getMonth(),
        day: dayBefore.getDate(),
        weekDay: dayBefore.getDay()
      },
      ...dayList
    ])
  }

  const lastDay = dayList[dayList.length - 1]
  if (lastDay.weekDay < 6) {
    const lastDayObj = new Date(lastDay.year, lastDay.month, lastDay.day)
    const dayAfter = new Date(lastDayObj.getTime())
    dayAfter.setDate(lastDayObj.getDate() + 1)

    return extendDaysList([
      ...dayList,
      {
        year: dayAfter.getFullYear(),
        month: dayAfter.getMonth(),
        day: dayAfter.getDate(),
        weekDay: dayAfter.getDay()
      }
    ])
  }

  return dayList
}

const range = num =>
  [...Array(num).keys()]
  .map(x => x + 1)

const colorPalette = {
    white: 'white',
    pink: 'var(--light-pink)',
    champagne: 'var(--deep-champagne)',
    yellow: 'var(--lemon-yellow-crayola)',
    green: 'var(--tea-green)',
    celeste: 'var(--celeste)',
    blue: 'var(--baby-blue-eyes)',
    purple: 'var(--maximum-blue-purple)',
    mauve: 'var(--mauve)'
  }

const colorAliasToCSSVar = alias =>
  colorPalette[alias]

export {
  colorAliasToCSSVar,
  colorPalette,
  daysInMonth,
  extendDaysList,
  getWeekDay,
  listDays,
  range
}