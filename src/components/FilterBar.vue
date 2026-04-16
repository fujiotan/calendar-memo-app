<script setup lang="ts">

const emit = defineEmits<{
  (e: 'toggle-sort'): void
  (e: 'select-type', type: 'todo' | 'memo' | 'all'):void
}>()
</script>

<template>
  <div class="filter-bar">
    <button class="button-link" @click="emit('toggle-sort')">日付でソート</button>
    <button class="button-link" @click="emit('select-type', 'todo')">予定を表示</button>
    <button class="button-link" @click="emit('select-type', 'memo')">メモを表示</button>
    <button class="button-link" @click="emit('select-type', 'all')">全て表示</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.button-link {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  font: inherit;
}
</style>