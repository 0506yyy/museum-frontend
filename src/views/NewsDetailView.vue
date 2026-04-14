<template>
  <div class="news-detail-page">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在加载...</p>
    </div>

    <div v-else-if="news" class="detail-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">
        <i class="fas fa-arrow-left"></i> 返回列表
      </button>

      <!-- 文章头部 -->
      <div class="article-header">
        <div class="article-tag">
          <span v-if="news.isHot" class="hot-tag">
            <i class="fas fa-fire"></i> 热门推荐
          </span>
          <span class="date-tag">
            <i class="far fa-calendar-alt"></i> {{ formatDate(news.publishDate) }}
          </span>
        </div>
        <h1 class="article-title">{{ news.title }}</h1>
        <div class="article-divider"></div>
      </div>

      <!-- 文章内容 -->
      <div class="article-content" v-html="news.content"></div>

      <!-- 底部导航 -->
      <div class="article-footer">
        <button class="share-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i> 返回列表
        </button>
      </div>
    </div>

    <div v-else class="empty">
      <i class="fas fa-exclamation-triangle"></i>
      <p>新闻不存在或已被删除</p>
      <button class="back-home" @click="goBack">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()
const { currentNews: news, loading } = storeToRefs(newsStore)
const { fetchNewsDetail } = newsStore

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月${String(date.getDate()).padStart(2, '0')}日`
}

function goBack() {
  router.push('/news')
}

onMounted(() => {
  const id = Number(route.params.id)
  if (id) {
    fetchNewsDetail(id)
  }
})
</script>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: #f8f5f0;
  padding: 40px 0 80px;
}

.detail-container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 返回按钮 */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 30px;
}

.back-btn:hover {
  background: #8b1e1e;
  color: white;
  border-color: #8b1e1e;
}

/* 文章头部 */
.article-header {
  background: white;
  border-radius: 24px;
  padding: 40px 48px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.article-tag {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.hot-tag {
  background: linear-gradient(135deg, #ff6b6b, #ff4757);
  color: white;
  font-size: 13px;
  padding: 5px 14px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.date-tag {
  color: #999;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.article-title {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
  margin-bottom: 24px;
  font-family: 'Noto Serif SC', serif;
}

.article-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #8b1e1e, #d4a373);
  border-radius: 3px;
}

/* 文章内容 */
.article-content {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-size: 17px;
  line-height: 1.9;
  color: #3a3a3a;
}

.article-content :deep(p) {
  margin-bottom: 24px;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 32px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-content :deep(h2) {
  font-size: 28px;
  color: #8b1e1e;
  margin: 40px 0 20px;
  font-family: 'Noto Serif SC', serif;
}

.article-content :deep(h3) {
  font-size: 22px;
  color: #5a1016;
  margin: 32px 0 16px;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #8b1e1e;
  padding-left: 24px;
  margin: 24px 0;
  color: #666;
  font-style: italic;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 16px 0 16px 32px;
}

.article-content :deep(li) {
  margin: 8px 0;
}

/* 底部 */
.article-footer {
  margin-top: 32px;
  text-align: center;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.share-btn:hover {
  background: #8b1e1e;
  color: white;
  border-color: #8b1e1e;
}

/* 加载动画 */
.loading {
  text-align: center;
  padding: 100px 0;
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

/* 空状态 */
.empty {
  text-align: center;
  padding: 100px 20px;
}

.empty i {
  font-size: 64px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty p {
  color: #999;
  margin-bottom: 24px;
}

.back-home {
  padding: 12px 28px;
  background: #8b1e1e;
  color: white;
  border: none;
  border-radius: 40px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .article-header {
    padding: 24px 20px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-content {
    padding: 24px 20px;
  }

  .article-content :deep(h2) {
    font-size: 22px;
  }
}
</style>
