<template>
  <div class="container">
    <div class="header">图标库</div>
    <div class="page-box">
      <div class="addButton" title="新建项目" @click="addProject">
        <img src="../assets/add.png" alt="">
      </div>
      <div class="project-list">
        <div v-loading="item.loading" class="project-item" v-for="item in list" :key="item.name" @click="goDetail(item.name)">
          <div class="project-name">
            {{item.name}}
          </div>
          <div class="icon-overview">
            <div v-for="icon in item.iconList" :key="icon" class="icon-item">
              <span :class="icon"></span>
            </div>
            <div v-if="!item.iconList || item.iconList.length === 0" style="width: 100%">暂无图标</div>
            <div class="icon-item hide">
              <span></span>
            </div>
          </div>
          <div class="item-bottom">
            <div class="item-button" @click.stop="deleteProject(item.name)">删除</div>
            <div class="item-button" @click.stop="updateProject(item.name)">重命名</div>
            <div class="item-button" @click.stop="createIcon(item)">更新</div>
          </div>
        </div>
        <div v-if="list.length === 0" style="margin-top: 30px; text-align: center;width: 100%">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, watch} from "vue"
import {getProjects, deleteProject, addProject, updateProject} from "../api/project";
import {createIcon} from '../api/icon'
import Bus from '../utils/bus.js'
import insertCss from "../utils/insertCss";

export default {
  name: 'list',
  setup() {
    const getList = async () => {
      Bus.$emit('loadingShow')
      try {
        const {data} = await getProjects()
        state.list = data.map(item => {
          item.iconList = item.iconList.slice(0, 4)
          return item
        })
        insertCss(state.list)
        console.log('getList')
      } catch (e) {
        console.log(e)
      }
      Bus.$emit('loadingHide')
    }
    const state = reactive({
      list: [],
      // deleteProject,
      getList
    })
    onMounted(() => {
      getList()
    })
    watch(
    //   () => state.list,
    //   val => {
    //     // insertCss(val)
    //   },
    //   { deep: true }
    )
    return state
  },
  methods: {
    async deleteProject(name) {
      try {
        await this.$confirm(`确定删除项目“${name}”吗？`, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
      } catch (e) {
        console.log(e)
        return
      }
      try {
        await deleteProject({
          name
        })
        this.getList()
      } catch (e) {
        this.$alert(e && e.code === -1 ? e.data : '删除失败', {
          confirmButtonText: '确定',
        })
      }
    },
    async addProject() {
      try {
        const res = await this.$prompt('请输入项目名称', '新建项目', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
        // 名称只能是英文开头
        const  reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
        if (reg.test(res.value)) {
          await addProject({
            name: res.value
          })
          this.getList()
        } else {
          this.$alert('名称只能包含英文和数字且必须以英文字母开头', '提示', {
            type: 'error',
            confirmButtonText: '确定',
          })
        }

      } catch (e) {
        console.log(e)
        if (e && e.code === -1) {
          this.$alert(e.data, '提示', {
            type: 'error',
            confirmButtonText: '确定',
          })
        }
      }

    },
    async updateProject(name) {
      try {
        const res = await this.$prompt('请输入项目新名称', `修改项目-${name}`, {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
        await updateProject({
          name: name,
          new_name: res.value
        })
        this.getList()
      } catch (e) {
        console.log(e)
        if (e && e.code === -1) {
          this.$alert(e.data, '提示', {
            confirmButtonText: '确定',
          })
        }
      }
    },
    async createIcon(item) {
      item.loading = true
      try {
        const { data } = await createIcon({
          name: item.name
        })
        item.classList = data.classList.slice(0, 4)
        console.log(data)
        if (data.cssUrl) {
          item.cssUrl = data.cssUrl
          insertCss([item])
        }
      } catch (e) {
        if (e && e.data) {
          this.$alert(e.data, '提示', {
            confirmButtonText: '确定',
          })
        }
      }
      item.loading = false
    },
    goDetail(name) {
      this.$router.push({
        path: '/project_detail',
        query: {
          name
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-box{
  position: relative;
  padding: 16px;
  .addButton{
    position: absolute;
    right: 30px;
    bottom: 200px;
    cursor: pointer;
    img{
      width: 40px;
    }
  }
  .project-list{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .project-item{
    width: 150px;
    margin: 30px;
    height: 150px;
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    &:hover{
      //border: 1px solid dodgerblue;
      box-shadow: 2px 2px 8px hsl(0deg 0% 9% / 20%), -2px -2px 12px hsl(0deg 0% 9% / 20%);
      .item-bottom{
        bottom: 0;
      }
    }
    .project-name{
      font-size: 18px;
      //border-bottom: 1px solid #999;
      line-height: 30px;
      font-weight: 600;
    }
    .icon-overview{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 12px 12px 0;
      .icon-item{
        width: 35%;
        margin-bottom: 16px;
        //font-size: 32px;
        span{
          font-size: 30px;
          color: #666
        }
      }
    }
    .item-bottom{
      position: absolute;
      bottom: -35px;
      width: 100%;
      display: flex;
      transition: all 0.3s;
      background-color: rgba(60, 60, 60, 0.8);
      .item-button{
        flex: 1;
        font-size: 12px;
        line-height: 30px;
        color: #ddd;
        &:hover{
          color: #FFF;
          font-weight: 600;
        }
      }
      .item-button+.item-button{
        border-left: 1px solid #999;
      }
    }
  }
}
</style>
