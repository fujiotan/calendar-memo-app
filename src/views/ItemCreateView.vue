<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import ItemForm from '../components/ItemForm.vue'
import { useCalendarStore } from '../stores/calendar';
import type { ItemType } from '../types/calendar'

const route = useRoute()
const router = useRouter()
const calendarStore = useCalendarStore()

const itemType = ref<ItemType>('todo')
const date = ref<string>(
  typeof route.query.date === 'string' ? route.query.date : calendarStore.selectedDate
)
const title = ref<string>('')
const content =ref<string>('')

const submit = (): void => {
  if(!title.value.trim()) return

  const id = calendarStore.addItem(
    itemType.value,
    title.value,
    content.value,
    date.value
  )
  calendarStore.setSelectedDate(date.value)
  router.push(`/item/${id}`)
}
</script>

<template>
  <section class="page-card">
    <div class="page-header">
      <h1>新規作成</h1>
      <RouterLink to="/">一覧へ戻る</RouterLink>
    </div>

    <ItemForm
      :item-type="itemType"
      :date="date"
      :title="title"
      :content="content"
      submit-label="追加"
      @update:item-type="itemType = $event"
      @update:date="date = $event"
      @update:title="title = $event"
      @update:content="content = $event"
      @submit="submit"
    />
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
</style>