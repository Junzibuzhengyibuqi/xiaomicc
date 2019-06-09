/* eslint-disable no-undef */
import request from '../utils/request'
import { getToken } from '../utils/auth'

// eslint-disable-next-line spaced-comment
//商品列表展示
export function getList(params) {
  return request.get('/api/v1/admin/products', {
    params: {
      per: 10,
      page: params
    },
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
// eslint-disable-next-line spaced-comment
//删除商品信息
export function getdele(params) {
  // eslint-disable-next-line space-infix-ops
  return request.delete('/api/v1/admin/products/' + params, {
    // eslint-disable-next-line no-trailing-spaces

    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
// eslint-disable-next-line spaced-comment
//新增商品信息
export function getadd(params) {
  // eslint-disable-next-line comma-spacing
  // eslint-disable-next-line object-curly-spacing
  return request.post('/api/v1/admin/products', params, {
    // eslint-disable-next-line no-trailing-spaces

    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
// eslint-disable-next-line spaced-comment
//根据id获取商品信息
export function getId(params) {
  return request.get('/api/v1/admin/products/' + params, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
// eslint-disable-next-line spaced-comment
//根据用户名关键字模糊查询
export function getCx(params) {
  return request.get('/api/v1/admin/products', {
    params: {
      name: params
    },
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
// eslint-disable-next-line spaced-comment
//修改商品信息
// eslint-disable-next-line comma-spacing
export function getChange(params, id) {
  return request.put('/api/v1/admin/products/' + id, params, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
