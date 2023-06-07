<template>
  <div class="container">
    <div class="header">
      <div style="width: 220px">
        <el-button size="small" @click="$router.back()">返回</el-button>
      </div>
      <span>图标预览-{{name}}</span>
      <div style="width: 220px;display: flex;align-items: center;justify-content: flex-end">
        <input ref="input" type="file" multiple style="display:none" @change="upload" accept="image/svg+xml">
        <el-button type="primary" size="small" @click="selectFiles" style="margin-right: 16px">上传svg</el-button>
        <el-dropdown @command="menuClick">
        <span class="el-dropdown-link">
          {{ userName }}
          <img src="../assets/arrow-down.png">
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="page-box">
      <div v-if="list.length > 0" class="link-info">
        <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
          css链接：<a :href="`${cssLink}${cssUrl}`" target="_block">{{ `${cssLink}${cssUrl}` }}</a>
        </div>
      </div>
      <div v-if="list.length > 0" class="icon-wrap">
        <div v-for="icon in list" :key="icon" class="icon-item">
          <span class="icon" :class="icon"></span>
          <div class="icon-name">{{icon}}</div>
          <div class="mask">
            <div v-if="userRole === 'admin'" class="delete-button"  title="删除图标" @click="deleteIcon(icon)">
              <img src="../assets/delete.png" alt="">
            </div>
            <div class="mask-bottom">
              <div @click="downloadSvg(name, icon)">下载</div>
              <div @click="copyClass(icon)">复制</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="list.length === 0" style="margin-top: 30px">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue"
import { useRoute } from 'vue-router';
import {getIconlist, upload, deleteIcon, download} from '../api/icon'
import Bus from '../utils/bus.js'
import config from '@/config.js'
import insertCss from "../utils/insertCss";
import copy from '../utils/copyText'
export default {
  name: "detail",
  setup() {
    const getList = async () => {
      Bus.$emit('loadingShow')
      try {
        const {data} = await getIconlist({
          name: state.name
        })
        state.list = data.iconList
        state.cssUrl = data.cssUrl
        console.log(state.list)
      } catch (e) {
        console.log(e)
      }
      Bus.$emit('loadingHide')
    }
    const state = reactive({
      list: [],
      // deleteProject,
      getList,
      name: '',
      baseUrl: config.baseUrl,
      cssLink: config.cssUrl,
      cssUrl: ''
    })
    onMounted(async () => {
      const route = useRoute()
      if (route.query && route.query.name) {
        state.name = route.query.name
        await getList()
        // 查找有无css
        const tagAttrNameValue = `fonticon${state.name}`
        const fonticonLink = document.querySelector(`link[name="${tagAttrNameValue}"]`)
        if (!fonticonLink) {
          insertCss([{name: state.name, cssUrl: state.cssUrl}])
        }
      }
    })
    return state
  },
  computed: {
    userName() {
      return this.$store.getters.userName || '用户'
    },
    userRole() {
      return this.$store.getters.userRole || ''
    }
  },
  methods: {
    selectFiles() {
      this.$refs.input.click()
    },
    async upload() {
      const formData = new FormData();
      console.log(this.$refs.input)
      if (!this.$refs.input) {
        return
      }
      const files = this.$refs.input.files
      formData.append('name', this.name);
      console.log(files.length)
      if (!files || files.length === 0) {
        console.log('文件为空')
        return
      }
      for (let a = 0; a < files.length; a++) {
        formData.append('files', files[a], files[a].name);
      }
      this.$bus.$emit('loadingShow')
      try {
        const {data} = await upload(formData)
        insertCss([data])
        this.list = data.classList
      } catch (e) {
        console.log(e)
      }
      this.$bus.$emit('loadingHide')
      this.$refs.input.value = ''
    },
    async deleteIcon(className) {
      try {
        await this.$confirm(`确定删除icon“${className}”吗？`, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
      } catch (e) {
        console.log(e)
        return
      }
      try {
        await deleteIcon({
          name: this.name,
          className
        })
        this.getList()
      } catch (e) {
        this.$alert(e && e.code === -1 ? e.data : '删除失败', {
          confirmButtonText: '确定',
        })
      }
    },
    downloadSvg(name, icon) {
      download(name, icon)
    },
    copyClass(icon) {
      copy(icon)
    },
    async menuClick(e) {
      if (e === 'logout') {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  text-align: left;
}
.page-box{
  padding: 16px;
  .link-info{
    text-align: left;
  }
  .icon-wrap{
    display: flex;
    margin-top: 30px;
    justify-content: flex-start;
    flex-wrap: wrap;
    .icon-item{
      padding: 12px 3px;
      margin: 16px 0;
      width: 120px;
      position: relative;
      span:first-of-type{
        font-size: 40px;
        color: #666
      }
      div{
        font-size: 16px;
        color: #333
      }
      .icon-name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        margin-top: 3px;
      }
      .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        align-items: center;
        justify-content: center;
        display: none;
        .delete-button{
          margin-top: -20px;
          img{
            width: 30px;
            cursor: pointer;
          }
        }
        .mask-bottom{
          position: absolute;
          bottom: 0px;
          width: 100%;
          display: flex;
          border-top: 1px solid #999;
          div{
            font-size: 13px;
            color: #dcdcdc;
            line-height: 30px;
            flex-grow: 1;
            text-align: center;
            cursor: pointer;
            &:hover{
              color: #fff
            }
          }
          div+div{
            border-left: 1px solid #999;
          }
        }
      }
      &:hover{
        .icon{
          opacity: 0.6;
        }
        .icon-name{
          opacity: 0.6;
        }
        .mask{
          display: flex;
        }
      }
    }
  }
}

</style>
