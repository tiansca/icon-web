<template>
 <div style="margin: 0 auto; padding-top: 200px; width: 500px;">
   <el-input style="margin-bottom: 16px" placeholder="请输入用户名" v-model="name" type="text"></el-input>
   <el-input placeholder="请输入密码" v-model="password" type="password" @keydown.enter="login"></el-input>
   <el-button :disabled="!password" style="margin-top: 16px;" type="primary" @click="login">确定</el-button>
 </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      password: '',
      name: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {name: this.name, password: this.password})
        // localStorage.setItem('icon_password', this.password)
        this.$router.push({
          path: '/'
        })
        console.log(1)
      } catch (e) {
        console.log(2)
        this.$alert('登录失败')
      }

    }
  }
}
</script>

<style scoped>

</style>
