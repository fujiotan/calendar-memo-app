<script setup lang="ts">
import type { ItemType } from '../types/calendar.ts';

defineProps<{
  title: string
  content: string
  itemType: ItemType
  date: string
  submitLabel: string
}>()

const emit = defineEmits<{
  (e: 'update:itemType', value: ItemType): void
  (e: 'update:date', value: string):void
  (e: 'update:title', value: string): void
  (e: 'update:content', value: string): void
  (e: 'submit'): void
}>()

</script>

<template>
  <form class="item-form" @submit.prevent="emit('submit')">
    <select :value="itemType" @change="emit('update:itemType', ($event.target as HTMLSelectElement).value as ItemType)">
      <option value="todo">Todo</option>
      <option value="memo">Memo</option>
    </select>
    <input
      :value="date"
      type="date"
      @input="emit('update:date', ($event.target as HTMLInputElement).value)"
    />
    <input
      :value="title"
      type="text"
      placeholder="タイトル"
      @input="emit('update:title', ($event.target as HTMLInputElement).value)"
    />
    <textarea
      :value="content"
      @input="emit('update:content', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <button type="submit">{{ submitLabel }}</button>
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