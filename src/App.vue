<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendar } from './composables/useCalendar';
import { useCalendarStore } from './stores/calendar';
import { formatMonthDay } from './utils/date';

const {
  weekDays,
  currentYear,
  currentMonth,
  calendarCells,
  goToPrevMonth,
  goToNextMonth
} = useCalendar()

const calendarStore = useCalendarStore()

const {
  selectedDate,
  itemType,
  title,
  content,
  editId,
  selectedDateItems,
  filteredSortedItems
} = storeToRefs(calendarStore)

const {
  setSelectedDate,
  submitItem,
  deleteItem,
  startEdit,
  toggleSortOrder,
  selectType
} = calendarStore

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

      <form class="item-form" @submit.prevent="submitItem">
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
          <li v-for="todo in selectedDateItems" :key="todo.id">
            {{ formatMonthDay(todo.date) }}
            [{{ todo.type === 'todo' ? '予定' :'メモ' }}]
            {{ todo.title }}
            <button @click="deleteItem(todo.id)">削除</button>
            <button @click="startEdit(todo.id)">編集</button>
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
        {{ formatMonthDay(todo.date) }}
        ［{{ todo.type === 'todo' ? '予定' :'メモ' }}］
        {{ todo.title }}
        <button @click="deleteItem(todo.id)">削除</button>
        <button @click="startEdit(todo.id)">編集</button>
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