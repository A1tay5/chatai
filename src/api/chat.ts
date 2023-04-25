import request from '@/utils/request'

export const chatQuestion = (data: any) => {
  return request({
    method: 'POST',
    url: '/aiChat/question/chat',
    data
  })
}
export const chatpage = (data: any = { pageNum: 1, pageSize: 10 }) => {
  return request({
    method: 'GET',
    url: `/aiChat/record/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&chatRoleId=${data.chatRoleld}`
  })
}
export const chatUserInit = (data: any) => {
  return request({
    method: 'GET',
    url: `/aiChat/question/init/chat/${data}`
  })
}
export const getChatoageList = (data: any) => {
  return request({
    method: 'GET',
    url: `/aiChat/record/group/list`,
    data
  })
}
export const DelChatoageList = (data: any) => {
  return request({
    method: 'DELETE',
    url: `/aiChat/record/group/del/${data}`
  })
}
