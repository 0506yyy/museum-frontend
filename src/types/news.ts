// 新闻信息
export interface News {
  id: number
  title: string
  content: string
  publishDate: string
  isHot: boolean
  createTime?: string
  updateTime?: string
}

// 新闻列表响应
export interface NewsListResponse {
  success: boolean
  data: {
    news: News[]
    pagination: {
      currentPage: number
      totalPages: number
      total: number
      pageSize: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
}

// 新闻详情响应
export interface NewsDetailResponse {
  success: boolean
  data: News
}
