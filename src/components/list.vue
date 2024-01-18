<template>
  <div class="container">
    <div class="header">
      <span class="left"></span>
      <span>图标库</span>
      <div class="right">
        <el-dropdown @command="menuClick">
        <span class="el-dropdown-link">
          {{ userName }}
          <img src="../assets/arrow-down.png">
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="doc">文档</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="page-box">
      <div class="addButton" title="新建项目" @click="openAddProject">
        <img src="../assets/add.png" alt="">
      </div>
      <div class="project-list">
        <div v-loading="item.loading" class="project-item" v-for="item in list" :key="item.name" @click="goDetail(item.name)">
          <div class="project-name" :title="item.name">
            {{item.name}}
          </div>
          <div>
            <div v-if="item.model === 'css'" class="icon-overview">
              <div v-for="icon in item.iconList" :key="icon" class="icon-item">
                <span :class="icon"></span>
              </div>
            </div>
            <div v-else class="icon-overview">
              <div v-for="icon in item.iconList" :key="icon" class="icon-item">
                <svg-icon :icon-name="icon"></svg-icon>
              </div>
            </div>
            <div v-if="!item.iconList || item.iconList.length === 0" style="width: 100%">暂无图标</div>
            <div class="icon-item hide">
              <span></span>
            </div>
          </div>
          <div class="item-bottom">
            <div v-if="userRole === 'admin'" class="item-button" @click.stop="deleteProject(item.name)">删除</div>
            <div class="item-button" @click.stop="updateProject(item.name)">重命名</div>
            <div class="item-button" @click.stop="createIcon(item)">更新</div>
          </div>
        </div>
        <div v-if="list.length === 0" style="margin-top: 30px; text-align: center;width: 100%">暂无数据</div>
      </div>
    </div>
    <SvgIcon icon-name="test_color-user"></SvgIcon>
    <el-dialog v-model="addProjectVisible" title="新建项目" width="500px">
      <el-form :model="addProjectForm" label-width="120px">
        <el-form-item label="项目名称">
          <el-input v-model="addProjectForm.name" />
        </el-form-item>
        <el-form-item label="去除颜色" style="text-align: left">
          <el-switch v-model="addProjectForm.removeColor" @change="removeColorChange" />
        </el-form-item>
        <el-form-item label="模式" style="text-align: left">
          <el-radio-group v-model="addProjectForm.model" :disabled="!addProjectForm.removeColor" class="ml-4">
            <el-radio label="js" size="large">js(svg symbols)</el-radio>
            <el-radio label="css" size="large">css(font icon)</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addProjectVisible = false">取消</el-button>
        <el-button type="primary" @click="addProject">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onMounted, reactive, watch} from "vue"
import {getProjects, deleteProject, addProject, updateProject} from "../api/project";
import {createIcon} from '../api/icon'
import Bus from '../utils/bus.js'
import insertCss from "../utils/insertCss";
import SvgIcon from "@/components/svgIcon.vue";
import insertJs from "@/utils/insertJs";

export default {
  name: 'list',
  components: {SvgIcon},
  setup() {
    const getList = async () => {
      Bus.$emit('loadingShow')
      try {
        const {data} = await getProjects()
        state.list = data.map(item => {
          item.iconList = item.iconList.slice(0, 4)
          return item
        })
        const cssList = state.list.filter(item => {
          return item.model === 'css'
        })
        const jsList = state.list.filter(item => {
          return item.model === 'js'
        })
        insertCss(cssList)
        insertJs(jsList)
        console.log('getList')
      } catch (e) {
        console.log(e)
      }
      Bus.$emit('loadingHide')
    }
    const state = reactive({
      list: [],
      // deleteProject,
      getList,
      addProjectForm: {
        name: '',
        removeColor: true,
        model: 'css' // css、js,保留颜色时只能是js
      },
      addProjectVisible: false
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
  computed: {
    userName() {
      return this.$store.getters.userName || '用户'
    },
    userRole() {
      return this.$store.getters.userRole || ''
    }
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
    openAddProject() {
      this.addProjectForm.name = ''
      this.addProjectForm.removeColor = true
      this.addProjectForm.model = 'css'
      this.addProjectVisible = true
    },
    async addProject() {
      try {
        // 名称只能是英文开头
        const  reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
        if (reg.test(this.addProjectForm.name)) {
          await addProject(this.addProjectForm)
          this.getList()
          this.addProjectVisible = false
        } else {
          this.$alert('名称不能为空，只能包含英文和数字且必须以英文字母开头', '提示', {
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
        // 名称只能是英文开头
        const  reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
        if (reg.test(res.value)) {
          await updateProject({
            name: name,
            new_name: res.value
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
          item.jsUrl = data.jsUrl
          if (item.model === 'css') {
            insertCss([item])
          } else {
            insertJs([item])
          }
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
    },
    async menuClick(e) {
      if (e === 'logout') {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } else if (e === 'doc') {
        this.$router.push('doc')
      }
    },
    removeColorChange(e) {
      // console.log(e)
      if (!e) {
        this.addProjectForm.model = 'js'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header .right{
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 16px;
  text-align: right;
  max-width: 150px;
}
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
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon-overview{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 12px 12px 0;
      .icon-item{
        font-size: 30px;
        width: 35%;
        margin-bottom: 16px;
        color: #666;
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
