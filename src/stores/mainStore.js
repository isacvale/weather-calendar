import { action, observable } from 'mobx'
import {
  colorPalette,
  getRandomItem,
  normalString,
} from 'utils'

// Data structure
const data = {
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  reminders: {
    // 2020: {
    //   9: {
    //     2: [
    //       {
    //         city: 'Vancouver',
    //         color: 'yellow',
    //         id: 'Ohana',
    //         text: 'Ohana means family.',
    //         time: '6:30 PM',
    //         dateString: '2020-10-02T16:30',
    //       },
    //     ]
    //   },
    // }
  }
}

const reminderTemplate = {
  city: '',
  color: 'white',
  key: '',
  text: '',
  time: '9:00 AM',
  newDateTime: null,
  dateString: ''
}

// Store creation
const store = observable({
  data,

  clearReminders () {
    this.data.reminders = {}
  },

  sortReminders (year, month, day) {
    const monthArr = this.data.reminders[year][month]
    monthArr[day] = monthArr[day].slice().sort((a, b) => {
      const dateA = new Date(a.dateString)
      const dateB = new Date(b.dateString)

      return dateA > dateB ? 1 : -1
    })
  },

  addReminder (data = {}) {
    const {
      dateString = normalString(new Date()),
      id = Math.random(),
      color = 'white',
      city = '',
      text = ''
    } = data

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const time = date.toLocaleTimeString('en-us')

    const reminders = this.data.reminders
    if (!reminders[year]) reminders[year] = {}
    if (!reminders[year][month]) reminders[year][month] = {}
    if (!reminders[year][month][day]) reminders[year][month][day] = []
    
    const dayArray = reminders[year][month][day]
    dayArray.push({
      ...reminderTemplate,
      ...data,
      color,
      city,
      text,
      dateString,
      year,
      month,
      day,
      time,
      id,
      newDateTime: null
    })

    const newItem = dayArray[dayArray.length - 1]

    this.sortReminders(year, month, day)

    return newItem
  },

  addRandomReminder () {
    const today = new Date()
    const randomDay = Math.random() * 28
    const month = this.data.selectedMonth || today.getMonth()
    const year = this.data.selectedYear || today.getFullYear()
    const randomHour = Math.random() * 24
    const randomMinutes = Math.random() * 60

    const randomWords = ['', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod']
    const getRandomText = () => {
      const words = []
      for (let i = 0; i < 5; i++) {
        words.push(getRandomItem(randomWords))
      }
      return words
        .join(' ')
        .slice(0, Math.random() * 15 + 15)
    }

    this.addReminder({
      dateString: normalString(new Date(year, month, randomDay, randomHour, randomMinutes)),
      color: getRandomItem(Object.keys(colorPalette)),
      city: getRandomItem(['Vancouver', 'Edinburgh', 'Houston', 'Paris', 'Dublin', 'Rio de Janeiro', 'Lagos', 'Canberra', 'Kyoto']),
      text: getRandomText()
    })
  },

  deleteReminder (year, month, day, id) {
    const monthArray = this.data.reminders[year][month]
    monthArray[day] = monthArray[day].filter(reminder => reminder.id !== id)
  },

  clearDay (year, month, day) {
    this.data.reminders[year][month][day] = []
  },

  minusMonth () {
    const month = this.data.selectedMonth - 1
    if (month < 0) {
      this.data.selectedMonth = 11
      this.data.selectedYear -= 1
    } else {
      this.data.selectedMonth = month
    }
  },
  plusMonth () {
    const month = this.data.selectedMonth + 1
    if (month > 11) {
      this.data.selectedMonth = 0
      this.data.selectedYear += 1
    } else {
      this.data.selectedMonth = month
    }
  },
  minusYear () {
    this.data.selectedYear -= 1
  },
  plusYear () {
    this.data.selectedYear += 1
  }
}, {
  addRandomReminder: action.bound,
  addReminder: action.bound,
  clearDay: action.bound,
  clearReminders: action.bound,
  deleteReminder: action.bound,
  minusMonth: action.bound,
  minusYear: action.bound,
  plusMonth: action.bound,
  plusYear: action.bound,
  sortReminders: action.bound,
})

window.g = {
  mainStore: store
}

export default store