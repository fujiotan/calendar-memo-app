type ItemType = 'todo' | 'memo'

interface CalendarItem {
  id: number
  type: ItemType
  date: string
  title: string
  content: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}