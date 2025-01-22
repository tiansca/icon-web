<template>
  <div class="container">
    <div class="header">
      <div style="width: 220px">
        <el-button
          size="small"
          @click="$router.back()"
        >
          返回
        </el-button>
      </div>
      <span>图标预览-{{ name }}</span>
      <div style="width: 220px;display: flex;align-items: center;justify-content: flex-end">
        <input
          ref="input"
          type="file"
          multiple
          style="display:none"
          accept="image/svg+xml"
          @change="upload"
        >
        <el-button
          type="primary"
          size="small"
          style="margin-right: 16px"
          @click="selectFiles"
        >
          上传svg
        </el-button>
        <el-dropdown @command="menuClick">
          <span class="el-dropdown-link">
            {{ userName }}
            <img src="../assets/arrow-down.png">
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-if="userRole === 'admin'"
                command="user"
              >
                用户管理
              </el-dropdown-item>
              <el-dropdown-item command="doc">
                文档
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="page-box">
      <div
        v-if="list.length > 0"
        class="link-info"
      >
        <div
          v-if="model === 'css'"
          style="flex-grow: 1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis"
        >
          css链接：<a
            :href="`${cssLink}${cssUrl}`"
            target="_block"
          >{{ cssLink.indexOf("http") !== -1 ? `${cssLink}${cssUrl}` :`${origin}${cssLink}${cssUrl}` }}</a>
          <span style="color: #999;margin-left: 20px;font-size: 12px">{{ removeColor ? '去除颜色' : '保留颜色' }}</span>
        </div>
        <div
          v-else
          style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis"
        >
          js链接：<a
            :href="`${cssLink}${jsUrl}`"
            target="_block"
          >{{ cssLink.indexOf("http") !== -1 ? `${cssLink}${jsUrl}` : `${origin}${cssLink}${jsUrl}` }}</a>
          <span style="color: #999;margin-left: 20px;font-size: 12px">{{ removeColor ? '去除颜色' : '保留颜色' }}</span>
        </div>
        <div
          v-show="removeColor"
          class="right-button"
        >
          <span style="margin-right: 8px">模式:</span>
          <el-radio-group
            v-model="model"
            @change="modelChange"
          >
            <el-radio
              value="js"
              size="large"
            >
              js(svg symbols)
            </el-radio>
            <el-radio
              value="css"
              size="large"
            >
              css(font icon)
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="list.length > 0">
        <div
          v-if="model === 'css'"
          class="icon-wrap"
        >
          <div
            v-for="icon in list"
            :key="icon"
            class="icon-item"
          >
            <span
              class="icon"
              :class="icon"
            />
            <div class="icon-name">
              {{ icon }}
            </div>
            <div class="mask">
              <div
                v-if="userRole === 'admin'"
                class="delete-button button"
                title="删除图标"
                @click="deleteIcon(icon)"
              >
                <img
                  src="../assets/delete.png"
                  alt=""
                  title="删除图标"
                >
              </div>
              <div
                title="下载"
                class="download-button button"
                @click="downloadSvg(name, icon)"
              >
                <img
                  src="../assets/download.png"
                  alt="下载"
                  title="下载"
                >
              </div>
              <div
                title="复制名称"
                class="copy-button button"
                @click="copyClass(icon)"
              >
                <img
                  src="../assets/copy.png"
                  alt="复制名称"
                  title="复制名称"
                >
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="icon-wrap"
        >
          <div
            v-for="icon in list"
            :key="icon"
            class="icon-item"
          >
            <span class="icon" />
            <svg-icon
              style="font-size: 40px"
              :icon-name="icon"
            />
            <div class="icon-name">
              {{ icon }}
            </div>
            <div class="mask">
              <div
                v-if="userRole === 'admin'"
                class="delete-button button"
                title="删除图标"
                @click="deleteIcon(icon)"
              >
                <img
                  src="../assets/delete.png"
                  alt=""
                  title="删除图标"
                >
              </div>
              <div
                title="下载"
                class="download-button button"
                @click="openDownload(name, icon)"
              >
                <img
                  src="../assets/download.png"
                  alt="下载"
                  title="下载"
                >
              </div>
              <div
                title="复制名称"
                class="copy-button button"
                @click="copyClass(icon)"
              >
                <img
                  src="../assets/copy.png"
                  alt="复制名称"
                  title="复制名称"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="list.length === 0"
        style="margin-top: 30px"
      >
        暂无数据
      </div>
    </div>
    <el-dialog
      v-model="uploadDialogVisible"
      title="上传svg"
      width="800px"
    >
      <div>
        <div class="svg-list-box">
          <div
            v-for="item in uploadFiles"
            :key="item.name"
            class="svg-item"
          >
            <img
              :src="item.url"
              alt=""
              class="svg-image"
            >
            <span class="svg-name">{{ item.name }}</span>
          </div>
        </div>
        <div class="select-box">
          <span>上传方式：</span>
          <el-radio-group
            v-model="edit"
            :disabled="!removeColor"
            class="ml-4"
          >
            <el-radio
              :value="0"
              size="large"
            >
              上传原图
            </el-radio>
            <el-radio
              :value="1"
              size="large"
            >
              自动修复
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <template #footer>
        <div>
          <el-button @click="uploadCancelHandler">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="uploadConfirmHandler"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="downloadDialogVisible"
      title="下载"
      width="600px"
      class="download-dialog"
      :close-on-click-modal="false"
      :before-close="downloadClose"
    >
      <div class="download-box">
        <div
          ref="svgBox"
          v-loading="getSvgContentLoading"
          class="svg-box"
          v-html="svgContent"
        />
        <div class="download-setting">
          <div>
            <span>颜色：</span>
            <el-color-picker
              v-model="downloadColor"
              :predefine="predefineColors"
            />
          </div>
          <div>
            <span>大小：</span>
            <el-select v-model="downloadSize">
              <el-option
                label="16px"
                value="16"
              />
              <el-option
                label="24px"
                value="24"
              />
              <el-option
                label="32px"
                value="32"
              />
              <el-option
                label="48px"
                value="48"
              />
              <el-option
                label="64px"
                value="64"
              />
              <el-option
                label="128px"
                value="128"
              />
              <el-option
                label="256px"
                value="256"
              />
            </el-select>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button
          type="primary"
          plain
          @click="downloadSvg"
        >
          SVG下载
        </el-button>
        <el-button
          type="success"
          plain
          @click="downloadSvgAsPng"
        >
          PNG下载
        </el-button>
        <el-button
          type="warning"
          plain
          @click="copySvgCode"
        >
          复制SVG代码
        </el-button>
      </template>
    </el-dialog>
    <svg
      t="1733207817665"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4684"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      fill="#1296DB"
    ><path
      d="M512 720.004c-109.594 0-268.062-158.648-286.202-327.136a7.998 7.998 0 0 1 7.094-8.812c4.608-0.468 8.342 2.718 8.812 7.094 8.148 75.666 46.88 155.6 106.282 219.298 53.802 57.714 116.65 93.556 164.014 93.556 102.306 0 271.984-166.6 271.984-343.978 0-4.422 3.578-8 8-8a7.994 7.994 0 0 1 7.998 8c0 191.738-179.488 359.978-287.982 359.978z"
      fill="#1296DB"
      p-id="4685"
    /><path
      d="M951.972 1023.968H72.028c-4.422 0-8-3.578-8-8v-95.992c0-68.652 35.568-94.964 101.19-119.494 10.288-3.828 22.662-7.766 36.13-12.044 63.582-20.204 150.662-47.874 150.662-108.448 0-4.422 3.578-8 8-8s8 3.578 8 8c0 72.276-93.526 101.994-161.818 123.696-13.186 4.188-25.304 8.032-35.372 11.796-61.512 22.982-90.792 44.496-90.792 104.494v87.994h863.948v-87.994c0-56.466-26.404-78.122-75.106-98.34a8.004 8.004 0 0 1-4.328-10.452c1.704-4.078 6.406-6.032 10.454-4.328 52.464 21.764 84.978 48.28 84.978 113.12v95.992a8 8 0 0 1-8.002 8zM700.738 751.968a7.99 7.99 0 0 1-4.812-1.608c-26.498-19.954-39.934-43.624-39.934-70.372 0-4.422 3.578-8 7.998-8 4.422 0 8 3.578 8 8 0 21.748 10.968 40.592 33.56 57.59a8 8 0 0 1-4.812 14.39z"
      fill="#1296DB"
      p-id="4686"
    /><path
      d="M360.01 687.988c-4.422 0-8-3.576-8-7.998v-46.014c0-4.422 3.578-8 8-8s8 3.578 8 8v46.014a7.994 7.994 0 0 1-8 7.998zM663.99 687.988a7.994 7.994 0 0 1-7.998-7.998V633.96c0-4.422 3.578-8 7.998-8 4.422 0 8 3.578 8 8v46.03a7.994 7.994 0 0 1-8 7.998zM823.98 328.012a7.994 7.994 0 0 1-7.998-8C815.982 152.396 679.616 16.03 512 16.03S208.018 152.396 208.018 320.012c0 4.422-3.578 8-8 8-4.422 0-8-3.578-8-8 0-176.442 143.546-319.98 319.98-319.98 176.426 0 319.98 143.538 319.98 319.98a7.992 7.992 0 0 1-7.998 8zM264.008 543.998a7.95 7.95 0 0 1-4.79-1.594c-66.434-49.824-67.2-169.334-67.2-174.396a8 8 0 0 1 16 0c0 1.156 0.79 116.586 60.792 161.584a7.994 7.994 0 0 1 1.602 11.202 7.98 7.98 0 0 1-6.404 3.204z"
      fill="#1296DB"
      p-id="4687"
    /><path
      d="M200.012 376.008a7.994 7.994 0 0 1-7.828-6.39 7.992 7.992 0 0 1 6.218-9.436c277.78-57.326 505.648-283 507.93-285.28a8 8 0 1 1 11.312 11.312c-2.296 2.296-233.448 231.33-516.008 289.624a7.448 7.448 0 0 1-1.624 0.17z"
      fill="#1296DB"
      p-id="4688"
    /><path
      d="M823.652 345.448c-0.906 0-1.828-0.156-2.734-0.484-149.896-54.606-259.078-137.772-260.156-138.6a7.996 7.996 0 0 1-1.468-11.218 8.038 8.038 0 0 1 11.218-1.468c1.062 0.812 108.416 82.542 255.876 136.258a7.996 7.996 0 0 1-2.736 15.512zM512 911.976c-218.908 0-269.382-121.07-271.42-126.21a8.002 8.002 0 0 1 4.476-10.376c4.07-1.656 8.742 0.36 10.39 4.454 0.468 1.156 49.24 116.132 256.554 116.132 49.902 0 94.792-6.64 133.43-19.716 4.188-1.36 8.718 0.828 10.14 5.014a7.994 7.994 0 0 1-5.016 10.14c-40.278 13.64-86.902 20.562-138.554 20.562zM777.89 847.98a8.002 8.002 0 0 1-7.11-4.328 8.006 8.006 0 0 1 3.454-10.782l62.09-32.014c3.906-2.046 8.718-0.484 10.766 3.438a8.006 8.006 0 0 1-3.454 10.782l-62.09 32.014a7.79 7.79 0 0 1-3.656 0.89z"
      fill="#1296DB"
      p-id="4689"
    /><path
      d="M839.98 911.976c-4.422 0-8-3.578-8-8v-96.01c0-4.422 3.578-8 8-8s8 3.578 8 8v96.01c0 4.422-3.578 8-8 8z"
      fill="#1296DB"
      p-id="4690"
    /><path
      d="M839.98 911.976c-1.25 0-2.5-0.282-3.656-0.89l-62.09-32.03a8.008 8.008 0 0 1-3.454-10.782c2.016-3.922 6.86-5.484 10.766-3.438l62.09 32.03a8.008 8.008 0 0 1 3.454 10.782 8 8 0 0 1-7.11 4.328zM679.99 911.976a8.002 8.002 0 0 1-7.11-4.328 8.006 8.006 0 0 1 3.454-10.782l62.122-32.03c3.89-2.046 8.718-0.484 10.766 3.438a8.006 8.006 0 0 1-3.454 10.782l-62.122 32.03a7.79 7.79 0 0 1-3.656 0.89z"
      fill="#1296DB"
      p-id="4691"
    /><path
      d="M679.99 911.976c-4.422 0-8-3.578-8-8v-96.01c0-4.422 3.578-8 8-8s7.998 3.578 7.998 8v96.01c0 4.422-3.576 8-7.998 8z"
      fill="#1296DB"
      p-id="4692"
    /><path
      d="M742.08 847.964c-1.25 0-2.5-0.282-3.656-0.89l-62.09-31.998c-3.938-2.016-5.468-6.844-3.454-10.782a7.988 7.988 0 0 1 10.766-3.438l62.09 31.998c3.938 2.016 5.468 6.844 3.454 10.782a8.002 8.002 0 0 1-7.11 4.328z"
      fill="#1296DB"
      p-id="4693"
    /><path
      d="M759.984 887.96c-17.654 0-31.998-14.358-31.998-31.996 0-17.64 14.344-32 31.998-32 17.656 0 32 14.36 32 32s-14.344 31.996-32 31.996z m0-47.996c-8.81 0-15.998 7.172-15.998 16 0 8.826 7.188 15.998 15.998 15.998 8.812 0 16-7.172 16-15.998 0-8.828-7.188-16-16-16zM759.984 975.972a8 8 0 0 1-7.828-9.656c1.36-6.438 3.954-16 6.704-26.186 3.562-13.172 7.624-28.108 9.25-37.514 0.75-4.344 4.938-7.25 9.234-6.532a7.994 7.994 0 0 1 6.516 9.25c-1.75 10.14-5.718 24.794-9.562 38.982-2.656 9.842-5.172 19.076-6.484 25.31a7.996 7.996 0 0 1-7.83 6.346zM785.36 815.982a7.99 7.99 0 0 1-7.938-8.984c25.936-209.376 38.124-467.346 38.248-469.924 0.188-4.422 3.56-8 8.358-7.608a7.968 7.968 0 0 1 7.61 8.358c-0.124 2.578-12.312 261.14-38.342 471.144a7.994 7.994 0 0 1-7.936 7.014z"
      fill="#1296DB"
      p-id="4694"
    /><path
      d="M759.796 975.972a8 8 0 0 1-7.812-6.344c-1.294-6.124-3.716-15.188-6.31-24.874-3.844-14.344-7.812-29.186-9.562-39.42a7.994 7.994 0 0 1 6.532-9.25c4.39-0.734 8.5 2.188 9.216 6.532 1.64 9.532 5.688 24.654 9.266 38.014 2.672 9.998 5.172 19.358 6.516 25.686a8.014 8.014 0 0 1-7.846 9.656zM734.456 815.998c-4 0-7.436-2.968-7.936-7.016-6.968-56.326-13.578-121.026-19.624-192.316a7.996 7.996 0 0 1 7.282-8.64c4.532-0.282 8.282 2.89 8.656 7.296 6.03 71.09 12.624 135.586 19.56 191.692a7.99 7.99 0 0 1-7.938 8.984zM823.652 345.448h-0.14a8 8 0 0 1-7.858-8.156l0.328-17.436c0.094-4.406 3.904-8.61 8.154-7.844a8.008 8.008 0 0 1 7.844 8.156l-0.328 17.436a7.994 7.994 0 0 1-8 7.844zM200.02 376.008c-4.422 0-8-3.578-8-8v-47.998c0-4.422 3.578-8 8-8 4.42 0 8 3.578 8 8v47.998a7.998 7.998 0 0 1-8 8z"
      fill="#1296DB"
      p-id="4695"
    /><path
      d="M791.984 687.988a7.974 7.974 0 0 1-5.656-2.342l-63.996-63.996a8 8 0 0 1 11.31-11.312l63.996 63.996a8 8 0 0 1-5.654 13.654z"
      fill="#1296DB"
      p-id="4696"
    /><path
      d="M727.986 687.988a8 8 0 0 1-5.654-13.654l63.996-63.996a8 8 0 0 1 11.31 11.312l-63.996 63.996a7.97 7.97 0 0 1-5.656 2.342z"
      fill="#1296DB"
      p-id="4697"
    /><path
      d="M792.358 752.36a7.974 7.974 0 0 1-5.654-2.342l-64.372-64.372a8 8 0 0 1 11.31-11.312l64.372 64.372a8 8 0 0 1-5.656 13.654z"
      fill="#1296DB"
      p-id="4698"
    /><path
      d="M727.986 751.984a8 8 0 0 1-5.654-13.654l63.996-63.996a8 8 0 0 1 11.31 11.312l-63.996 63.996a7.962 7.962 0 0 1-5.656 2.342z"
      fill="#1296DB"
      p-id="4699"
    /><path
      d="M786.094 809.904a7.976 7.976 0 0 1-5.656-2.344l-58.106-58.106a8 8 0 0 1 11.31-11.312l58.108 58.106a8 8 0 0 1-5.656 13.656z"
      fill="#1296DB"
      p-id="4700"
    /><path
      d="M733.876 809.904a8 8 0 0 1-5.656-13.656l58.108-58.106a8 8 0 0 1 11.31 11.312l-58.106 58.106a7.964 7.964 0 0 1-5.656 2.344z"
      fill="#1296DB"
      p-id="4701"
    /></svg>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue"
