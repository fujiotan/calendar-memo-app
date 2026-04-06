import type { CalendarCell } from "../types/calendar";

export function formatDateKey (date: Date): string {
  return date.toLocaleDateString('sv-SE')
}

export function isSameDate (a: Date, b: Date): boolean {
  return formatDateKey(a) === formatDateKey(b)
}

export function formatMonth (date: Date): string {
  return `${date.getFullYear}年 ${date.getMonth() + 1}月`
}

export function createCalendarCells(baseDate: Date): CalendarCell[] {
  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay()

  const startDate = new Date(year, month, 1 - startDay)

  const today = new Date()

  const cells: CalendarCell[] = []

  for (let i = 0; i < 42; i++) {
    const current = new Date(startDate)
    current.setDate(startDate.getDate() + i)

    cells.push({
      date: current,
      dateKey: formatDateKey(current),
      dayNumber: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      isToday: isSameDate(current, today)
    })
  }
  return cells
}
