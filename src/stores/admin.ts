import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/api/request'

export const useAdminStore = defineStore('admin', () => {
  const token = ref(localStorage.getItem('adminToken') || '')
  const isLoggedIn = ref(!!token.value)

  async function login(username: string, password: string) {
    try {
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      const response = await request.post('/login.do', formData)
      console.log('登录响应:', response)

      if (response.success) {
        token.value = 'admin_' + Date.now()
        localStorage.setItem('adminToken', token.value)
        isLoggedIn.value = true
        return true
      } else {
        alert(response.message || '登录失败')
        return false
      }
    } catch (error) {
      console.error('登录请求失败:', error)
      alert('登录失败，请检查网络')
      return false
    }
  }

  function logout() {
    token.value = ''
    isLoggedIn.value = false
    localStorage.removeItem('adminToken')
  }

  return {
    token,
    isLoggedIn,
    login,
    logout,
  }
})
