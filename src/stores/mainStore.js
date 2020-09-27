import { action, observable } from 'mobx'

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
    newDateTime: null
}

// Store creation
const store = observable({
    data,
    addReminder (year, month, day, id, data) {
        console.log('run add reminder', year, month, day, id)
        const reminders = this.data.reminders
        if (!reminders[year]) reminders[year] = []
        if (!reminders[year][month]) reminders[year][month] = []
        if (!reminders[year][month][day]) reminders[year][month][day] = []
        reminders[year][month][day].push({
            ...reminderTemplate,
            ...data,
            newDateTime: null
        })
    },
    deleteReminder (year, month, day, id) {
        console.log('run delete reminder', year, month, day, id)
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