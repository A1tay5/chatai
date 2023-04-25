import request from '@/utils/request'

export const login = (data: any) => {
  return request({
    method: 'POST',
    url: '/aiChat/customer/login',
    data
  })
}
export const getEmailcode = (data: any) => {
  return request({
    method: 'GET',
    url: '/aiChat/customer/send/code?email=' + data
  })
}
export const postEmailcode = (data: any) => {
  return request({
    method: 'POST',
    url: '/aiChat/customer/verify/email/code',
    data
  })
}
export const register = (data: any) => {
  return request({
    method: 'POST',
    url: '/aiChat/customer/register',
    data
  })
}
export const getElorList = (data: any) => {
  return request({
    method: 'GET',
    url: '/aiChat/role/list?pageNum=1&pageSize=10' + (data ? '&type=' + data.type : '')
  })
}
