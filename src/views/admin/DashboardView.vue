<template>
  <div class="dashboard">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="logo">
        <h2>华夏文明博物院</h2>
        <p>后台管理</p>
      </div>
      <nav class="nav">
        <button :class="{ active: activeTab === 'reservation' }" @click="activeTab = 'reservation'; loadReservations()">
          <i class="fas fa-calendar-check"></i> 预约管理
        </button>
        <button :class="{ active: activeTab === 'news' }" @click="activeTab = 'news'; loadNews()">
          <i class="fas fa-newspaper"></i> 新闻管理
        </button>
      </nav>
      <button class="logout-btn" @click="handleLogout">
        <i class="fas fa-sign-out-alt"></i> 退出登录
      </button>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 预约管理 -->
      <div v-if="activeTab === 'reservation'" class="tab-content">
        <div class="tab-header">
          <h2>预约管理</h2>
          <button class="refresh-btn" @click="loadReservations">
            <i class="fas fa-sync-alt"></i> 刷新
          </button>
        </div>

        <div v-if="reservationLoading" class="loading">加载中...</div>

        <div v-else class="table-container">
          <table>
            <thead>
              <tr>
                <th>预约编号</th>
                <th>参观日期</th>
                <th>参观时段</th>
                <th>人数</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>总金额</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in reservations" :key="item.reservation_id">
                <td>{{ item.reservation_no }}</td>
                <td>{{ item.visit_date }}</td>
                <td>{{ item.visit_time_slot }}</td>
                <td>{{ item.total_visitors }}</td>
                <td>{{ item.contact_name }}</td>
                <td>{{ item.contact_phone }}</td>
                <td>¥{{ item.total_amount }}</td>
                <td>
                  <span :class="'status status-' + item.status">
                    {{ getStatusText(item.status) }}
                  </span>
                </td>
                <td class="actions">
                  <button v-if="item.status === 'pending'" class="btn-confirm"
                    @click="confirmReservation(item.reservation_id)">
                    确认
                  </button>
                  <button v-if="item.status !== 'cancelled'" class="btn-cancel"
                    @click="cancelReservation(item.reservation_id)">
                    取消
                  </button>
                </td>
              </tr>
              <tr v-if="reservations.length === 0">
                <td colspan="9" class="empty-row">暂无预约记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 新闻管理 -->
      <div v-if="activeTab === 'news'" class="tab-content">
        <div class="tab-header">
          <h2>新闻管理</h2>
          <button class="add-btn" @click="openAddNewsModal">
            <i class="fas fa-plus"></i> 添加新闻
          </button>
        </div>

        <div v-if="newsLoading" class="loading">加载中...</div>

        <div v-else class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>标题</th>
                <th>发布日期</th>
                <th>热门</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in newsList" :key="item.id">
                <td>{{ item.id }}</td>
                <td class="news-title-cell">{{ item.title }}</td>
                <td>{{ item.publishDate }}</td>
                <td>
                  <span :class="item.isHot ? 'hot-badge' : 'normal-badge'">
                    {{ item.isHot ? '热门' : '普通' }}
                  </span>
                </td>
                <td class="actions">
                  <button class="btn-edit" @click="openEditNewsModal(item)">编辑</button>
                  <button class="btn-delete" @click="deleteNews(item.id)">删除</button>
                </td>
              </tr>
              <tr v-if="newsList.length === 0">
                <td colspan="5" class="empty-row">暂无新闻</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- 添加/编辑新闻弹窗 -->
    <div v-if="newsModalVisible" class="modal-overlay" @click.self="closeNewsModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ isEditMode ? '编辑新闻' : '添加新闻' }}</h3>
          <button class="close-btn" @click="closeNewsModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>标题 *</label>
            <input type="text" v-model="newsForm.title" placeholder="请输入新闻标题" />
          </div>
          <div class="form-group">
            <label>发布日期 *</label>
            <input type="date" v-model="newsForm.publishDate" />
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="newsForm.isHot" />
              设为热门
            </label>
          </div>
          <div class="form-group">
            <label>内容 *</label>
            <textarea v-model="newsForm.content" rows="10" placeholder="请输入新闻内容（支持HTML）"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeNewsModal">取消</button>
          <button class="btn-submit" @click="submitNews" :disabled="submitting">
            {{ submitting ? '提交中...' : '提交' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { getReservations, updateReservationStatus } from '@/api/admin'
import { getNewsList, createNews, updateNews, deleteNews as deleteNewsApi } from '@/api/news'

const router = useRouter()
const adminStore = useAdminStore()

const activeTab = ref('reservation')

// 预约相关
const reservations = ref<any[]>([])
const reservationLoading = ref(false)

// 新闻相关
const newsList = ref<any[]>([])
const newsLoading = ref(false)
const newsModalVisible = ref(false)
const isEditMode = ref(false)
const submitting = ref(false)
const newsForm = ref({
  id: 0,
  title: '',
  content: '',
  publishDate: '',
  isHot: false
})

// 获取预约列表
async function loadReservations() {
  reservationLoading.value = true
  try {
    const res = await getReservations()
    console.log('预约列表响应:', res)
    if (res.success && res.data) {
      // 后端返回的数据在 res.data.reservations 中
      reservations.value = res.data.reservations || []
    } else {
      reservations.value = []
    }
  } catch (error) {
    console.error('加载预约列表失败:', error)
    reservations.value = []
  } finally {
    reservationLoading.value = false
  }
}

// 确认预约
async function confirmReservation(id: number) {
  if (!confirm('确认该预约？')) return
  try {
    const res = await updateReservationStatus(id, 'confirmed')
    if (res.success) {
      alert('确认成功')
      loadReservations()
    } else {
      alert(res.message || '操作失败')
    }
  } catch (error) {
    console.error('确认失败:', error)
    alert('操作失败')
  }
}

// 取消预约
async function cancelReservation(id: number) {
  if (!confirm('取消该预约？')) return
  try {
    const res = await updateReservationStatus(id, 'cancelled')
    if (res.success) {
      alert('取消成功')
      loadReservations()
    } else {
      alert(res.message || '操作失败')
    }
  } catch (error) {
    console.error('取消失败:', error)
    alert('操作失败')
  }
}

// 获取新闻列表
async function loadNews() {
  newsLoading.value = true
  try {
    const res = await getNewsList(1, 100)
    console.log('新闻列表响应:', res)
    if (res.success && res.data) {
      // 后端返回的数据在 res.data.news 中
      newsList.value = res.data.news || []
    } else {
      newsList.value = []
    }
  } catch (error) {
    console.error('加载新闻列表失败:', error)
    newsList.value = []
  } finally {
    newsLoading.value = false
  }
}

// 打开添加新闻弹窗
function openAddNewsModal() {
  isEditMode.value = false
  newsForm.value = {
    id: 0,
    title: '',
    content: '',
    publishDate: new Date().toISOString().split('T')[0],
    isHot: false
  }
  newsModalVisible.value = true
}

// 打开编辑新闻弹窗
function openEditNewsModal(news: any) {
  isEditMode.value = true
  newsForm.value = {
    id: news.id,
    title: news.title,
    content: news.content,
    publishDate: news.publishDate,
    isHot: news.isHot
  }
  newsModalVisible.value = true
}

// 提交新闻（添加或编辑）
async function submitNews() {
  if (!newsForm.value.title || !newsForm.value.content || !newsForm.value.publishDate) {
    alert('请填写完整信息')
    return
  }

  submitting.value = true
  try {
    let res
    if (isEditMode.value) {
      res = await updateNews(newsForm.value.id, {
        title: newsForm.value.title,
        content: newsForm.value.content,
        publishDate: newsForm.value.publishDate,
        isHot: newsForm.value.isHot
      })
    } else {
      res = await createNews({
        title: newsForm.value.title,
        content: newsForm.value.content,
        publishDate: newsForm.value.publishDate,
        isHot: newsForm.value.isHot
      })
    }
    console.log('提交新闻响应:', res)
    if (res.success) {
      alert(isEditMode.value ? '编辑成功' : '添加成功')
      closeNewsModal()
      loadNews()
    } else {
      alert(res.message || '操作失败')
    }
  } catch (error) {
    console.error('提交失败:', error)
    alert('操作失败')
  } finally {
    submitting.value = false
  }
}

// 删除新闻
async function deleteNews(id: number) {
  if (!confirm('确定删除该新闻？')) return
  try {
    const res = await deleteNewsApi(id)
    if (res.success) {
      alert('删除成功')
      loadNews()
    } else {
      alert(res.message || '删除失败')
    }
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败')
  }
}

// 关闭弹窗
function closeNewsModal() {
  newsModalVisible.value = false
  newsForm.value = {
    id: 0,
    title: '',
    content: '',
    publishDate: '',
    isHot: false
  }
}

// 退出登录
function handleLogout() {
  adminStore.logout()
  router.push('/admin/login')
}

// 状态文本映射
function getStatusText(status: string) {
  const map: Record<string, string> = {
    pending: '待确认',
    confirmed: '已确认',
    cancelled: '已取消',
    expired: '已过期'
  }
  return map[status] || status
}

onMounted(() => {
  loadReservations()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

/* 侧边栏 */
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.logo {
  padding: 24px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.logo p {
  font-size: 12px;
  opacity: 0.7;
}

.nav {
  flex: 1;
  padding: 20px 0;
}

.nav button {
  width: 100%;
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav button i {
  width: 20px;
}

.nav button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav button.active {
  background: #8b1e1e;
  color: white;
  border-left: 3px solid #ffd700;
}

.logout-btn {
  margin: 20px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #c62828;
}

/* 主内容区 */
.main-content {
  flex: 1;
  margin-left: 260px;
  padding: 24px;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.tab-header h2 {
  font-size: 24px;
  color: #333;
}

.refresh-btn,
.add-btn {
  padding: 8px 16px;
  background: #8b1e1e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}

.refresh-btn:hover,
.add-btn:hover {
  background: #5a1016;
}

/* 表格 */
.table-container {
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th,
td {
  padding: 14px 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.news-title-cell {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.status-pending {
  background: #fff3e0;
  color: #ff9800;
}

.status-confirmed {
  background: #e8f5e9;
  color: #4caf50;
}

.status-cancelled {
  background: #ffebee;
  color: #f44336;
}

.hot-badge {
  background: #ff6b6b;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.normal-badge {
  background: #e0e0e0;
  color: #666;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-confirm,
.btn-edit {
  padding: 4px 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel,
.btn-delete {
  padding: 4px 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background: #2196f3;
}

.empty-row {
  text-align: center;
  color: #999;
  padding: 40px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #999;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 85vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  font-size: 18px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-submit {
  padding: 8px 20px;
  background: #8b1e1e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .main-content {
    margin-left: 200px;
  }

  .nav button {
    padding: 10px 16px;
    font-size: 12px;
  }
}
</style>
