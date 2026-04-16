<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import CalendarPanel from '../components/CalendarPanel.vue';
import ItemList from '../components/ItemList.vue'
import FilterBar from '../components/FilterBar.vue'
import { useCalendar } from '../composables/useCalendar'
import { useCalendarStore } from '../stores/calendar'

const router = useRouter()

const {
  weekDays,
  currentYear,
  currentMonth,
  calendarCells,
  goToPrevMonth,
  goToNextMonth
} = useCalendar()

const calendarStore = useCalendarStore()

const {
  selectedDate,
  selectedDateItems,
  filteredSortedItems
} = storeToRefs(calendarStore)

const {
  setSelectedDate,
  deleteItem,
  toggleSortOrder,
  selectType
} = calendarStore

const moveToCreatePage = (): void => {
  router.push({
    path: '/create',
    query: {
      date: selectedDate.value
    }
  })
}

</script>

<template>
  <div class="page">
    <div class="top-grid">
      <CalendarPanel
        :week-days="weekDays"
        :current-year="currentYear"
        :current-month="currentMonth"
        :calendar-cells="calendarCells"
        :selected-date="selectedDate"
        @prev-month="goToPrevMonth"
        @next-month="goToNextMonth"
        @select-date="setSelectedDate"
      />

      <section class="panel">
        <div class="panel-header">
          <h2>選択日: {{ selectedDate }}</h2>
          <button @click="moveToCreatePage">この日で新規作成</button>
        </div>

        <h3>{{ selectedDate }} の予定</h3>
        <ItemList
          :selectedDate="selectedDate"
          :items="selectedDateItems"
          empty-text="この日の予定はありません。"
          @delete="deleteItem"
        />
      </section>
    </div>

    <section class="panel all-list-section">
      <div class="panel-header">
        <h2>予定一覧</h2>
        <RouterLink to="/create">新規作成へ</RouterLink>
      </div>

      <FilterBar
        @toggle-sort="toggleSortOrder"
        @select-type="selectType"
      />

      <ItemList
        :selectedDate="selectedDate"
        :items="filteredSortedItems"
        empty-text="予定がありません。"
        @delete="deleteItem"
      />
    </section>
  </div>
</template>


<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.top-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.panel {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.all-list-section {
  display: grid;
  gap: 16px;
}

@media (max-width: 900px) {
  .top-grid {
    grid-template-columns: 1fr;
  }
}
</style>