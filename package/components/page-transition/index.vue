<template>
  <transition
    v-if="!disabled"
    :enter-active-class="`animated animate__${enterAnimate} page-toggle-enter-active`"
    :leave-active-class="`animated animate__${leaveAnimate} page-toggle-leave-active`"
  >
    <slot></slot>
  </transition>
  <div v-else><slot></slot></div>
</template>
<script setup>
import { computed } from 'vue'
import animates from './config.js'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  animate: {
    type: String,
    validator(value) {
      return animates.findIndex(item => item.name == value) != -1
    },
    default: 'bounce'
  },
  direction: {
    type: String,
    validator(value) {
      return (
        [
          'x',
          'y',
          'left',
          'right',
          'up',
          'down',
          'downLeft',
          'upRight',
          'downRight',
          'upLeft',
          'downBig',
          'upBig',
          'downLeft',
          'downRight',
          'topRight',
          'bottomLeft',
          'topLeft',
          'bottomRight',
          'default'
        ].indexOf(value) > -1
      )
    },
    default: 'default'
  },
  reverse: {
    type: Boolean,
    default: true
  }
})
const enterAnimate = computed(() => activeClass(false))
const leaveAnimate = computed(() => activeClass(true))
const activeClass = isLeave => {
  let animate = animates.find(item => props.animate == item.name)
  if (animate == undefined) {
    return ''
  }
  let direction = ''
  if (props.direction == undefined) {
    direction = animate.directions[0]
  } else {
    direction = animate.directions.find(item => item == props.direction)
  }
  direction = direction == undefined || direction === 'default' ? '' : direction
  if (direction != '') {
    direction = isLeave && props.reverse ? reversePosition(direction, animate.directions) : direction
    direction = direction[0].toUpperCase() + direction.substring(1)
  }
  let t = isLeave ? 'Out' : 'In'
  return animate.name + t + direction
}
const reversePosition = (direction, directions) => {
  if (direction.length == 0 || direction == 'x' || direction == 'y') {
    return direction
  }
  let index = directions.indexOf(direction)
  index = index % 2 == 1 ? index - 1 : index + 1
  return directions[index]
}
</script>
<script>
export default {
  name: 'PageTransition'
}
</script>
