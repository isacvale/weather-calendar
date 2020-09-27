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
                        text: 'Ohana means family.',
                        city: 'San Francisco',
                        time: '6:30 PM',
                        color: 'yellow'
                    },
                ]
            },
        }
    }
}

const reminderTemplate = {
    city: '',
    text: '',
    time: ''
}

// Store creation
const store = observable({
    data,
    testMethod () {
        console.log('this: ', this)
    },
}, {
    testMethod: action.bound
})

export default store