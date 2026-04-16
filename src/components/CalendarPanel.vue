<script setup lang="ts">
import type { CalendarCell } from '../types/calendar';

defineProps<{
  weekDays: string[]
  currentYear: number
  currentMonth: number
  calendarCells: CalendarCell[]
  selectedDate: string
}>()

const emit = defineEmits<{
  (e: 'prev-month'): void
  (e: 'next-month'): void
  (e: 'selected-date', dateKey: string): void
}>()
</script>

<template>
  <div class="calendar-header">
    <button @click="emit('prev-month')">前月</button>
    <h1>{{ currentYear }} 年 {{ currentMonth + 1 }}月</h1>
    <button @click="emit('next-month')">次月</button>
  </div>

  <div class="week-row">
    <div v-for="label in weekDays" :key="label">
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
      @click="emit('selected-date', cell.dateKey)"
    >
      <span>{{ cell.dayNumber }}</span>
    </div>
  </div>
</template>

<style scorped>
.calendar-panel {
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


</style>