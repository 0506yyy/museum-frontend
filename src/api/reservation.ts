import request from './request'
import type { ReservationResponse } from '@/types/reservation'

// 提交预约
export function submitReservation(data: {
  visitDate: string
  visitTime: string
  ticketType: string
  visitorCount: number
  contactName: string
  contactPhone: string
  remarks: string
  visitors: Array<{
    visitorName: string
    idCardNumber: string
    phoneNumber: string
    email: string
  }>
}) {
  // 将数据转换为表单格式（因为后端用 Servlet，接收表单参数）
  const formData = new URLSearchParams()
  formData.append('visitDate', data.visitDate)
  formData.append('visitTime', data.visitTime)
  formData.append('ticketType', data.ticketType)
  formData.append('visitorCount', data.visitorCount.toString())
  formData.append('contactName', data.contactName)
  formData.append('contactPhone', data.contactPhone)
  formData.append('remarks', data.remarks)

  // 添加参观者信息
  data.visitors.forEach((visitor, index) => {
    const num = index + 1
    formData.append(`visitorName${num}`, visitor.visitorName)
    formData.append(`visitorId${num}`, visitor.idCardNumber)
    formData.append(`visitorPhone${num}`, visitor.phoneNumber)
    if (visitor.email) {
      formData.append(`visitorEmail${num}`, visitor.email)
    }
  })

  return request.post<any, ReservationResponse>('/reservation', formData)
}

// 检查时段可用性
export function checkAvailability(visitDate: string, visitTime: string, visitorCount: number) {
  return request.get('/api/checkAvailability', {
    params: { visitDate, visitTime, visitorCount },
  })
}
