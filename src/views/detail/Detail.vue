<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" @load="contentScroll(position)">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" @load="imgLoad"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodList'

  import {debounce} from 'common/untils'
  import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        getThemeTopY: null
      }
    },
    // mixins: [itemListenerMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    created() {
      // 1.将动态路由中的iid进行保存(因为他是一个局部变量，我们必须将它进行保存)
      this.iid = this.$route.params.iid

      // 2.根据iid请求不同商品的数据
      getDetailData(this.iid).then((res) => {
        // 1.获取顶部轮播图的图片数据
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取商店信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详情信息（图片，描述...）
        this.detailInfo = data.detailInfo

        // 5.获取商品参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // 7. 获取detail-nav-bar的四个item的offSetTop的值
        // this.$nextTick(() => {
        //   this.themeTopY = []
        //   this.themeTopY.push(0)
        //   this.themeTopY.push(this.$refs.params.$el.offSetTop)
        //   this.themeTopY.push(this.$refs.comment.$el.offSetTop)
        //   this.themeTopY.push(this.$refs.recommend.$el.offSetTop)

        //   console.log(this.themeTopY);
          
        // })

      })

      // 3.获取商品推荐数据
      getRecommend().then((res) => {
        console.log(res);
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值(对给this.themeTopY进行防抖操作)
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.$refs.recommend.$el.offsetTop);
        
        console.log(this.themeTopY);
      }, 100)
    },
    // mounted() {

    // },
    // destroyed() {
    //   this.$bus.$off('itemImgLoad', this.itemImgListener)
    // },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      imgLoad() {
        this.$refs.scroll.refresh()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
      },
      contentScroll(position) {
        console.log(position);
        
      }
    }
  }

</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff; 
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 8;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>