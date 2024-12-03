import request from '@/utils/request'
import config from '@/config.js'
import {ElMessageBox } from 'element-plus'

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
export async function download(name, className) {
  // 提示下载
  const fileName = className.replace(`${name}-`, '')
  let url = `${config.baseUrl}icons/${name}/${fileName}.svg`
  if (url.indexOf('http') === -1) {
    url = `${location.origin}${location.pathname}${url}`
    url = url.replace(/([^:]\/)\/+/g, '$1')
  }
  try {
    await ElMessageBox.confirm(`下载链接：${url}`, 'svg链接', {
      confirmButtonText: '打开链接',
      cancelButtonText: '复制链接',
      type: 'success'
    })
    window.open(url)
  } catch (e) {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(url)
  }
}

// 更新图标模式
export function updateModel(params) {
  return request({
    url: 'icon/update_project_model',
    method: 'get',
    params
  })
}

