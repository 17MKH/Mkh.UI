import { ref } from 'vue'

export default function (emit) {
  const isFullscreen = ref(false)

  const openFullscreen = () => {
    isFullscreen.value = true
    emit('fullscreen-change', isFullscreen)
  }

  const closeFullscreen = () => {
    isFullscreen.value = false
    emit('fullscreen-change', isFullscreen)
  }

  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    emit('fullscreen-change', isFullscreen)
  }

  return {
    isFullscreen,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
  }
}