import { useRoute } from 'vue-router';
import {getIconlist, upload, deleteIcon, updateModel} from '../api/icon'
import Bus from '../utils/bus.js'
import config from '@/config.js'
import insertCss from "../utils/insertCss";
import copy from '../utils/copyText'
import insertJs from "@/utils/insertJs";
import SvgIcon from "@/components/svgIcon.vue";
export default {
  name: "Detail",
  components: {SvgIcon},
  setup() {
    const getList = async () => {
      Bus.$emit('loadingShow')
      try {
        const {data} = await getIconlist({
          name: state.name
        })
        state.list = data.iconList
        state.cssUrl = data.cssUrl
        state.jsUrl = data.jsUrl
        state.removeColor = data.removeColor
        state.model = data.model
        console.log(state.list)
      } catch (e) {
        console.log(e)
      }
      Bus.$emit('loadingHide')
    }
    const state = reactive({
      list: [],
      // deleteProject,
      getList,
      name: '',
      baseUrl: config.baseUrl,
      cssLink: config.cssUrl,
      cssUrl: '',
      jsUrl: '',
      removeColor: true,
      model: 'css',
      origin: location.origin,
      uploadDialogVisible: false,
      uploadFiles: [],
      edit: 0,
      formData: null,
      downloadDialogVisible: false,
      svgContent: '',
      downloadColor: '',
      downloadSize: "",
      svgBox: null,
      predefineColors: ['#d81e06', '#f4ea2a', '#1afa29', '#1296db', '#13227a', '#d4237a', '#ffffff', '#e6e6e6', '#dbdbdb', '#cdcdcd', '#bfbfbf', '#8a8a8a', '#707070', '#515151', '#2c2c2c'],
      getSvgContentLoading: false,
      downloadFileName: ''
    })
    onMounted(async () => {
      const route = useRoute()
      if (route.query && route.query.name) {
        state.name = route.query.name
        await getList()
        if (state.model === 'css') {
            insertCss([{name: state.name, cssUrl: state.cssUrl}])
        } else {
            insertJs([{name: state.name, jsUrl: state.jsUrl}])
        }

      }
    })
    return state
  },
  computed: {
    userName() {
      return this.$store.getters.userName || '用户'
    },
    userRole() {
      return this.$store.getters.userRole || ''
    }
  },
  watch: {
    downloadColor(n) {
      if (n && this.svgContent) {
        const svgPathList = this.svgBox.querySelectorAll('svg, *[fill]')
        svgPathList.forEach(item => {
          item.setAttribute('fill', n)
        })
      }
    },
    downloadSize(n) {
      if (n && this.svgContent) {
        const svgDom = this.svgBox.querySelector('svg')
        if (svgDom) {
          svgDom.setAttribute('width', n)
          svgDom.setAttribute('height', n)
        }
      }
    }
  },
  methods: {
    selectFiles() {
      this.$refs.input.click()
    },
    async upload() {
      this.formData = new FormData();
      console.log(this.$refs.input)
      if (!this.$refs.input) {
        return
      }
      const files = this.$refs.input.files
      for (let i = 0; i < files.length; i++) {
        this.uploadFiles.push({
          url: URL.createObjectURL(files[i]),
          name: files[i].name
        })
      }
      this.formData.append('name', this.name);
      console.log(files)
      if (!files || files.length === 0) {
        console.log('文件为空')
        return
      }
      // 验重
      const filesArr = Array.from(files);
      const repeatFiles = filesArr.filter(item => {
        const nameArr = item.name.split('.')
        nameArr.pop()
        const itemName = `${this.name}-${nameArr.join('.')}`
        // console.log(itemName, this.list)
        return this.list.indexOf(itemName) !== -1
      })
      // console.log(repeatFiles)
      if (repeatFiles.length) {
        const repeatFileName = repeatFiles.map(item => {
          const nameArr = item.name.split('.')
          nameArr.pop()
          return nameArr.join('.')
        })
        await this.$confirm(`图标${repeatFileName.join('、')}已经存在，要继续上传并替换吗？`, '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
      }
      for (let a = 0; a < files.length; a++) {
        this.formData.append('files', files[a], files[a].name);
      }
      // 显示图片确认弹窗
      this.edit = 0
      this.uploadDialogVisible = true
    },
    async doUpload() {
      this.$bus.$emit('loadingShow')
      try {
        const {data} = await upload(this.formData)
        if (this.model === 'css') {
          insertCss([{name: this.name, cssUrl: this.cssUrl}])
        } else {
          insertJs([{name: this.name, jsUrl: this.jsUrl}])
        }

        this.list = data.classList
      } catch (e) {
        console.log(e)
      }
      this.$bus.$emit('loadingHide')
      this.$refs.input.value = ''
      this.uploadFiles = []
      this.uploadDialogVisible = false
    },
    uploadCancelHandler() {
      this.$refs.input.value = ''
      this.uploadFiles = []
      this.uploadDialogVisible = false
    },
    uploadConfirmHandler() {
      if (this.edit) {
        this.formData.append('edit', this.edit)
      }
      this.doUpload()
    },
    async deleteIcon(className) {
      try {
        await this.$confirm(`确定删除icon“${className}”吗？`, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
      } catch (e) {
        console.log(e)
        return
      }
      try {
        await deleteIcon({
          name: this.name,
          className
        })
        this.getList()
      } catch (e) {
        this.$alert(e && e.code === -1 ? e.data : '删除失败', {
          confirmButtonText: '确定',
        })
      }
    },
    openDownload(name, className) {
      this.downloadDialogVisible = true
      this.downloadFileName = className
      // 提示下载
      const fileName = className.replace(`${name}-`, '')
      let url = `${config.baseUrl}icons/${name}/${fileName}.svg`
      if (url.indexOf('http') === -1) {
        url = `${location.origin}${location.pathname}${url}`
        url = url.replace(/([^:]\/)\/+/g, '$1')
      }
      console.log(url)
      this.getSvgContentLoading = true
      // 获取url返回的svg内容
      fetch(url).then(res => {
        return res.text()
      }).then(svgContent => {
        console.log(svgContent)
        this.svgContent = svgContent
        // 设置默认大小和颜色
        this.$nextTick(() => {
          this.downloadSize = '128'
          // 设置颜色
          if (this.removeColor) {
            this.downloadColor = '#666'
          }
        })
      }).finally(() => {
        this.getSvgContentLoading = false
      })
    },
    downloadByUrl(url, name) {
      const a = document.createElement("a");
      a.href = url;
      a.download = name; // 设置导出的文件名为 "diagram.svg"
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // 释放对象URL资源
    },
    downloadSvg() {
      const blob = new Blob([this.svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      this.downloadByUrl(url, `${this.downloadFileName}.svg`)
    },
    downloadSvgAsPng() {
      const svg = this.svgBox.querySelector('svg')
      console.log(svg)
      if (!svg) {
        return
      }
      const dpr = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr);

      const { width, height } = svg.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr

      // svg 序列化为string：其实就是html代码文本
      const data = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      // svg string 转化为 base64
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        const url = canvas.toDataURL(`image/png`)
        console.log(url)
        this.downloadByUrl(url, `${this.downloadFileName}.png`)
      }
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`
      console.log(img.src)

    },
    copySvgCode() {
      copy(this.svgBox.innerHTML)
    },
    downloadClose(done) {
      this.svgContent = ''
      this.downloadColor = ''
      this.downloadSize = ''
      done()
    },
    copyClass(icon) {
      copy(icon)
    },
    async menuClick(e) {
      if (e === 'logout') {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } else if (e === 'doc') {
        this.$router.push('doc')
      } else if (e === 'user') {
        this.$router.push('/user')
      }
    },
    async modelChange(e) {
      console.log(e)
      try {
        await updateModel({
          name: this.name,
          model: e
        })
        location.reload()
      } catch (e) {
        this.$alert('切换失败', '提示', {
          type: 'error',
          confirmButtonText: '确定',
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  text-align: left;
}
.page-box{
  padding: 16px;
  .link-info{
    text-align: left;
    display: flex;
    justify-content: space-between;
    .right-button{
      display: flex;
      flex-shrink: 0;
      align-items: center;
      line-height: 14px;
      font-size: 14px;
    }
  }
  .icon-wrap{
    display: flex;
    margin-top: 30px;
    justify-content: flex-start;
    flex-wrap: wrap;
    .icon-item{
      padding: 20px 3px;
      margin: 16px 4px;
      width: 120px;
      position: relative;
      color: #666;
      span:first-of-type{
        font-size: 40px;
        color: #666
      }
      div{
        font-size: 16px;
        color: #333
      }
      .icon-name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        margin-top: 3px;
      }
      .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        align-items: center;
        justify-content: center;
        display: none;
        flex-direction: column;
        padding: 0;
        overflow: hidden;
        .button{
          flex-grow: 1;
          flex-shrink: 0;
          width: 100%;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            background: rgba(0, 0, 0, 0.6);
            opacity: 1;
          }
          img{
            width: 20px;
            padding: 3px 0;
          }
        }
      }
      &:hover{
        .icon{
          opacity: 0.6;
        }
        .icon-name{
          opacity: 0.6;
        }
        .mask{
          display: flex;
          cursor: pointer;
          width: 100%;
        }
      }
    }
  }
}

.svg-list-box{
  display: flex;
  flex-wrap: wrap;
  max-height: 60vh;
  overflow-y: auto;
  .svg-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 12px;
    .svg-image{
      width: 40px;
      height: 40px;
      margin-bottom: 8px;
    }
  }
}
.select-box{
  display: flex;
  justify-content: flex-start;
  margin: 12px 0;
  align-items: center;
}
.download-box{
  display: flex;
  .svg-box{
    width: 300px;
    height: 300px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.download-setting{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  &>div{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 150px;
    margin: 8px 12px;
    &>span{
      white-space: nowrap;
    }
  }
}

@media screen and (max-width: 600px) {
  .page-box .icon-wrap .icon-item{
    width: calc(33% - 5px)
  }
  .page-box .link-info{
    display: block;
  }
}
</style>
<style lang="scss">
.download-dialog{
  padding: 0;
  .el-dialog__header{
    border-bottom: 1px solid #eee;
    padding: 12px;
    text-align: left;
  }
  .el-dialog__body, .el-dialog__footer{
    padding: 12px;
    text-align: center;
  }
}
</style>
