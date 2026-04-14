<script setup lang="ts">
import type { CalendarItem } from '../types/calendar.ts'
import { formatMonthDay } from '../utils/date.ts'

defineProps<{
  selectedDate: string
  items: CalendarItem[]
}>()

const emit = defineEmits<{
  (e: 'delete', value: number): void
  (e: 'edit', value: number): void
}>()

</script>

<template>
  <div>
    <h2 class="item-header">{{ selectedDate }}の予定</h2>
    <hr>
    <ul class="item-list">
      <li v-for="todo in items" :key="todo.id">
        {{ formatMonthDay(todo.date) }}
        [{{ todo.type === 'todo' ? '予定' :'メモ' }}]
        {{ todo.title }}
        <button @click="emit('delete', todo.id)">削除</button>
        <button @click="emit('edit', todo.id)">編集</button>
      </li>
    </ul>
  </div>
</template>

<style scorp>
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

</style>