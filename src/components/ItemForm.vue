<script setup lang="ts">
import type { ItemType } from '../types/calendar.ts';

defineProps<{
  title: string
  content: string
  itemType: ItemType
  editId: number | null
  selectedDate: string
}>()

const emit = defineEmits<{
  (e: 'update:itemType', value: ItemType): void
  (e: 'update:title', value: string): void
  (e: 'update:content', value: string): void
  (e: 'submitItem'): void
}>()

</script>

<template>
  <h2>選択日: {{ selectedDate }}</h2>
  <form class="item-form" @submit.prevent="emit('submitItem')">
    <select :value="itemType" @change="emit('update:itemType', ($event.target as HTMLSelectElement).value as ItemType)">
      <option value="todo">Todo</option>
      <option value="memo">Memo</option>
    </select>
    <input
      :value="title"
      type="text"
      @input="emit('update:title', ($event.target as HTMLInputElement).value)"
    />
    <textarea
      :value="content"
      @input="emit('update:content', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <button type="submit">{{ editId === null ? '追加' : '編集' }}</button>
  </form>
</template>

<style>
h1 {margin:0 5px;font-size:24px;white-space: nowrap;}

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
</style>