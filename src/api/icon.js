import request from '@/utils/request'

export function createIcon(params) {
  return request({
    url: 'icon/create_icon',
    method: 'get',
    params
  })
}

// 获取项目的图标列表 get_icon_list
export function getIconlist(params) {
  return request({
    url: 'icon/get_icon_list',
    method: 'get',
    params
  })
}

// 上传svg
export function upload(data) {
  return request({
    url: 'icon/upload_svg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

// 删除图标
export function deleteIcon(params) {
  return request({
    url: 'icon/delete_icon',
    method: 'get',
    params
  })
}

// 下载图标
export function download(name, className) {
  window.open(`api/icon/download?name=${name}&className=${className}`)
}

