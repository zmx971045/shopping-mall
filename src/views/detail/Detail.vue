<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

  import {getDetailData} from 'network/detail'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      // 1.将动态路由中的iid进行保存(因为他是一个局部变量，我们必须将它进行保存)
      this.iid = this.$route.params.iid

      // 2.根据iid请求不同商品的数据
      getDetailData(this.iid).then((res) => {
        // 1.获取顶部轮播图的图片数据
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
      }).catch((err) => {
        
      });
    }
  }

</script>

<style scoped>
  
</style>