import { action, observable } from 'mobx'

// Data structure
const data = {
    selectedMonth: 8,
    selectedYear: 2020,
    reminders: {
        2020: {
            0: {
                1: ['mom', 'dad', 'gradma']
            },
            8: {
                10: 'mmm'
            }
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