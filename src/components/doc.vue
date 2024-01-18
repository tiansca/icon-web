<script setup>

</script>

<template>
 <div class="content">
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
       <li style="text-align: left">svg symbols：在项目中引入js文件，在需要显示图标的地方使用以下代码：
         <pre>
           &lt;svg&gt;
             &lt;use xlink:href="#icon名称"&gt;&lt;/use&gt;
           &lt;/svg&gt;
         </pre>
       </li>
       <li style="text-align: left">css字体图标：在项目中引入css文件，在需要显示图标的地方使用以下代码：
         <pre>
           &lt;span class="icon名称"&gt;&lt;/span&gt;
         </pre>
       </li>
     </ul>
   </p>
   <p>
     生成图标时，有时会出现显示异常的现象，常见的原因是svg中有使用stroke描边的形状，可以尝试把描边转换为填充再重新上传。
   </p>
   <p>
     <a href="/svgFix.zip" target="_blank">svg描边转填充工具下载</a>
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
