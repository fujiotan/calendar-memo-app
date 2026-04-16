<script setup lang="ts">
import { formatMonthDay } from '../utils/date';
import type { CalendarItem } from '../types/calendar.ts'

defineProps<{
  filteredSortedItems: CalendarItem[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'edit', id: number): void
}>()

</script>

<template>
  <h2>予定一覧</h2>
  <hr>
  
  <ul class="item-list">
    <li v-for="todo in filteredSortedItems" :key="todo.id">
      {{ formatMonthDay(todo.date) }}
      ［{{ todo.type === 'todo' ? '予定' :'メモ' }}］
      {{ todo.title }}
      <button @click="emit('delete', todo.id)">削除</button>
      <button @click="emit('edit', todo.id)">編集</button>
    </li>
  </ul>

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

.item-header{
  margin:10px auto;
}

</style>