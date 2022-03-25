<template>
  <div class="domestic-loading" v-show="isShow">
    <div class="loading-wrap">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular">
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      isShow: false
    }
  },
  props: {
  },
  mounted() {
    this.$bus.$on('loadingShow', () => {
      this.show()
    })
    this.$bus.$on('loadingHide', () => {
      this.hide()
    })
  },
  beforeUnmount() {
    this.$bus.$off('loadingShow')
    this.$bus.$off('loadingHide')
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.domestic-loading{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: hsla(0,0%,100%,.2);
  z-index: 99999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.loading-wrap{
  width: 120px;
  height: 120px;
  position: fixed;
  z-index: 108;
  text-align: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}
.el-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.el-loading-spinner .circular {
  height: 42px;
  width: 42px;
  -webkit-animation: spinner 2s linear infinite;
  animation: spinner 2s linear infinite;
}
svg:not(:root) {
  overflow: hidden;
}
.el-loading-spinner .path {
  -webkit-animation: loading-dash 1.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
@-webkit-keyframes spinner {
  50% {
    -webkit-border-radius: 50%;
    -webkit-transform: scale(0.5) rotate(360deg);
    background-color: #2084e4;
  }
  100% {
    -webkit-transform: scale(1) rotate(720deg);
    background-color: #22aefe;
  }
}
@-moz-keyframes spinner {
  50% {
    -moz-border-radius: 50%;
    -moz-transform: scale(0.5) rotate(360deg);
    background-color: #2084e4;
  }
  100% {
    -moz-transform: scale(1) rotate(720deg);
    background-color: #22aefe;
  }
}
@-ms-keyframes spinner {
  50% {
    -ms-border-radius: 50%;
    -ms-transform: scale(0.5) rotate(360deg);
    background-color: #2084e4;
  }
  100% {
    -ms-transform: scale(1) rotate(720deg);
    background-color: #22aefe;
  }
}
@-o-keyframes spinner {
  50% {
    -o-border-radius: 50%;
    -o-transform: scale(0.5) rotate(360deg);
    background-color: #2084e4;
  }
  100% {
    -o-transform: scale(1) rotate(720deg);
    background-color: #22aefe;
  }
}
@keyframes spinner {
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
    background-color: #2084e4;
  }
  100% {
    transform: scale(1) rotate(720deg);
    background-color: #22aefe;
  }
}
/* animation shadow */
@-webkit-keyframes shadow {
  50% {
    -webkit-transform: scale(0.5);
    background-color: #322b27;
  }
}
@-moz-keyframes shadow {
  50% {
    -moz-transform: scale(0.5);
    background-color: #322b27;
  }
}
@-ms-keyframes shadow {
  50% {
    -ms-transform: scale(0.5);
    background-color: #322b27;
  }
}
@-o-keyframes shadow {
  50% {
    -o-transform: scale(0.5);
    background-color: #322b27;
  }
}
@keyframes shadow {
  50% {
    transform: scale(0.5);
    background-color: #322b27;
  }
}
/* animation text */
@-webkit-keyframes text {
  0% {
    -webkit-transform: scale(1, 1);
  }
  50% {
    -webkit-transform: scale(0.5, 0.5);
  }
  100% {
    -webkit-transform: scale(1, 1);
  }
}
@-moz-keyframes text {
  0% {
    -moz-transform: scale(1, 1);
  }
  50% {
    -moz-transform: scale(0.5, 0.5);
  }
  100% {
    -moz-transform: scale(1, 1);
  }
}
@-ms-keyframes text {
  0% {
    -ms-transform: scale(1, 1);
  }
  50% {
    -ms-transform: scale(0.5, 0.5);
  }
  100% {
    -ms-transform: scale(1, 1);
  }
}
@-o-keyframes text {
  0% {
    -o-transform: scale(1, 1);
  }
  50% {
    -o-transform: scale(0.5, 0.5);
  }
  100% {
    -o-transform: scale(1, 1);
  }
}
@keyframes text {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(0.5, 0.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
