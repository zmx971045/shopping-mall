import { debounce } from "./untils"


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.Refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('我是混入的内容');
    
  }
}