<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface CalendarCell {
  date: string,
  dateKey: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
}

const today = new Date()

const formatDateKey = (d: Date): string => {
  const year  = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const date  = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${date}`
}

const selectedDate = ref<string>(formatDateKey(today)) //2000-01-01
const currentMonthFirst = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const weekDays = ['日', '月', '火', '水', '木', '金', '土']

const currentYear  = computed(() => currentMonthFirst.value.getFullYear())
const currentMonth = computed(() => currentMonthFirst.value.getMonth())

const setSelectedDate = (dateKey: string) => {
  selectedDate.value = dateKey
  title.value = ''
  content.value = ''
  editId.value = null
}

const selectedDateTodos = computed(() => {
    return todos.value.filter(item => {
      return item.date === selectedDate.value
  })
})

const isSameDate = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

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

interface Todos {
  id: number
  type: string
  date: string
  title: string
  content: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

type ItemType = 'todo' | 'memo'

const STORAGE_KEY = 'calendar-items'

const loadCalendarItems = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if(!saved) return []

  try {
    const parsed: unknown = JSON.parse(saved)
    if(!Array.isArray(parsed)) return []

    return parsed.filter((item): item is Todos => {
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
    })
  } catch {
    return []
  }
}

const itemType = ref<ItemType>('todo')
const title = ref<string>('')
const content = ref<string>('')
const todos = ref<Todos[]>(loadCalendarItems())
const editId = ref<number | null>(null)
const sortOrder = ref<'asc' | 'desc'>('desc')
const selectItemType = ref<'todo' | 'memo' | null>(null)

watch(
  todos,
  (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  }, {deep: true}
)

const editMode = (id: number) => {
  editId.value = id
  const target = todos.value.find(item => item.id === editId.value)
  if(!target) return
  title.value = target.title
  content.value = target.content
}

const onSubmit = () => {
  if(!title.value.trim()) return
  if(editId.value === null) {
    addItem(itemType.value, title.value, content.value, selectedDate.value) 
  }else{
    editItem(itemType.value, editId.value, title.value, content.value)
  }
}

const addItem = (type: string, title: string, content: string, selectedDate: string) => {
  const newTodo = {
    id: Date.now(),
    type: type,
    date: selectedDate, //2000-01-01
    title: title,
    content: content,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  todos.value.unshift(newTodo)
}

const editItem = (type: string, id: number, title: string, content: string) => {
  const target = todos.value.find(item => item.id === id)
  if(!target) return
  target.type = type
  target.title = title
  target.content = content
  target.updatedAt = new Date().toISOString()
}

const delItem = (id: number) => {
  todos.value = todos.value.filter((item) => item.id !== id)
}

const formatedListDate = (id: number) => {
  const target = todos.value.find(item => item.id === id)
  if(!target) return 
  const mm = target.date.slice(5, 7)
  const dd = target.date.slice(8, 10)
  return `${mm}/${dd}`
}

const filteredSortedItems = computed(() => {
  let crone: Todos[] = []
  if(selectItemType.value === 'todo') {
    crone = todos.value.filter(item => {
      return item.type === 'todo'
    })
  }else if(selectItemType.value === 'memo') {
    crone = todos.value.filter(item => {
      return item.type === 'memo'
    })
  }else {
    crone = [...todos.value]
  }

  return crone.sort((a, b) => {
    console.log(a.date)
    const timeA = new Date(a.date).getTime()
    const timeB = new Date(b.date).getTime()
    return sortOrder.value === 'asc' ? timeA - timeB : timeB - timeA

  })
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const selectType = (type: string) => {
  if(type === 'todo'){
    selectItemType.value = 'todo'
  }else if(type === 'memo'){
    selectItemType.value = 'memo'
  }else{
    selectItemType.value = null
  }
}

</script>

<template>
  <div class="app">
    <div class="calendar-panel">
      <div class="calendar-header">
        <button @click="goToPrevMonth">前月</button>
        <h1>{{ currentYear }} 年 {{ currentMonth + 1 }}月</h1>
        <button @click="goToNextMonth">次月</button>
      </div>

      <div class="week-row">
        <div v-for="label in weekDays">
          {{ label }}
        </div>
      </div>

      <div class="calendar-grid">
        <div v-for="cell in calendarCells" :key="cell.dateKey"
          class="day-cell"
          :class="{
            muted: !cell.isCurrentMonth,
            today: cell.isToday,
            selected: cell.dateKey === selectedDate
          }"
          @click="setSelectedDate(cell.dateKey)"
        >
          <span>{{ cell.dayNumber }}</span>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <h2>選択日: {{ selectedDate }}</h2>

      <form class="item-form" @submit.prevent="onSubmit">
        <select v-model="itemType">
          <option value="todo">Todo</option>
          <option value="memo">Memo</option>
        </select>
        <input type="text" v-model="title" />
        <textarea v-model="content"></textarea>
        <button type="submit">{{ editId === null ? '追加' : '編集' }}</button>
      </form>

        <div>
        <h2 class="item-header">{{ selectedDate }}の予定</h2>
        <hr>
        <ul class="item-list">
          <li v-for="todo in selectedDateTodos" :key="todo.id">
            {{ formatedListDate(todo.id) }}
            [{{ todo.type === 'todo' ? '予定' :'メモ' }}]
            {{ todo.title }}
            <button @click="delItem(todo.id)">削除</button>
            <button @click="editMode(todo.id)">編集</button>
          </li>
        </ul>
      </div>
    </div>
  </div>


  <div>
    <h2>予定一覧</h2>
    <hr>
    <div class="item-header">
      <button class="button-link" @click="toggleSortOrder">日付でソート</button>｜
      <button class="button-link" @click="selectType('todo')">予定を表示</button>｜
      <button class="button-link" @click="selectType('memo')">メモを表示</button>｜
      <button class="button-link" @click="selectType('all')">全て表示</button>
    </div>
    <ul class="item-list">
      <li v-for="todo in filteredSortedItems" :key="todo.id">
        {{ formatedListDate(todo.id) }}
        ［{{ todo.type === 'todo' ? '予定' :'メモ' }}］
        {{ todo.title }}
        <button @click="delItem(todo.id)">削除</button>
        <button @click="editMode(todo.id)">編集</button>
      </li>
    </ul>
  </div>


</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
}
h1 {margin:0 5px;font-size:24px;white-space: nowrap;}

.calendar-panel,
.side-panel {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.week-row,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.week-row {
  margin-bottom: 8px;
}

.week-cell {
  text-align: center;
  font-weight: bold;
}

.day-cell {
  min-height: 72px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 2px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
}

.day-cell.muted {
  opacity: 0.4;
  cursor: unset;
}
.day-cell.selected {
  outline: 2px solid #333;
  color: #00f;
  font-weight: bold;
}

.day-cell.today {
  border: 2px solid #f86a6a;
  font-weight: bold;
  color: #111;
}

.item-form {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
}

.item-form input,
.item-form textarea,
.item-form select,
.item-form button {
  padding: 8px;
  font: inherit;
}

button, .button {
  cursor: pointer;
}

.button-link {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  font: inherit;
}

.item-list {
  width: 96%;
  display: grid;
  gap: 15px;
  padding: 0;
  margin: 0 auto;
  text-align: left;
  list-style: none;
  opacity: 100;
}

.item-list button {
  margin: 5px
}

.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.item-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.item-header{
  margin:10px auto;
}

.item-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.badge {
  font-size: 12px;
  padding: 2px 6px;
  border: 1px solid #ccc;
  border-radius: 999px;
}





</style>