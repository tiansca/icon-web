<script setup>
import {computed, defineProps} from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})
const finalIconName = computed(() => {
  if (props.iconName && props.iconName.indexOf('#') === -1) {
    return `#${props.iconName}`
  }
  return props.iconName
})
</script>

<template>
<svg class="svg-icon" :class="className">
  <use :xlink:href="finalIconName" width="1em" height="1em"></use>
</svg>
</template>

<style scoped>
.svg-icon{
  height: 1em;
  width: 1em;
}
</style>
