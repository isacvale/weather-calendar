import { action, observable } from 'mobx'

const endpoint = 'https://calendarific.com/api/v2/holidays'

const getKey = () => [["0",3],["0",5],["1",4],["1",16],["2",2],["2",23],["2",37],["3",12],["3",13],["3",38],["4",0],["4",11],["4",15],["5",26],["6",14],["6",17],["6",19],["6",28],["6",34],["6",35],["6",39],["7",18],["7",24],["9",1],["9",21],["a",7],["a",29],["b",25],["b",27],["b",31],["c",8],["c",10],["d",22],["e",6],["e",30],["e",32],["e",33],["f",9],["f",20],["f",36]]
  .sort((a,b) => a[1] - b[1])
  .map(x => x[0])
  .join('')


const store = observable({
  data: {
    viewHolidays: true,
    requested: []
  },
  toggleVieHolidays () {
    this.data.viewHolidays = !this.data.viewHolidays
  },
  async getHolidays (year = 2020) {
    if (this.data.requested.includes(year))return

    this.data.requested.push(year)

    const res = await fetch(`${endpoint}?&api_key=${getKey()}&country='US'&year=${year}`)
    const resJSON = await res.json()
    const holidays = resJSON.response.holidays
      .filter(holiday =>
        holiday.type.includes('National holiday')
      )
      .map(holiday => ({
        year: holiday.date.datetime.year, month: holiday.date.datetime.month -1, day: holiday.date.datetime.day,
        name: holiday.name
      }))
      .reduce((acc, cur) => {
        if (!acc[cur.month]) acc[cur.month] = []
        acc[cur.month].push(cur)
        return acc
      }, {})
    this.data[year] = holidays
  }
}, {
  getHolidays: action.bound
})

window.holidayStore = store

export default store