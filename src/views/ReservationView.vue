<template>
  <div class="reservation-page">
    <!-- 步骤指示器 -->
    <div class="step-indicator">
      <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
        <div class="step-number">1</div>
        <div class="step-label">填写预约信息</div>
      </div>
      <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
        <div class="step-number">2</div>
        <div class="step-label">填写参观者信息</div>
      </div>
      <div class="step" :class="{ active: currentStep >= 3 }">
        <div class="step-number">3</div>
        <div class="step-label">确认提交</div>
      </div>
    </div>

    <!-- 博物馆特色展示 -->
    <div class="museum-features">
      <div class="feature-item">
        <i class="fas fa-history"></i>
        <span>千年历史</span>
      </div>
      <div class="feature-item">
        <i class="fas fa-archway"></i>
        <span>珍贵文物</span>
      </div>
      <div class="feature-item">
        <i class="fas fa-users"></i>
        <span>专业讲解</span>
      </div>
      <div class="feature-item">
        <i class="fas fa-wifi"></i>
        <span>免费WiFi</span>
      </div>
    </div>

    <!-- 预约须知 -->
    <div class="info-box">
      <i class="fas fa-info-circle"></i>
      <strong>预约须知：</strong>
      请至少提前一天进行预约，每人最多可预约5张门票。参观时请携带有效身份证件原件。
      预约成功后请保留预约确认信息，参观当日凭身份证和预约信息入馆。
    </div>

    <div class="form-container">
      <!-- 预约表单 -->
      <div class="form-main">
        <div class="form-header">
          <i class="fas fa-calendar-alt"></i>
          博物馆参观预约表
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- 预约日期和时间 -->
          <div class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label class="required">参观日期</label>
                <input type="date" v-model="reservationForm.visitDate" :min="minDate" class="form-control" required />
                <div class="form-text">请选择参观日期（至少提前一天预约）</div>
              </div>

              <div class="form-group">
                <label class="required">参观时段</label>
                <select v-model="reservationForm.visitTimeSlot" class="form-control" required>
                  <option value="">请选择时段</option>
                  <option value="上午 09:00-11:00">上午 09:00-11:00</option>
                  <option value="中午 11:00-13:00">中午 11:00-13:00</option>
                  <option value="下午 13:00-15:00">下午 13:00-15:00</option>
                  <option value="下午 15:00-17:00">下午 15:00-17:00</option>
                </select>
                <div class="form-text">每个时段限制200人，请根据行程选择</div>
              </div>
            </div>
          </div>

          <!-- 票型选择 -->
          <div class="form-section">
            <label class="required">票型选择</label>
            <div class="ticket-types">
              <div class="ticket-card" :class="{ active: reservationForm.ticketType === 'adult' }"
                @click="reservationForm.ticketType = 'adult'; onTicketTypeChange()">
                <strong>成人票</strong>
                <span class="price">¥60</span>
                <small>普通成人参观票</small>
              </div>
              <div class="ticket-card" :class="{ active: reservationForm.ticketType === 'student' }"
                @click="reservationForm.ticketType = 'student'; onTicketTypeChange()">
                <strong>学生票</strong>
                <span class="price">¥30</span>
                <small>需出示有效学生证</small>
              </div>
              <div class="ticket-card" :class="{ active: reservationForm.ticketType === 'senior' }"
                @click="reservationForm.ticketType = 'senior'; onTicketTypeChange()">
                <strong>老年票</strong>
                <span class="price">¥30</span>
                <small>60周岁以上老年人</small>
              </div>
              <div class="ticket-card" :class="{ active: reservationForm.ticketType === 'free' }"
                @click="reservationForm.ticketType = 'free'; onTicketTypeChange()">
                <strong>免费票</strong>
                <span class="price">免费</span>
                <small>6岁以下儿童、残疾人、军人等</small>
              </div>
            </div>
          </div>

          <!-- 参观人数 -->
          <div class="form-section">
            <label class="required">参观人数</label>
            <div class="visitor-count">
              <input type="range" v-model.number="visitorCount" min="1" max="5" step="1" @input="updateVisitorCount" />
              <input type="number" v-model.number="visitorCount" min="1" max="5" class="count-input"
                @change="updateVisitorCount" />
              <span class="hint">（最多5人）</span>
            </div>
          </div>

          <!-- 总金额显示 -->
          <div class="price-display">
            <span>预计总金额：</span>
            <span class="amount">¥{{ totalAmount }}</span>
          </div>

          <!-- 参观者信息 -->
          <div class="form-section" v-if="currentStep >= 2">
            <h3 class="section-title">参观者信息</h3>
            <div v-for="(visitor, index) in visitors" :key="index" class="visitor-item">
              <div class="visitor-header">
                <h5>参观者 #{{ visitor.visitorNo }}</h5>
                <button v-if="visitors.length > 1" type="button" class="remove-btn" @click="removeVisitor(index)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="required">姓名</label>
                  <input type="text" v-model="visitor.visitorName" class="form-control" placeholder="请输入真实姓名"
                    required />
                </div>
                <div class="form-group">
                  <label class="required">身份证号</label>
                  <input type="text" v-model="visitor.idCardNumber" class="form-control" placeholder="请输入18位身份证号码"
                    required />
                </div>
                <div class="form-group">
                  <label class="required">手机号码</label>
                  <input type="tel" v-model="visitor.phoneNumber" class="form-control" placeholder="请输入11位手机号码"
                    required />
                </div>
                <div class="form-group">
                  <label>电子邮箱</label>
                  <input type="email" v-model="visitor.email" class="form-control" placeholder="选填，用于接收电子票" />
                </div>
              </div>
            </div>
          </div>

          <!-- 联系人信息 -->
          <div class="form-section" v-if="currentStep >= 2">
            <h3 class="section-title">联系人信息</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="required">联系人姓名</label>
                <input type="text" v-model="reservationForm.contactName" class="form-control" placeholder="请输入联系人姓名"
                  required />
                <div class="form-check">
                  <input type="checkbox" id="sameAsFirst" @change="fillContactFromFirstVisitor" />
                  <label for="sameAsFirst">与第一位参观者相同</label>
                </div>
              </div>
              <div class="form-group">
                <label class="required">联系人手机</label>
                <input type="tel" v-model="reservationForm.contactPhone" class="form-control" placeholder="请输入11位手机号码"
                  required />
                <div class="form-text">用于接收预约确认短信</div>
              </div>
            </div>
          </div>

          <!-- 备注信息 -->
          <div class="form-section" v-if="currentStep >= 2">
            <label>备注信息</label>
            <textarea v-model="reservationForm.remarks" class="form-control" rows="3"
              placeholder="如有特殊需求请在此说明"></textarea>
          </div>

          <!-- 协议确认 -->
          <div class="form-section" v-if="currentStep >= 3">
            <div class="form-check">
              <input type="checkbox" id="agreeTerms" v-model="agreeTerms" required />
              <label for="agreeTerms">我已阅读并同意预约参观协议和隐私政策</label>
            </div>
          </div>

          <!-- 按钮 -->
          <div class="form-buttons">
            <button v-if="currentStep > 1" type="button" class="btn btn-secondary" @click="prevStep">上一步</button>
            <button v-if="currentStep < 3" type="button" class="btn btn-primary" @click="nextStep">下一步</button>
            <button v-if="currentStep === 3" type="submit" class="btn btn-success" :disabled="submitting">提交预约</button>
            <button type="button" class="btn btn-outline" @click="resetForm">重置</button>
          </div>
        </form>
      </div>

      <!-- 侧边栏 -->
      <div class="sidebar">
        <div class="card">
          <div class="card-header">重要提醒</div>
          <div class="card-body">
            <ul>
              <li>预约确认：预约成功后，您将收到确认短信</li>
              <li>证件要求：参观当日请携带有效身份证件原件</li>
              <li>时间要求：请按预约时段入馆，逾期无效</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功弹窗 -->
    <div v-if="submitSuccess" class="success-modal">
      <div class="modal-content">
        <i class="fas fa-check-circle success-icon"></i>
        <h2>预约成功！</h2>
        <div class="reservation-info">
          <p>预约编号：<strong>{{ submitResult?.reservationNo }}</strong></p>
          <p>参观日期：{{ submitResult?.visitDate }}</p>
          <p>参观时段：{{ submitResult?.visitTime }}</p>
          <p>参观人数：{{ submitResult?.totalVisitors }}人</p>
          <p>总金额：¥{{ submitResult?.totalAmount }}</p>
        </div>
        <button class="btn btn-primary" @click="closeSuccessModal">继续预约</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReservationStore } from '@/stores/reservation'

