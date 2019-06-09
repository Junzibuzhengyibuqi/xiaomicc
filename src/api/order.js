import request from '../utils/request'
import { getToken } from '../utils/auth'
// 获取所有订单信息
export function getOrder(params) {
  return request.get('/api/v1/admin/orders', {
    params,
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
export function changeOrder(id, isPayed) {
  return request.put(
    '/api/v1/admin/orders/' + id,
    { isPayed },
    {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    }
  )
}

export function deleteOrder(id) {
  return request.delete('/api/v1/admin/orders/' + id, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
