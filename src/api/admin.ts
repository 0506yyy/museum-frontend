import request from './request'

// 管理员登录（保持表单格式，因为 login.do 接收表单）
export function adminLogin(username: string, password: string) {
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)
  return request.post('/login.do', formData)
}

// 获取预约列表
export function getReservations(
  page: number = 1,
  pageSize: number = 10,
  status?: string,
  keyword?: string,
) {
  return request.get('/api/admin/reservations', {
    params: { page, pageSize, status, keyword },
  })
}

// 更新预约状态（改成 JSON 格式）
export function updateReservationStatus(reservationId: number, status: string) {
  return request.put(
    '/api/admin/reservations/status',
    {
      reservationId: reservationId,
      status: status,
    },
    {
      headers: {
        'Content-Type': 'application/json', // 发送 JSON
      },
    },
  )
}
