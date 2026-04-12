export interface CalendarCell {
  date: string,
  dateKey: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
}

export type ItemType = 'todo' | 'memo'
export type FilterImageType = ItemType | null
export type SortOrder = 'asc' | 'desc'

export interface CalendarItem {
  id: number
  type: ItemType
  date: string
  title: string
  content: string
  completed: boolean
  createdAt: string
  updatedAt: string
}