const reservationStore = useReservationStore()

const currentStep = ref(1)
const agreeTerms = ref(false)
const visitorCount = ref(1)

const reservationForm = computed(() => reservationStore.reservationForm)
const visitors = computed(() => reservationStore.visitors)
const totalAmount = computed(() => reservationStore.totalAmount)
const submitting = computed(() => reservationStore.submitting)
const submitSuccess = computed(() => reservationStore.submitSuccess)
const submitResult = computed(() => reservationStore.submitResult)

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

function updateVisitorCount() {
  reservationStore.updateVisitorCount(visitorCount.value)
}

function onTicketTypeChange() {
  reservationStore.onTicketTypeChange()
}

function fillContactFromFirstVisitor(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.checked) {
    reservationStore.fillContactFromFirstVisitor()
  }
}

function removeVisitor(index: number) {
  reservationStore.updateVisitorCount(visitors.value.length - 1)
  visitorCount.value = visitors.value.length
}

function nextStep() {
  if (currentStep.value === 1 && reservationForm.value.visitDate && reservationForm.value.visitTimeSlot) {
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    currentStep.value = 3
  }
}

function prevStep() {
  currentStep.value--
}

function resetForm() {
  reservationStore.resetForm()
  visitorCount.value = 1
  currentStep.value = 1
  agreeTerms.value = false
}

