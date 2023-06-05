<template>
  <router-view></router-view>
</template>

<script>
// import list from './components/list.vue'
// import myHeader from './components/header'
// import upload from './components/upload'
// import {login} from "./api/user";

export default {
  name: 'App',
  components: {
    // list,
    // myHeader,
    // upload
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  watch: {
    isLogin(n) {
      if (!n) {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    // this.login()
    window.addEventListener('resize', this.setSize)
    this.setSize()
  },
  unmounted() {
    window.removeEventListener('resize', this.setSize)
  },
  methods: {
    login() {
      // login({
      //   username: 'tiansc',
      //   password: 'tianSHI0402'
      // })
    },
    setSize() {
      if (window) {
        this.$store.commit('setWidth', window.innerWidth)
        this.$store.commit('setHeight', window.innerHeight)
      }
    }
  }
}
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.button{
  padding: 2px 8px;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #999;
  cursor: pointer;
}
.button:hover{
  opacity: 0.8;
}
.not-overflow{
  overflow: hidden;
}
.container{
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8f8f8;
}
.header{
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.page-box{
  flex-grow: 1;
  overflow: auto;
}
</style>
