import {
    mainStore
} from 'stores'

beforeEach(() => {
    mainStore.data.selectedMonth = 8
    mainStore.data.selectedYear = 2020
    mainStore.clearReminders()
})

test('Can add a simple reminder.', () => {
    mainStore.addReminder({
        id: 42,
        dateString: '2020-03-22T08:30',
        city: 'Vancouver',
        text: 'This is a random text.',
        color: 'mauve'
    })

    const reminderList = mainStore
        .data.reminders[2020][2][22]
    const reminder = reminderList[0]

    expect(reminderList.length).toBe(1)
    expect(reminder.city).toBe('Vancouver')
    expect(reminder.text).toBe('This is a random text.')
    expect(reminder.color).toBe('mauve')
    expect(reminder.id).toBe(42)
})

test('Sorts reminders by time scheduled.', () => {
    const remindersData = {
        1: '2020-03-22T08:30',
        2: '2020-03-22T18:30',
        3: '2020-03-22T12:15',
        4: '2020-03-22T00:01',
        5: '2020-03-22T21:27',
        6: '2020-03-22T05:31',
        7: '2020-03-22T05:29',
        8: '2020-03-22T05:33',
        9: '2020-03-22T13:12',
        10: '2020-03-22T16:00',
    }
    Object.entries(remindersData).forEach(([k, v]) => {
        mainStore.addReminder({ id: k, dateString: v })
    })

    const originalOrder = mainStore.data.reminders[2020][2][22]
        .map(reminder => reminder.id)
        .map(x => +x)
    expect(originalOrder).toEqual([4, 7, 6, 8, 1, 3, 9, 10, 2, 5])
    
    mainStore.data.reminders[2020][2][22][0]
        .dateString = '2020-03-22T23:00'    
    mainStore.sortReminders(2020, 2, 22)
    const newOrder = mainStore.data.reminders[2020][2][22]
        .map(reminder => reminder.id)
        .map(x => +x)
    expect(newOrder).toEqual([7, 6, 8, 1, 3, 9, 10, 2, 5, 4])
})

test('Add reminders with random data.', async () => {
    for (let i = 0; i < 100; i++) {
        mainStore.addRandomReminder()
    }
    const yearList = Object.values(mainStore.data.reminders)
    const monthList = yearList.flatMap(year => Object.values(year))
    const dayList = monthList.flatMap(month => Object.values(month))
    const reminderList = dayList.reduce((acc, cur) => {
        return [...acc, ...cur]
    }, [])

    const uniqueText = [...new Set(reminderList.map(x => x.text))]
    
    expect(reminderList.length).toBe(100)
    expect(uniqueText.length).toBeGreaterThan(1) // Probabilistic    
})

test('Can clear all reminders in a day.', () => {
    const remindersData = {
        1: '2020-03-22T08:30',
        2: '2020-03-22T18:30',
        3: '2020-03-22T12:15',
    }
    Object.entries(remindersData).forEach(([k, v]) => {
        mainStore.addReminder({ id: k, dateString: v })
    })
    const remindersList = mainStore.data.reminders[2020][2]
    expect(remindersList[22].length).toBe(3)
    mainStore.clearDay(2020, 2, 22)
    expect(remindersList[22].length).toBe(0)
})

test('Subtracts selected months correctly.', () => {
    mainStore.data.selectedMonth = 1
    mainStore.data.selectedYear = 2020

    mainStore.minusMonth()
    expect(mainStore.data.selectedMonth).toBe(0)
    expect(mainStore.data.selectedYear).toBe(2020)

    mainStore.minusMonth()
    expect(mainStore.data.selectedMonth).toBe(11)
    expect(mainStore.data.selectedYear).toBe(2019)
})

test('Adds selected months correctly.', () => {
    mainStore.data.selectedMonth = 10
    mainStore.data.selectedYear = 2020

    mainStore.plusMonth()
    expect(mainStore.data.selectedMonth).toBe(11)
    expect(mainStore.data.selectedYear).toBe(2020)

    mainStore.plusMonth()
    expect(mainStore.data.selectedMonth).toBe(0)
    expect(mainStore.data.selectedYear).toBe(2021)
})

test('Adds and subtracts years correctly.', () => {
    mainStore.plusYear()
    expect(mainStore.data.selectedYear).toBe(2021)
    mainStore.minusYear()
    expect(mainStore.data.selectedYear).toBe(2020)
})
