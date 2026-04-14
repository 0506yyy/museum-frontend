<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>华夏文明博物院</h1>
        <p>后台管理系统</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名" required />
        </div>

        <div class="form-group">
          <label>密码</label>
          <input type="password" v-model="password" placeholder="请输入密码" required />
        </div>

        <div v-if="errorMsg" class="error-msg">
          {{ errorMsg }}
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const adminStore = useAdminStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    errorMsg.value = '请填写用户名和密码'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    const success = await adminStore.login(username.value, password.value)
    if (success) {
      router.push('/admin')
    } else {
      errorMsg.value = '用户名或密码错误'
    }
  } catch (error) {
    errorMsg.value = '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #8b1e1e 0%, #5a1016 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 28px;
  color: #8b1e1e;
  margin-bottom: 8px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #8b1e1e;
}

button {
  width: 100%;
  padding: 12px;
  background: #8b1e1e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover:not(:disabled) {
  background: #5a1016;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-msg {
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
