import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type {
  CalendarItem,
  ItemType,
} from '../types/calendar'
import { formatDateKey } from '../utils/date'  

const STORAGE_KEY = 'calendar-items'

const isCalendarItem = (item: unknown): item is CalendarItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'type' in item &&
    'date' in item &&
    'title' in item &&
    'content' in item &&
    'completed' in item&&
    'createdAt' in item &&
    'updatedAt' in item
  )
}

const loadCalendarItems = (): CalendarItem[] => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if(!saved) return []
  try {
    const parsed: unknown = JSON.parse(saved)
    if(!Array.isArray(parsed)) return []
    return parsed.filter(isCalendarItem)
  } catch {
    return []
  }
}

export const useCalendarStore = defineStore('calendar', () => {

  const selectedDate = ref<string>(formatDateKey(new Date()))//2000-01-01
  const itemType = ref<ItemType>('todo')
  const title = ref<string>('')
  const content = ref<string>('')
  const items = ref<CalendarItem[]>(loadCalendarItems())
  const editId = ref<number | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const selectedFilterType = ref<'todo' | 'memo' | null>(null)

  watch(
    items,
    (newItems) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
    }, {deep: true}
  )

  const resetForm = ():void =>{
    itemType.value = 'todo'
    title.value = ''
    content.value = ''
    editId.value = null
  }

  const setSelectedDate = (dateKey: string) => {
    selectedDate.value = dateKey
    resetForm()
  }

  const selectedDateItems = computed(() => {
      return items.value.filter(item => item.date === selectedDate.value)
  })

  const filteredSortedItems = computed(() => {
    let cloned: CalendarItem[] = []
    
    if(selectedFilterType.value === 'todo') {
      cloned = items.value.filter(item => item.type === 'todo')
    }else if(selectedFilterType.value === 'memo') {
      cloned = items.value.filter(item => item.type === 'memo')
    }else {
      cloned = [...items.value]
    }
    console.log('87')
    return cloned.sort((a, b) => {
      console.log(a.date)
      const timeA = new Date(a.date).getTime()
      const timeB = new Date(b.date).getTime()
      return sortOrder.value === 'asc' ? timeA - timeB : timeB - timeA
    })
  })

  const addItem = (type: ItemType, titleValue: string, contentValue: string, dateValue: string): void => {
    const newItem: CalendarItem = {
      id: Date.now(),
      type: type,
      date: dateValue, //2000-01-01
      title: titleValue,
      content: contentValue,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    items.value.unshift(newItem)
  }

  const updateItem = (type: ItemType, id: number, titleValue: string, contentValue: string) => {
    const target = items.value.find(item => item.id === id)
    if(!target) return
    target.type = type
    target.title = titleValue
    target.content = contentValue
    target.updatedAt = new Date().toISOString()
  }

  const deleteItem = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

const startEdit = (id: number): void => {
  const target = items.value.find(item => item.id === id)
  if(!target) return

  editId.value = id
  itemType.value = target.type
  title.value = target.title
  content.value = target.content
}

  const submitItem = () => {
    if(!title.value.trim()) return
    if(editId.value === null) {
      addItem(itemType.value, title.value, content.value, selectedDate.value) 
    }else{
      updateItem(itemType.value, editId.value, title.value, content.value)
    }
    resetForm()
  }

  const toggleSortOrder = (): void => {
    console.log(sortOrder.value)
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    console.log(sortOrder.value)
  }

  const selectType = (type: 'todo' | 'memo' | 'all'): void => {
    if(type === 'all'){
      selectedFilterType.value = null
      return
    }
    selectedFilterType.value = type
  }

  return {
    selectedDate,
    itemType,
    title,
    content,
    items,
    editId,
    sortOrder,
    selectedFilterType,
    selectedDateItems,
    filteredSortedItems,
    resetForm,
    setSelectedDate,
    addItem,
    updateItem,
    deleteItem,
    startEdit,
    submitItem,
    toggleSortOrder,
    selectType
  }




})







