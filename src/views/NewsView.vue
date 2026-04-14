<template>
  <div class="news-page">
    <!-- 顶部横幅 -->
    <div class="news-banner">
      <div class="banner-content">
        <h1>文博资讯</h1>
        <p>传承中原文明 · 展示历史瑰宝</p>
      </div>
    </div>

    <div class="news-container">
      <!-- 搜索栏 -->
      <div class="search-section">
        <div class="search-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input type="text" v-model="keyword" placeholder="搜索新闻标题或内容..." @keyup.enter="searchNews" />
          <button @click="searchNews">搜索</button>
        </div>
      </div>

      <!-- 加载中 -->
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>正在加载资讯...</p>
      </div>

      <!-- 新闻列表 -->
      <div v-else class="news-list">
        <div v-if="newsList.length === 0" class="empty">
          <i class="fas fa-newspaper"></i>
          <p>暂无相关资讯</p>
          <button @click="resetSearch">返回首页</button>
        </div>

        <div v-for="news in newsList" :key="news.id" class="news-card" @click="goToDetail(news.id)">
          <div class="news-card-inner">
            <div class="news-tag">
              <span v-if="news.isHot" class="hot-tag">
                <i class="fas fa-fire"></i> 热门
              </span>
              <span class="date-tag">
                <i class="far fa-calendar-alt"></i> {{ formatDate(news.publishDate) }}
              </span>
            </div>
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-summary">{{ getSummary(news.content) }}</p>
            <div class="news-footer">
              <span class="read-more">
                阅读全文 <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination">
        <button class="page-btn prev" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
          <i class="fas fa-chevron-left"></i> 上一页
        </button>
        <span class="page-info">
          <span class="current">{{ currentPage }}</span> / <span class="total">{{ totalPages }}</span>
        </span>
        <button class="page-btn next" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          下一页 <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import { storeToRefs } from 'pinia'

const router = useRouter()
const newsStore = useNewsStore()
const { newsList, loading, totalPages, currentPage } = storeToRefs(newsStore)
const { fetchNewsList } = newsStore

const keyword = ref('')

function getSummary(content: string, maxLength: number = 120) {
  if (!content) return '暂无内容'
  const plainText = content.replace(/<[^>]+>/g, '')
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength) + '...'
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

function goToDetail(id: number) {
  router.push(`/news/${id}`)
}

function goToPage(page: number) {
  fetchNewsList(page, 7, keyword.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function searchNews() {
  fetchNewsList(1, 7, keyword.value)
}

function resetSearch() {
  keyword.value = ''
  fetchNewsList(1, 7)
}

onMounted(() => {
  fetchNewsList(1, 7)
})
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  background: #f8f5f0;
}

/* 顶部横幅 */
.news-banner {
  background: linear-gradient(135deg, #8b1e1e 0%, #5a1016 100%);
  padding: 60px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.news-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1566127444979-b3d2b6545a6e?w=1600') center/cover;
  opacity: 0.1;
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.news-banner h1 {
  font-size: 48px;
  color: #fff;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 2px;
  margin-bottom: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.news-banner p {
  font-size: 18px;
  color: #f1b1b1;
  letter-spacing: 1px;
}

/* 容器 */
.news-container {
  max-width: 1000px;
  margin: -30px auto 60px;
  padding: 0 20px;
  position: relative;
}

/* 搜索栏 */
.search-section {
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 6px;
  margin-bottom: 40px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0 20px;
}

.search-icon {
  color: #999;
  font-size: 18px;
}

.search-wrapper input {
  flex: 1;
  padding: 16px 16px;
  border: none;
  font-size: 15px;
  background: transparent;
  outline: none;
}

.search-wrapper input::placeholder {
  color: #bbb;
}

.search-wrapper button {
  padding: 10px 28px;
  background: linear-gradient(135deg, #8b1e1e, #5a1016);
  color: white;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.search-wrapper button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 30, 30, 0.3);
}

/* 加载动画 */
.loading {
  text-align: center;
  padding: 80px 0;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #8b1e1e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading p {
  color: #999;
}

/* 新闻列表 */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 50px;
}

.news-card {
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.news-card-inner {
  padding: 28px 32px;
}

.news-tag {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.hot-tag {
  background: linear-gradient(135deg, #ff6b6b, #ff4757);
  color: white;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.hot-tag i {
  font-size: 10px;
}

.date-tag {
  color: #999;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.news-title {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  line-height: 1.4;
  font-family: 'Noto Serif SC', serif;
}

.news-summary {
  color: #666;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 20px;
}

.news-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.read-more {
  color: #8b1e1e;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.3s;
}

.read-more i {
  transition: transform 0.3s;
}

.news-card:hover .read-more i {
  transform: translateX(4px);
}

/* 空状态 */
.empty {
  text-align: center;
  padding: 80px 0;
  background: white;
  border-radius: 16px;
}

.empty i {
  font-size: 64px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty p {
  color: #999;
  margin-bottom: 20px;
}

.empty button {
  padding: 10px 24px;
  background: #8b1e1e;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.page-btn {
  padding: 10px 24px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.page-btn:hover:not(:disabled) {
  background: #8b1e1e;
  color: white;
  border-color: #8b1e1e;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 15px;
  color: #666;
}

.page-info .current {
  font-weight: 600;
  color: #8b1e1e;
  font-size: 18px;
}

@media (max-width: 768px) {
  .news-banner h1 {
    font-size: 32px;
  }

  .news-card-inner {
    padding: 20px;
  }

  .news-title {
    font-size: 18px;
  }

  .search-wrapper {
    padding: 0 12px;
  }

  .search-wrapper button {
    padding: 8px 16px;
  }
}
</style>
