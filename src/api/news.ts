import request from './request'
import type { NewsListResponse, NewsDetailResponse } from '@/types/news'

// 获取新闻列表
export async function getNewsList(page: number = 1, pageSize: number = 7, keyword?: string) {
  const response = await request.get('/api/admin/news', {
    params: { page, pageSize, keyword },
  })

  // 适配后端返回的数据格式
  // 后端返回: { data: { news: [...] } }
  // 前端需要: { success: true, data: { news: [...], pagination: {...} } }

  const newsList = response.data?.news || []

  // 转换字段名：hot -> isHot
  const convertedNews = newsList.map((item: any) => ({
    ...item,
    isHot: item.hot === true || item.hot === 1,
    publishDate: item.publishDate || '',
    content: item.content || '',
  }))

  return {
    success: true,
    data: {
      news: convertedNews,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        total: convertedNews.length,
        pageSize: pageSize,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
  }
}

// 获取新闻详情
export async function getNewsDetail(id: number) {
  const response = await request.get(`/api/admin/news/${id}`)

  const news = response.data
  return {
    success: true,
    data: {
      ...news,
      isHot: news?.hot === true || news?.hot === 1,
      publishDate: news?.publishDate || '',
    },
  }
}

// 创建新闻（改成 JSON 格式）
export function createNews(data: {
  title: string
  content: string
  publishDate: string
  isHot: boolean
}) {
  return request.post(
    '/api/admin/news',
    {
      title: data.title,
      content: data.content,
      publishDate: data.publishDate,
      hot: data.isHot,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

// 更新新闻（改成 JSON 格式）
export function updateNews(
  id: number,
  data: { title: string; content: string; publishDate: string; isHot: boolean },
) {
  return request.put(
    `/api/admin/news/${id}`,
    {
      title: data.title,
      content: data.content,
      publishDate: data.publishDate,
      hot: data.isHot,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

// 删除新闻
export function deleteNews(id: number) {
  return request.delete(`/api/admin/news/${id}`)
}
