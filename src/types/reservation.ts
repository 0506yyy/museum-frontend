// 参观者信息    ? 表示可选
export interface Visitor {
  visitorNo: number
  visitorName: string
  idCardNumber: string
  phoneNumber: string
  email?: string
  visitorType: string
  ticketPrice: number
}

// 预约信息
export interface Reservation {
  reservationId?: number
  reservationNo?: string
  visitDate: string
  visitTimeSlot: string
  totalVisitors: number
  ticketType: string
  contactName: string
  contactPhone: string
  remarks?: string
  status?: string
  totalAmount?: number
}

// 预约提交响应
export interface ReservationResponse {
  success: boolean
  reservationNo?: string
  message?: string
  data?: {
    reservationNo: string
    visitDate: string
    visitTime: string
    totalVisitors: number
    totalAmount: number
  }
}

// 时段限额信息
export interface TimeSlotLimit {
  slotName: string
  maxVisitors: number
  currentVisitors: number
  available: boolean
}
