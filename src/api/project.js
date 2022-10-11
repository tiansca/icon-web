import request from '@/utils/request'
import config from '@/config.js'

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
    url: `${config.loginUrl}icon_login/`,
    method: 'post',
    data
  })
}
