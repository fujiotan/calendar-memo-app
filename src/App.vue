<template>
  <div class="app-shell">
    <header class="app-header">
      <h1>カレンダー式 Todo / Memo</h1>
      <nav class="nav-links">
        <RouterLink to="/">ホーム</RouterLink>
        <RouterLink to="/create">新規作成</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.app-main {
  display: block;
}
</style>