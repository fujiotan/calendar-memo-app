<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCalendarStore } from '../stores/calendar'

const route = useRoute()
const router = useRouter()
const calendarStore = useCalendarStore()

const itemId = computed(() => Number(route.params.id))

const item = computed(() => {
  return calendarStore.getItemById(itemId.value)
})

const remove = (): void => {
  if(!item.value) return

  calendarStore.deleteItem(item.value.id)
  router.push('/')
}

</script>

<template>
  <section v-if="item" class="page-card">
    <div class="page-header">
      <h1>詳細</h1>
      <div class="actions">
        <RouterLink to="/">一覧へ戻る</RouterLink>
        <RouterLink :to="`/items/${item.id}/edit`">編集</RouterLink>
      </div>
    </div>

    <dl class="detail-list">
      <div class="detail-row">
        <dt>日付</dt>
        <dd>{{ item.date }}</dd>
      </div>

      <div class="detail-row">
        <dt>種類</dt>
        <dd>{{ item.type === 'todo' ? '予定' : 'メモ' }}</dd>
      </div>

      <div class="detail-row">
        <dt>タイトル</dt>
        <dd>{{ item.title }}</dd>
      </div>

      <div class="detail-row">
        <dt>内容</dt>
        <dd>{{ item.content || '（未入力）' }}</dd>
      </div>

      <div class="detail-row">
        <dt>作成日時</dt>
        <dd>{{ item.createdAt }}</dd>
      </div>

      <div class="detail-row">
        <dt>更新日時</dt>
        <dd>{{ item.updatedAt }}</dd>
      </div>
    </dl>

    <button @click="remove">削除</button>
  </section>

  <section v-else class="page-card">
    <h1>データが見つかりません</h1>
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

.detail-list {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
}

dt {
  font-weight: bold;
}
</style>