async function handleSubmit() {
  console.log('提交预约')
  const result = await reservationStore.submitReservationForm()
  console.log('结果:', result)
  if (result.success) {
    currentStep.value = 1
  } else {
    alert('提交失败: ' + (result.message || '未知错误'))
  }
}

function closeSuccessModal() {
  reservationStore.resetForm()
  visitorCount.value = 1
  currentStep.value = 1
  agreeTerms.value = false
}
</script>

<style scoped>
.reservation-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.step {
  flex: 1;
  text-align: center;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step.active .step-number {
  background: #741a1a;
  color: white;
}

.step.completed .step-number {
  background: #28a745;
  color: white;
}

.step-label {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.step.active .step-label {
  color: #741a1a;
  font-weight: bold;
}

.museum-features {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.feature-item {
  flex: 1;
  background: white;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
}

.feature-item i {
  font-size: 24px;
  color: #741a1a;
  margin-right: 8px;
}

.info-box {
  background: #fff3e0;
  padding: 12px 20px;
  border-radius: 8px;
  border-left: 4px solid #741a1a;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  gap: 30px;
}

.form-main {
  flex: 2;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.form-header {
  background: #741a1a;
  color: white;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
}

.form-section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group label.required::after {
  content: '*';
  color: red;
  margin-left: 4px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-text {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.ticket-types {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.ticket-card {
  flex: 1;
  min-width: 100px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.ticket-card.active {
  border-color: #741a1a;
  background: #fff3e0;
}

.ticket-card .price {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #741a1a;
  margin: 8px 0;
}

.visitor-count {
  display: flex;
  align-items: center;
  gap: 15px;
}

.count-input {
  width: 80px;
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.price-display {
  background: #f8f9fa;
  padding: 15px 20px;
  text-align: right;
  font-size: 18px;
}

.price-display .amount {
  font-size: 24px;
  font-weight: bold;
  color: #741a1a;
}

.visitor-item {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.visitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.remove-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
}

.form-buttons {
  display: flex;
  gap: 15px;
  padding: 20px;
  justify-content: center;
}

.btn {
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #741a1a;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-outline {
  background: white;
  border: 1px solid #ddd;
}

.sidebar {
  flex: 1;
}

.card {
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 12px 16px;
  font-weight: bold;
}

.card-body {
  padding: 16px;
}

.card-body ul {
  list-style: none;
  padding: 0;
}

.card-body li {
  margin-bottom: 12px;
}

.success-modal {
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
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.success-icon {
  font-size: 64px;
  color: #28a745;
  margin-bottom: 20px;
}

.reservation-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
}

.form-check {
  margin-top: 8px;
}

.form-check input {
  margin-right: 6px;
}

@media (max-width: 768px) {
  .form-container {
    flex-direction: column;
  }

  .museum-features {
    display: none;
  }
}
</style>
