<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Calendar from './components/CalendarView.vue'
import ItemForm from './components/ItemForm.vue'
import ItemList from './components/ItemList.vue'
import ItemListAll from './components/ItemListAll.vue'
import { useCalendar } from './composables/useCalendar';
import { useCalendarStore } from './stores/calendar';
import type { ItemType } from './types/calendar'

// Calendar
const {
  weekDays,
  currentMonthFirst,
  currentYear,
  currentMonth,
  calendarCells,
  goToPrevMonth,
  goToNextMonth,
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
  deleteItem,
  startEdit,
  submitItem,
  toggleSortOrder,
  selectType
} = calendarStore

const updateItemType = (value: ItemType): void => {
  itemType.value = value
}

const updateTitle = (value: string): void => {
  title.value = value
}

const updateContent = (value: string): void => {
  content.value = value
}


</script>

<template>
  <div class="app">
    <div class="calendar-panel">
      <calendar
        :week-days="weekDays"
        :current-month-first="currentMonthFirst"
        :current-year="currentYear"
        :current-month="currentMonth"
        :calendar-cells="calendarCells"
        :selected-date="selectedDate"
        @prev-month="goToPrevMonth"
        @next-month="goToNextMonth"
        @set-selected-date="setSelectedDate"
      />
    </div>
    <div class="side-panel">
      <ItemForm
        :title="title"
        :content="content"
        :item-type="itemType"
        :edit-id="editId"
        :selected-date="selectedDate"
        @update:item-type="updateItemType"
        @update:title="updateTitle"
        @update:content="updateContent"
        @submit-item="submitItem"
      />
      <ItemList
        :selected-date="selectedDate"
        :items="selectedDateItems"
        @delete="deleteItem"
        @edit="startEdit"
      />
    </div>
  </div>
  <div>
    <ItemListAll
    :filtered-sorted-items="filteredSortedItems"
    @toggle-sort="toggleSortOrder"
    @select-type="selectType"
    @delete="deleteItem"
    @edit="startEdit"
    />
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

.calendar-panel,
.side-panel {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
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