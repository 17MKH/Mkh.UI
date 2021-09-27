<template>
  <m-container> </m-container>
</template>
<script>
import { useMessage } from '../../../../package/composables'
export default {
  setup() {
    const message = useMessage()
    const handleMore = () => {
      message.success('点击了更多')
    }
    return {
      handleMore,
    }
  },
}
</script>
