import request from '@/utils/request'

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
