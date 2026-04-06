export type ItemType = 'todo' | 'memo'

export interface CalendarItem {
  id: number
  type: ItemType
  title: string
  content: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface CalendarCell {
  date: Date
  dateKey: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
}