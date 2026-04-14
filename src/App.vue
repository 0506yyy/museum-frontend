<template>
  <div id="app">
    <Header />
    <NavMenu />
    <main class="main-content">
      <router-view /> <!-- 这里是页面内容 -->
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import NavMenu from '@/components/layout/NavMenu.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f6f7;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 1200px;
  max-width: 90%;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
