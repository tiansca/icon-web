<template>
  <div style="margin: 0 auto; padding-top: 200px; width: 500px;">
    <el-input
      v-model="name"
      style="margin-bottom: 16px"
      placeholder="请输入用户名"
      type="text"
    />
    <el-input
      v-model="password"
      placeholder="请输入密码"
      type="password"
      @keydown.enter="login"
    />
    <el-button
      :disabled="!password"
      style="margin-top: 16px;"
      type="primary"
      @click="login"
    >
      确定
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
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
        console.log(e, 2)
        this.$alert(e.message || e.error || '登录失败', '提示', {
          type: 'error',
        })
      }

    }
  }
}
</script>

<style scoped>

</style>
