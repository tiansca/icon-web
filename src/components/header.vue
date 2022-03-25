<template>
  <div class="header">
    <div class="path">
      <span class="path-item" v-for="(item, index) in pathArr" :key="index">
        <span v-show="index !== 0">/</span>
        <span class="path-item-text" @click="pathClick(item)">{{item.name}}</span>
      </span>
    </div>
    <div class="menu">
      <span class="add-icon">＋</span>
      <div class="menu-box">
        <div @click="openUpload">上传文件</div>
        <div @click="openAdd">新建目录</div>
        <div @click="openUploadPage">上传列表</div>
      </div>
    </div>
    <div class="button logout" @click="logout">退出</div>
    <input id="uploadInput" type="file" multiple style="display: none" @change="uploadFile">
    <el-dialog
        title="新建目录"
        v-model="dialogVisible"
        width="300px">
      <div style="display: flex;align-items: center">
        <span style="white-space: nowrap;">名称：</span>
        <el-input ref="myInput" size="small" v-model="folderName"></el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFolder">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {mkdir} from "../api/file";
import { ref,onMounted } from 'vue'
export default {
    name: "header",
    data() {
      return {
        dialogVisible: false,
        folderName: ''
      }
    },
    setup(){
      let myInput = ref(null);
      onMounted(()=>{
        console.log(myInput.value)
      });
      return {myInput}
    },
    computed: {
      userName() {
        return this.$store.getters.userName
      },
      path() {
        return this.$store.state.path
      },
      pathArr() {
        if (!this.path) {
          return ''
        }
        const pathArr = this.path.split('/')
        let pathStr = ''
        for (const index in pathArr) {
          const name = pathArr[index]
          if (index == 0) {
            pathStr = `${name}`
          } else {
            pathStr = `${pathStr}/${name}`
          }
          pathArr[index] = {
            name: name,
            path: pathStr
          }
        }
        // if (pathArr.length > 3) {
        //   return pathArr.slice(-3)
        // }
        return pathArr
      }
    },
    watch: {
      '$route':{
        handler(to) {
          if (to.query.path && to.query.path !== this.path) {
            this.$store.commit('setPath', to.query.path)
          }
        },
        immediate: true
      },
      path: {
        handler(n) {
          if (n) {
            const query = JSON.parse(JSON.stringify(this.$route.query))
            query.path = n
            this.$router.push({ path: this.$route.path, query })
          }
        },
        immediate: true
      }
    },
    methods: {
      pathClick(path) {
        console.log(path)
        this.$store.commit('setPath', path.path)
      },
      async logout() {
        try {
          await this.$store.dispatch('logout')
          location.reload()
        } catch (e) {
          console.log(e)
        }
      },
      openUpload() {
        const input = document.querySelector('#uploadInput')
        input.click()
      },
      uploadFile() {
        const input = document.querySelector('#uploadInput')
        console.log(input.files)
        if (input && input.files && input.files.length > 0) {
          this.$bus.$emit('upload', input.files)
        }
        input.value = ''
      },
      openUploadPage() {
        this.$bus.$emit('showUpload')
      },
      openAdd() {
        this.folderName = ''
        this.dialogVisible = true
        this.$nextTick(() => {
          this.myInput.focus()
        })
      },
      async addFolder() {
        if (!this.folderName) {
          this.$alert('名称不能为空')
          return
        }
        if(this.folderName.length > 20) {
          this.$alert('名称过长，最多20个字符')
          return
        }
        this.$bus.$emit('loadingShow')
        try {
          await mkdir({
            path: `${this.path}/${this.folderName}/`
          })
          this.$bus.$emit('refresh', {path: this.path})
        } catch (e) {
          this.$alert(e || '创建失败')
        }
        this.$bus.$emit('loadingHide')
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>
.header{
  /*border-bottom: 1px solid #999;*/
  box-shadow: 0 1px 6px -3px #999;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
}
.path-item-text{
  padding: 0 8px;
  cursor: pointer;
}
.path-item-text:hover{
  color: #4e6ef2;
}
.path{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  margin-right: 40px;
  line-height: 20px;
}
.menu{
  position: absolute;
  right: 70px;
  height: 40px;
  top: 6px;
}
.add-icon{
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  padding: 0 10px;
}
.menu-box{
  display: none;
  position: absolute;
  top: 40px;
  width: 80px;
  right: -20px;
  /*border: 1px solid #999;*/
  box-shadow: 0 0 1px 0 #999;
  padding: 3px;
  background: #fff;
}
.menu-box>div{
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}
.menu-box>div:hover{
  /*opacity: 0.8;*/
  transform: scale(1.1);
}
.menu:hover>.menu-box{
  display: block;
}
.logout{
  flex-shrink: 0;
  flex-wrap: nowrap;
}
/deep/ .el-input{
  width: auto;
  min-width: 100px;
  flex-grow: 1;
}
</style>
