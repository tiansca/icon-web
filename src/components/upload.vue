<template>
<div class="upload-page" v-show="show">
  <div class="header">
    <span class="back" @click="show=false">返回</span>
    <span>上传文件列表</span>
  </div>
  <div class="file-list">
    <div v-for="(item, index) in fileList" :key="index" class="list-item">
      <span class="name">{{item.name}}</span>
      <span class="size">{{item.sizeText}}</span>
      <span class="status" v-if="!item.finished && !item.error">{{item.per}}%</span>
      <span class="status" v-else-if="!item.error">完成</span>
      <span class="status" v-else>失败</span>
    </div>
    <div v-if="!fileList || fileList.length === 0" style="font-size: 14px; color: #999">
      暂无上传文件
    </div>
  </div>
</div>
</template>

<script>
// import {upload} from "../api/file";
import request from '@/utils/request'

export default {
  name: "upload",
  data() {
    return {
      show: false,
      fileList: []
    }
  },
  computed: {
    path() {
      return this.$store.state.path
    },
    uploadingNum() {
      const ingArr = this.fileList.filter(item => {
        return !item.finished && !item.error
      })
      return ingArr.length
    }
  },
  watch: {
    show(n) {
      const body = document.querySelector('body')
      if (n) {
        if(body.className.indexOf('not-overflow') === -1) {
          body.classList.add('not-overflow')
        }
      } else {
        body.classList.remove('not-overflow')
      }
    },
    uploadingNum(n, o) {
      if (n === 0 && o !== 0) {
        console.log('完毕')
        this.$message({
          message: '上传完毕！',
          type: 'success'
        })
      }
    }
  },
  mounted() {
    this.$bus.$on('showUpload', () => {
      this.show = true
    })
    this.$bus.$on('hideUpload', () => {
      this.show = false
    })
    this.$bus.$on('upload', (files) => {
      // this.show = true
      this.upload(files)
    })
  },
  beforeUnmount() {
    this.$bus.$off('show')
    this.$bus.$off('hide')
    this.$bus.$off('upload')
  },
  methods: {
    byteConvert(bytes) {
      if (isNaN(bytes)) {
        return '';
      }
      //在这里定义了常用的字节，字节、千字节、兆字节、吉字节、太字节、拍字节、艾字节、Z字节、Y字节
      var symbols = ['b', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var exp = Math.floor(Math.log(bytes) / Math.log(2));
      if (exp < 1) {
        exp = 0;
      }
      var i = Math.floor(exp / 10);
      bytes /= Math.pow(2, 10 * i);
      if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2);
      }
      return bytes + ' ' + symbols[i];
    },
    upload(files) {
      const newList = []
      for (let a = 0; a < files.length; a++) {
        const item = files[a]
        newList[a] = {
          finished: false,
          path: this.path,
          sizeText: this.byteConvert(item.size),
          per: 0,
          file: item,
          size: item.size,
          name: item.name,
          id: Math.floor(Math.random() * 10000) + item.name,
          error: false
        }
        // 上传文件
        this.uploadFile(newList[a])
      }
      this.fileList = this.fileList.concat(newList)
    },
    async uploadFile(file) {
      // const that = this
      const formData = new FormData();
      formData.append("image", file.file);
      formData.append("path", file.path);
      formData.append("fieldName", 'image');
      formData.append("isFull", 'true');
      try {
        await request({
          url: 'qcloud/upload',
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData,
          onUploadProgress: progressEvent => {
            let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
            console.log(`${process}%`)
            for (let a = 0; a < this.fileList.length; a++) {
              if (this.fileList[a].id === file.id) {
                this.fileList[a].per = process
              }
            }
          }
        })
        // 上传完成，刷新列表
        for (let a = 0; a < this.fileList.length; a++) {
          if (this.fileList[a].id === file.id) {
            this.fileList[a].finished = true
          }
        }
        this.$bus.$emit('refresh', {
          path: file.path
        })
      } catch (e) {
        console.log(e)
        for (let a = 0; a < this.fileList.length; a++) {
          if (this.fileList[a].id === file.id) {
            this.fileList[a].error = true
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.upload-page{
  position: fixed;
  height: 100%;
  width: 100%;
  background: #fff;
  top: 0;
  z-index: 999999;
}
.header{
  /*border-bottom: 1px solid #999;*/
  box-shadow: 0 1px 6px -3px #999;
  padding: 10px 20px;
  /*display: flex;*/
  justify-content: space-between;
}
.file-list{
  max-width: 800px;
  margin: 0 auto;
  padding: 12px 0;
}
.list-item{
  display: flex;
  justify-content: flex-start;
  padding: 8px 20px;
  text-align: left;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #efefef;
  align-items: center;
}
.list-item>.size{
  width: 60px;
  flex-shrink: 0;
  flex-grow: 0;
}
.list-item>.status{
  width: 80px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: right;
}
.list-item>.name{
  flex-grow: 1;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.back{
  font-size: 14px;
  padding: 2px 8px;
  color: #4e6ef2;
  cursor: pointer;
  line-height: 20px;
  position: absolute;
  left: 8px;
}
</style>
