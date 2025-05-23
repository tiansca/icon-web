<script setup>
  import router from "@/router";
  import {computed, onMounted} from "vue";
  import {store} from "@/store";

  const permissions = computed(() => store.state.user.permissions)

  onMounted(() => {
    console.log(permissions.value)
    if (permissions.value.find && permissions.value.find(item => item.type === 1 && item.key === 'icon')) {
      // 有权限
      router.push('/')
    }
  })
</script>

<template>
  <div class="page-wrap">
    <div class="container">
      <h1>403</h1>
      <h2>禁止访问</h2>
      <p>抱歉，您没有权限查看此页面。</p>
      <p>请检查您的账户权限或联系管理员获取帮助。</p>
    </div>
  </div>
</template>

<style scoped>
 .page-wrap {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
    color: #343a40;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    overflow: hidden;
  }
  .container {
    max-width: 600px;
    padding: 2rem;
  }
  h1 {
    font-size: 5rem;
    margin: 0;
    color: #dc3545;
  }
  h2 {
    margin-top: 0;
    font-weight: normal;
  }
  p {
    margin-bottom: 2rem;
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 3rem;
    }
  }
</style>