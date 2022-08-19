import { defineStore } from 'pinia'

export const useStore = defineStore('app.skin.brief', {
  state: () => {
    return {
      menuIsCollapse: false,
    }
  },
  actions: {
    //切换菜单折叠状态
    toggleMenuCollapse() {
      this.menuIsCollapse = !this.menuIsCollapse
    },
  },
})
