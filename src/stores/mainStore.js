import { action, observable } from 'mobx'
import {
    normalString
} from 'utils'

// Data structure
const data = {
    selectedMonth: 8,
    selectedYear: 2020,
    reminders: {
        2020: {
            8: {
                17: [
                    {
                        city: 'San Francisco',
                        color: 'yellow',
                        id: 'uyvxhwbxjwbxuvjb',
                        text: 'Ohana means family.',
                        time: '6:30 PM',
                        dateString: '2020-09-27T16:30',
                        // dateString: '9/17/2020, 6:30:00 PM',
                    },
                ]
            },
        }
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
        const time = date.toLocaleTimeString()

        const reminders = this.data.reminders
        if (!reminders[year]) reminders[year] = {}
        if (!reminders[year][month]) reminders[year][month] = {}
        if (!reminders[year][month][day]) reminders[year][month][day] = []
        
        const dayArray = reminders[year][month][day]
        dayArray.push({
            ...reminderTemplate,
            ...data,
            dateString,
            year,
            month,
            day,
            time,
            id,
            newDateTime: null
        })

        return dayArray[dayArray.length - 1]
    },
    deleteReminder (year, month, day, id) {
        const monthArray = this.data.reminders[year][month]
        monthArray[day] = monthArray[day].filter(reminder => reminder.id !== id)
    },
}, {
    addReminder: action.bound,
    deleteReminder: action.bound,
})

window.g = {
    mainStore: store
}

export default store