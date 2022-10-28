<template>
 <div style="margin: 0 auto; padding-top: 200px; width: 500px;">
   <el-input placeholder="请输入密码" v-model="password" type="password"></el-input>
   <el-button :disabled="!password" style="margin-top: 16px;" type="primary" @click="login">确定</el-button>
 </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', this.password)
        localStorage.setItem('icon_password', this.password)
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