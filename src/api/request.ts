import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/henan1',
  timeout: 10000,
  withCredentials: true,
  // 不要设置默认的 Content-Type，让每个请求自己决定
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    console.log('请求URL:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('响应数据:', response.data)
    return response.data
  },
  (error) => {
    console.error('API Error:', error)

    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('未授权，请重新登录')
          break
        case 404:
          console.error('接口不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error(error.response.data?.message || '请求失败')
      }
    } else if (error.request) {
      console.error('网络连接失败，请检查后端服务是否启动')
    }

    return Promise.reject(error)
  },
)

export default request
