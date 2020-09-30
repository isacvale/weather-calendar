import { action, observable } from 'mobx'

const apiKey = 'd08180d2a59f111b7b31775a32a955ac'

// Data structure
const data = {}

// Template
// const data = {
//     London: {
//         '2020-09-29': 'Rainy'
//     }
// }

const debouncerFactory = delay => {
  let requestId = 0

  return (apiCall, callBack) => {
    const newId = Math.random()
    requestId = newId
    setTimeout(async () => {
      if (newId === requestId) {
        const res = await apiCall()
        callBack && callBack(res)
      }
    }, delay)
  }
}
const debouncer = debouncerFactory(600)

// Store creation
const store = observable({
  data,
  saveWeather (cityName, weather) {
    if (!this.data[cityName]) this.data[cityName] = {}
    this.data[cityName] = weather
  },
  async fetchWeather (cityName) {
    if (cityName && !this.data?.[cityName]) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          if (data.list) {
            const final = data.list
              .reduce((acc, cur) => {
                return ({
                  ...acc,
                  [cur.dt_txt]: cur.weather[0].main
                })
              }, {})
            this.data[cityName] = final
          }
        })
        .catch(err => console.log(err))
    }
  },
  async debouncedFetchWeather (city) {
    debouncer(() => this.fetchWeather(city))
  },
  formatTime (year, month, day, hours) {
    const correctedHour = hours - (hours % 3)
    const lead = num => ('00' + num).slice(-2)
    return `${year}-${lead(month + 1)}-${lead(day)} ${lead(correctedHour)}:00:00`
  }
}, {
  fetchWeather: action.bound,
  debouncedFetchWeather: action.bound,
  saveWeather: action.bound,
})

window.weatherStore = store

export default store