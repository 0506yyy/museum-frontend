import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Visitor, Reservation, ReservationResponse } from '@/types/reservation'
import { submitReservation } from '@/api/reservation'

// 1、定义store
export const useReservationStore = defineStore('reservation', () => {
  // 2、state数据
  const reservationForm = ref<Reservation>({
    visitDate: '',
    visitTimeSlot: '',
    totalVisitors: 1,
    ticketType: 'adult',
    contactName: '',
    contactPhone: '',
    remarks: '',
  })

  const visitors = ref<Visitor[]>([
    {
      visitorNo: 1,
      visitorName: '',
      idCardNumber: '',
      phoneNumber: '',
      email: '',
      visitorType: 'adult',
      ticketPrice: 60,
    },
  ])

  const submitting = ref(false)
  const submitSuccess = ref(false)
  const submitResult = ref<ReservationResponse['data'] | null>(null)
  const submitError = ref<string | null>(null)

  // 票价映射
  const priceMap = {
    adult: 60,
    student: 30,
    senior: 30,
    free: 0,
  }

  // 计算总价  3. getters（计算属性）
  const totalAmount = computed(() => {
    const unitPrice = priceMap[reservationForm.value.ticketType as keyof typeof priceMap] || 60
    return unitPrice * reservationForm.value.totalVisitors
  })

  // 更新参观者人数  4. actions（方法）
  function updateVisitorCount(count: number) {
    if (count < 1) count = 1
    if (count > 5) count = 5

    reservationForm.value.totalVisitors = count

    const currentCount = visitors.value.length
    if (count > currentCount) {
      // 增加参观者
      for (let i = currentCount + 1; i <= count; i++) {
        visitors.value.push({
          visitorNo: i,
          visitorName: '',
          idCardNumber: '',
          phoneNumber: '',
          email: '',
          visitorType: reservationForm.value.ticketType,
          ticketPrice: priceMap[reservationForm.value.ticketType as keyof typeof priceMap] || 60,
        })
      }
    } else if (count < currentCount) {
      // 减少参观者
      visitors.value = visitors.value.slice(0, count)
    }
  }

  // 同步所有参观者的票价（当票型变化时）
  function syncVisitorPrices() {
    const unitPrice = priceMap[reservationForm.value.ticketType as keyof typeof priceMap] || 60
    visitors.value.forEach((visitor) => {
      visitor.visitorType = reservationForm.value.ticketType
      visitor.ticketPrice = unitPrice
    })
  }

  // 票型变化时调用
  function onTicketTypeChange() {
    syncVisitorPrices()
  }

  // 一键填充联系人（与第一位参观者相同）
  function fillContactFromFirstVisitor() {
    if (visitors.value.length > 0) {
      reservationForm.value.contactName = visitors.value[0].visitorName
      reservationForm.value.contactPhone = visitors.value[0].phoneNumber
    }
  }

  // 提交预约
  async function submitReservationForm() {
    console.log('submitReservationForm 被调用')
    submitting.value = true
    submitError.value = null

    try {
      console.log('准备提交的数据:', {
        visitDate: reservationForm.value.visitDate,
        visitTime: reservationForm.value.visitTimeSlot,
        ticketType: reservationForm.value.ticketType,
        visitorCount: reservationForm.value.totalVisitors,
        contactName: reservationForm.value.contactName,
        contactPhone: reservationForm.value.contactPhone,
        remarks: reservationForm.value.remarks,
        visitors: visitors.value,
      })

      const submitData = {
        visitDate: reservationForm.value.visitDate,
        visitTime: reservationForm.value.visitTimeSlot,
        ticketType: reservationForm.value.ticketType,
        visitorCount: reservationForm.value.totalVisitors,
        contactName: reservationForm.value.contactName,
        contactPhone: reservationForm.value.contactPhone,
        remarks: reservationForm.value.remarks || '',
        visitors: visitors.value.map((v) => ({
          visitorName: v.visitorName,
          idCardNumber: v.idCardNumber,
          phoneNumber: v.phoneNumber,
          email: v.email || '',
        })),
      }

      const response = await submitReservation(submitData)
      console.log('后端返回:', response)

      if (response.success) {
        submitSuccess.value = true
        submitResult.value = response.data || null
        return { success: true, data: response.data }
      } else {
        submitError.value = response.message || '预约失败'
        return { success: false, message: response.message }
      }
    } catch (error: any) {
      console.error('提交预约失败:', error)
      submitError.value = error.message || '网络错误，请稍后重试'
      return { success: false, message: error.message }
    } finally {
      submitting.value = false
    }
  }

  // 重置表单
  function resetForm() {
    reservationForm.value = {
      visitDate: '',
      visitTimeSlot: '',
      totalVisitors: 1,
      ticketType: 'adult',
      contactName: '',
      contactPhone: '',
      remarks: '',
    }
    visitors.value = [
      {
        visitorNo: 1,
        visitorName: '',
        idCardNumber: '',
        phoneNumber: '',
        email: '',
        visitorType: 'adult',
        ticketPrice: 60,
      },
    ]
    submitSuccess.value = false
    submitResult.value = null
    submitError.value = null
  }

  // 5. 返回
  return {
    // state
    reservationForm,
    visitors,
    submitting,
    submitSuccess,
    submitResult,
    submitError,
    // getters
    totalAmount,
    // actions
    updateVisitorCount,
    onTicketTypeChange,
    fillContactFromFirstVisitor,
    submitReservationForm,
    resetForm,
  }
})

//Pinia 的三要素：state、getters、actions
//ref 定义响应式数据
//computed 定义计算属性
