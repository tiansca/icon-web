<script setup>

</script>

<template>
  <div class="content">
    <el-button
      type="primary"
      size="small"
      style="position: absolute;left: 16px;top: 24px"
      plain
      @click="$router.push('/')"
    >
      首页
    </el-button>
    <h2>使用指南</h2>
    <p>
      本项目是一个图标库的管理工具，上传svg图标，生成前端可用的font-icon图标和SVG symbols图标，具体来说，如果新建项目时选择保留颜色，则只能使用svg symbols的方式来展现图标，因为font icon不支持多色图标；相反，若新建项目时选择去除颜色，则可以自由切换使用js（svg symbols）或者css(font icon)。
    </p>
    <p>
      两者区别：svg symbols图标会保留原文件的颜色，适用于多色图标，使用时无法通过color来改变颜色。font icon图标不保留颜色，使用时可以通过color指定图标颜色。若想保留图标颜色，则只能用svg symbols模式；若不需要保留颜色，js和css两种方式都可以工作，但是需要注意的是两种模式下图标的表现可能不一致。
    </p>
    <p style="text-align: left">
      使用方式：
      <ul>
        <li style="text-align: left">
          svg symbols：在项目中引入js文件，在需要显示图标的地方使用以下代码：
          <pre>
           &lt;svg&gt;
             &lt;use xlink:href="#icon名称"&gt;&lt;/use&gt;
           &lt;/svg&gt;
         </pre>
        </li>
        <li style="text-align: left">
          css字体图标：在项目中引入css文件，在需要显示图标的地方使用以下代码：
          <pre>
           &lt;span class="icon名称"&gt;&lt;/span&gt;
         </pre>
        </li>
      </ul>
    </p>
    <p style="color: var(--el-color-danger)">
      生成图标时，有时会出现显示异常的现象（显示空白、图标部分缺失、显示为方块等），常见的原因有两个：
    </p>
    <p style="color: var(--el-color-danger)">
      1、svg中有使用stroke描边的形状。
    </p>
    <p style="color: var(--el-color-danger)">
      2、svg中有path以外的其他形状。
    </p>
    <p style="color: var(--el-color-danger)">
      如果图标显示异常可以重新上传有问题的图标，并勾选自动修复选项(保留颜色的项目不支持自动修复)，这时系统会尝试自动修复不符合svg规范的图标。若还是无法解决，请自行修改svg文件。
    </p>
  </div>
</template>

<style scoped>
.content{
  overflow: hidden;
  max-width: 1240px;
  margin: 0 auto;
}
p{
  text-align: left;
}
</style>
