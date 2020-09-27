import {
    daysInMonth,
    getWeekDay,
    listDays,
    range
} from './utils'

test('daysInMonth returns correct number for common months.', () => {
    expect(daysInMonth(0, 2020)).toBe(31)
    expect(daysInMonth(2, 2020)).toBe(31)
    expect(daysInMonth(3, 2020)).toBe(30)
    expect(daysInMonth(4, 2020)).toBe(31)
    expect(daysInMonth(5, 2020)).toBe(30)
    expect(daysInMonth(6, 2020)).toBe(31)
    expect(daysInMonth(7, 2020)).toBe(31)
    expect(daysInMonth(8, 2020)).toBe(30)
    expect(daysInMonth(9, 2020)).toBe(31)
    expect(daysInMonth(10, 2020)).toBe(30)
    expect(daysInMonth(11, 2020)).toBe(31)
})

test('daysInMonth returns correct number for february.', () => {
    expect(daysInMonth(1, 2019)).toBe(28)
    expect(daysInMonth(1, 2020)).toBe(29)
    expect(daysInMonth(1, 2021)).toBe(28)
})

test('daysInMonth default arguments to be correct.', () => {
    const today = new Date()
    expect(daysInMonth())
        .toBe(daysInMonth(today.getMonth(), today.getFullYear()))
    expect(daysInMonth(today.getMonth()))
        .toBe(daysInMonth(today.getMonth(), today.getFullYear()))
})

test('getWeekDay returns correct number', () => {
    expect(getWeekDay(2020, 0, 12)).toBe(0)
    expect(getWeekDay(2021, 1, 1)).toBe(1)
    expect(getWeekDay(2020, 11, 8)).toBe(2)
    expect(getWeekDay(2019, 7, 7)).toBe(3)
    expect(getWeekDay(2022, 1, 24)).toBe(4)
    expect(getWeekDay(2020, 9, 30)).toBe(5)
    expect(getWeekDay(2018, 7, 4)).toBe(6)
})

test('listDays return correct number of days', () => {
    expect(listDays(0, 2020).length).toBe(31)
    expect(listDays(1, 2020).length).toBe(29)
    expect(listDays(2, 2020).length).toBe(31)
    expect(listDays(3, 2020).length).toBe(30)
    expect(listDays(4, 2020).length).toBe(31)
})

test('listDays expanded return correct number of days', () => {
    expect(listDays(0, 2020, true).length).toBe(35)
    expect(listDays(1, 2020, true).length).toBe(35)
    expect(listDays(2, 2020, true).length).toBe(35)
    expect(listDays(3, 2020, true).length).toBe(35)
    expect(listDays(4, 2020, true).length).toBe(42)
})

test('listDays object has all correct properties', () => {
    const someDay = listDays(8, 2020)[0]

    expect(someDay.day).toBe(1)
    expect(someDay.month).toBe(8)
    expect(someDay.year).toBe(2020)
    expect(someDay.weekDay).toBe(2)
})

range('Create inclusive arrays with correct length.', () => {
    expect(range(6).length).toBe(6)
    expect(range(1).length).toBe(1)
    expect(range(10).length).toBe(10)
    expect(range(4)).toEqual([1, 2, 3, 4])
})