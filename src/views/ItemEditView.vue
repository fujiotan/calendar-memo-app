<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ItemForm from '../components/ItemForm.vue'
import { useCalendarStore } from '../stores/calendar'
import type { ItemType } from '../types/calendar'

const route = useRoute()
const router = useRouter()
const calendarStore = useCalendarStore()

const itemId = computed(() => Number(route.params.id))
const targetItem = computed(() => calendarStore.getItemById(itemId.value))

const itemType = ref<ItemType>('todo')
const date = ref<string>('')
const title = ref<string>('')
const content = ref<string>('')

watchEffect(() => {
  if(!targetItem.value) return

  itemType.value = targetItem.value.type
  date.value = targetItem.value.date
  title.value = targetItem.value.title
  content.value = targetItem.value.content
})

const submit = (): void => {
  if (!targetItem.value) return
  if (!title.value.trim()) return

  calendarStore.updateItem(
    targetItem.value.id,
    itemType.value,
    title.value,
    content.value,
    date.value
  )

  calendarStore.setSelectedDate(date.value)
  router.push(`/items/${targetItem.value.id}`)
}
</script>

<template>
  <section v-if="targetItem" class="page-card">
    <div class="page-header">
      <h1>編集</h1>
      <div class="actions">
        <RouterLink :to="`/items/${targetItem.id}`">詳細へ戻る</RouterLink>
        <RouterLink to="/">一覧へ戻る</RouterLink>
      </div>
    </div>

    <ItemForm
      :item-type="itemType"
      :date="date"
      :title="title"
      :content="content"
      submit-label="更新"
      @update:item-type="itemType = $event"
      @update:date="date = $event"
      @update:title="title = $event"
      @update:content="content = $event"
      @submit="submit"
    />
  </section>

  <section v-else class="page-card">
    <h1>編集対象が見つかりません</h1>
    <RouterLink to="/">一覧へ戻る</RouterLink>
  </section>
</template>

<style scoped>
.page-card {
  max-width: 720px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 12px;
}
</style>