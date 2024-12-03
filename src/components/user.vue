<template>
  <div class="container">
    <div class="header">
      <span class="left">
        <el-button @click="goHome">首页</el-button>
      </span>
      <span>用户管理</span>
      <div class="right">
        <el-dropdown @command="menuClick">
          <span class="el-dropdown-link">
            {{ userName }}
            <img src="../assets/arrow-down.png">
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="icon">
                图标库
              </el-dropdown-item>
              <el-dropdown-item command="doc">
                文档
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="page-box">
      <div style="margin: 0 0 8px; text-align: left">
        <el-button
          type="primary"
          @click="openAddProject"
        >
          新增用户
        </el-button>
      </div>
      <el-table
        :data="list"
        style="width: 100%"
        border
      >
        <el-table-column
          label="序号"
          type="index"
          width="60"
          prop="index"
        />
        <el-table-column
          prop="name"
          label="用户名"
          width="240"
        />
        <el-table-column
          prop="role"
          label="用户角色"
          width="120"
        >
          <template #default="scope">
            {{ scope.row.role === 'admin' ? '管理员' : '开发者' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
        >
          <template #default="scope">
            <el-button
              type="primary"
              plain
              size="small"
              :disabled="scope.row.name === 'admin' && userName !== 'admin'"
              @click="openEditProject(scope.row)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              plain
              size="small"
              :disabled="scope.row.name === 'admin'"
              @click="deleteProject(scope.row.name)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="addUserVisible"
      :title="dialogTitle"
      width="500px"
      :close-on-click-modal="false"
      @close="$refs.addUserFormRef.clearValidate()"
    >
      <el-form
        ref="addUserFormRef"
        :model="addUserForm"
        label-width="120px"
        :rules="rules"
        style="padding-right: 50px"
      >
        <el-form-item
          label="用户名称"
          prop="name"
        >
          <el-input
            v-model="addUserForm.name"
            :disabled="addUserForm.name === 'admin'"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          label="用户密码"
          style="text-align: left"
          prop="password"
        >
          <el-input
            v-model="addUserForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item
          label="用户角色"
          style="text-align: left"
        >
          <el-radio-group
            v-model="addUserForm.role"
            :disabled="addUserForm.name === 'admin'"
          >
            <el-radio
              value="admin"
              size="large"
            >
              管理员
            </el-radio>
            <el-radio
              value="dev"
              size="large"
            >
              开发者
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addUserVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogConfirmHandler"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue"
import {addUser, getUserList, deleteUser, updateUser} from "../api/project";
import Bus from '../utils/bus.js'

export default {
  name: 'User',
  setup() {
    const getList = async () => {
      Bus.$emit('loadingShow')
      try {
        const {data} = await getUserList()
        console.log('getList', data)
        state.list = data
      } catch (e) {
        console.log(e)
        state.list = []
      }
      Bus.$emit('loadingHide')
    }
    const state = reactive({
      list: [],
      // deleteProject,
      getList,
      addUserForm: {
        name: '',
        password: '',
        role: 'dev' // css、js,保留颜色时只能是js
      },
      addUserVisible: false,
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ]
      },
      dialogTitle: '新增用户'
    })
    onMounted(() => {
      getList()
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
    async deleteProject(name) {
      try {
        await this.$confirm(`确定删除用户“${name}”吗？`, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
      } catch (e) {
        console.log(e)
        return
      }
      try {
        await deleteUser({
          name
        })
        this.getList()
      } catch (e) {
        this.$alert(e && e.code === -1 ? e.data : '删除失败', {
          confirmButtonText: '确定',
        })
      }
    },
    async dialogConfirmHandler() {
      await this.$refs.addUserFormRef.validate()
      try {
        if (this.dialogTitle === '新增用户') {
          await this.addProjectHandler()
        } else {
          await this.updateProjectHandler()
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
    openAddProject() {
      this.addUserForm.name = ''
      this.addUserForm.password = ''
      this.addUserForm.role = 'dev'
      this.dialogTitle = '新增用户'
      this.addUserVisible = true
    },
    async addProjectHandler() {
      try {
        await addUser(this.addUserForm)
        this.getList()
        this.addUserVisible = false

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
    openEditProject(obj) {
      this.addUserForm = { ...obj }
      this.dialogTitle = '修改用户'
      this.addUserVisible = true
    },
    async updateProjectHandler() {
      try {
        // 提示
        await this.$confirm(`确定修改用户“${this.addUserForm.name}”信息吗？`, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
        await updateUser(this.addUserForm)
        this.getList()
        this.addUserVisible = false
      } catch (e) {
        console.log(e)
        if (e && e.code === -1) {
          this.$alert(e.data, '提示', {
            confirmButtonText: '确定',
          })
        }
      }
    },
    async menuClick(e) {
      if (e === 'logout') {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } else if (e === 'doc') {
        this.$router.push('doc')
      } else if (e === 'icon') {
        this.$router.push('/')
      }
    },
    goHome() {
      this.$router.push('/')
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
    position: fixed;
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
      padding: 0 8px
    }
    .icon-overview{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 12px 24px 0;
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
