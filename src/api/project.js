import request from '@/utils/request'
// import config from '@/config.js'

export function getProjects(params) {
  return request({
    url: 'icon/get_projects',
    method: 'get',
    params
  })
}

export function deleteProject(params) {
  return request({
    url: 'icon/delete_project',
    method: 'get',
    params
  })
}

export function addProject(params) {
  return request({
    url: 'icon/add_project',
    method: 'get',
    params
  })
}

// 修改项目名称 update_project
export function updateProject(params) {
  return request({
    url: 'icon/update_project',
    method: 'get',
    params
  })
}

export function login(data) {
  return request({
    url: `/login/`,
    method: 'post',
    data
  })
}
// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/getUserList',
    method: 'get',
    params
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: '/deleteUser',
    method: 'post',
    data
  })
}
export function addUser(data) {
  return request({
    url: '/addUser',
    method: 'post',
    data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/updateUser',
    method: 'post',
    data
  })
}

