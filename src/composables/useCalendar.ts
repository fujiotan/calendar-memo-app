import { computed, ref } from 'vue'
import type { CalendarCell } from '../types/calendar'
import { formatDateKey, isSameDate } from '../utils/date'

export const useCalendar = () => {
  const today = new Date()
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  const currentMonthFirst = ref(new Date(today.getFullYear(), today.getMonth(), 1))

  const currentYear  = computed(() => currentMonthFirst.value.getFullYear())
  const currentMonth = computed(() => currentMonthFirst.value.getMonth())

  const calendarCells = computed<CalendarCell[]>(() => {
    const year = currentYear.value
    const month = currentMonth.value

    const firstDate = new Date(year, month, 1)
    const firstDay = firstDate.getDay()

    const startDate = new Date(year, month, 1 - firstDay)

    const cells: CalendarCell[] = []

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      cells.push({
        
        date: String(date),
        dateKey: formatDateKey(date),
        dayNumber: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: isSameDate(date, today)
      })
    }
    return cells
  })

  const goToPrevMonth = (): void => {
  currentMonthFirst.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

  const goToNextMonth = (): void => {
    currentMonthFirst.value = new Date(currentYear.value, currentMonth.value + 1, 1)
  }

  return {
    today,
    weekDays,
    currentMonthFirst,
    currentYear,
    currentMonth,
    calendarCells,
    goToPrevMonth,
    goToNextMonth
  }


}