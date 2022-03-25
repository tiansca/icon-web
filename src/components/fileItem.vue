<template>
  <div ref="fileItem" class="file-item" @click="clickItem">
    <div class="file-icon" :class="{img: file.type === 'image', folder: file.type === 'folder'}" :style="backgroundStyle" @touchstart.prevent></div>
    <div class="file-icon mask" style="position: absolute" :class="{img: file.type === 'image', folder: file.type === 'folder'}"></div>
    <div class="file-name" :title="file.name">{{file.name}}</div>
    <div class="file-info" v-if="file.type !== 'folder'" :title="`${file.time} ${file.sizeText}`">
      <span>{{file.time}}</span>
      <span style="margin-left: 4px">{{file.sizeText}}</span>
    </div>
  </div>
</template>

<script>
import isNotInView from "../utils/isNotInView";
export default {
  name: "fileItem",
  props: {
    file: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      imageMap: {
        file: require('../assets/file.png'),
        music: require('../assets/music.png'),
        video: require('../assets/video.png'),
        folder: require('../assets/folder.png')
      },
      scrollTimer: null,
      inView: false
    }
  },
  computed: {
    backgroundStyle() {
      let url = ''
      let isImg = false
      if (this.file && this.file.type && this.imageMap[this.file.type]) {
        url = this.imageMap[this.file.type]
      }
      if (this.file && this.file.previewLink && this.inView) {
        url = encodeURI(this.file.previewLink)
        isImg = true
      }
      return {
        backgroundImage: `url(${url})`,
        backgroundColor: isImg ? 'rgba(0, 0, 0, 0.2)' : 'none'
      }
    },
    windowWidth() {
      return this.$store.state.width
    }
  },
  watch: {
    windowWidth() {
      this.checkPosition()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkPosition()
    })
    this.$bus.$on('scroll', this.checkPosition)
  },
  unmounted() {
    this.$bus.$off('scroll', this.checkPosition)
  },
  methods: {
    clickItem() {
      this.$emit('clickItem', this.file)
    },
    checkPosition() {
      if (this.inView) {
        return
      }
      if(this.scrollTimer) {
        clearTimeout(this.scrollTimer)
      }
      // console.log(isNotInView(this.$refs.fileItem))
      this.scrollTimer = setTimeout(() => {
        this.inView = !isNotInView(this.$refs.fileItem)
      }, 100)
    }
  }
}
</script>

<style scoped>
.file-item{
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 3px;
  cursor: pointer;
  user-select: none;
  /*-webkit-touch-callout: none;*/
  /*pointer-events: none;*/
}
.file-icon{
  width: 80px;
  height: 80px;
  background-size: 80% 100%;
  background-position: center;
  background-repeat: no-repeat;
  user-select: none;
  -webkit-touch-callout: none;
  pointer-events: none;
  /*margin-bottom: -10%;*/
}
/*.file-icon.mask{*/
/*  background: red;*/
/*}*/
.file-icon.img{
  width: 100px;
  background-size: cover;
  margin-bottom: 0;
}
.file-icon.folder{
  background-size: 90% 80%;
  background-position: center bottom;
}
.file-name{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 14px;
  margin: 4px 0;
  user-select: none;
}
.file-info{
  font-size: 12px;
  color: #999;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media all and (max-device-width: 500px) {
  .file-item{
    width: 30%;
  }
}
</style>
