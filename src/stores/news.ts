import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { News } from '@/types/news'
import { getNewsList, getNewsDetail } from '@/api/news'

export const useNewsStore = defineStore('news', () => {
  // State
  const newsList = ref<News[]>([])
  const currentNews = ref<News | null>(null)
  const loading = ref(false)
  const totalPages = ref(1)
  const currentPage = ref(1)
  const total = ref(0)

  // 获取新闻列表
  async function fetchNewsList(page: number = 1, pageSize: number = 7, keyword?: string) {
    loading.value = true
    try {
      const response = await getNewsList(page, pageSize, keyword)
      if (response.success) {
        newsList.value = response.data.news
        totalPages.value = response.data.pagination.totalPages
        currentPage.value = response.data.pagination.currentPage
        total.value = response.data.pagination.total
      }
    } catch (error) {
      console.error('获取新闻列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 获取新闻详情
  async function fetchNewsDetail(id: number) {
    loading.value = true
    try {
      const response = await getNewsDetail(id)
      if (response.success) {
        currentNews.value = response.data
      }
    } catch (error) {
      console.error('获取新闻详情失败:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    newsList,
    currentNews,
    loading,
    totalPages,
    currentPage,
    total,
    fetchNewsList,
    fetchNewsDetail,
  }
})
