<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 添加tabControl的吸顶效果 -->
    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabSticky" />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 这里我们是调用组件中的方法，我们要用到修饰符native，返回顶部才能够有效 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>

  </div>
  
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodList'
  import BackTop from 'components/content/backTop/BackTop'

  import FeatureView from './childComps/FeatureView'
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView'

  import {getHomeMultidata, getHomeGoods} from 'network/home';

  import {debounce} from 'common/untils'
  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        isTabSticky: false,
        tabOffsetTop: 0

      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
      
    },
    // destroyed() {
    //   console.log('home destroyed');       
    // },
    // better-Scroll现在内部可以保存切换之前的状态，所以这里这一段代码不再需要了
    // activated() {
    //   this.$refs.scroll.scrollTo(0, this.saveY, 0)
    //   this.$refs.scroll.refresh()
    // },
    // deactivated() {
    //   this.saveY = this.$refs.scroll.getScrollY()
    // },
    created() {
      // 1.在组件在进行创建的时候就去发送请求，请求多条数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 任务频繁触发情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行
      // 图片加载完成之后的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
        // console.log('-----');
        /**
         * 在这里我们会发现，这里refresh函数调用的异常频繁
         * 我们每次从服务器拿到一张图片，都要refresh一次，一页中共有30条数据
         * 那么我们就要refresh30次，这样会给我们的服务器带来很大的压力
         * 显然，我们这样去调用这个方法是很不合理的
         * 那么，我们应该怎么去解决这个问题呢？
         * 使用防抖函数debounce！
         */
      })
    },
    methods: {
      /**
       * 事件监听的相关事件
       */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      /**
       * 以下两个方法都是用来在项目中返回顶部的方法
       */
      contentScroll(position) {
        // 1.判断BackTop在什么位置进行显示
        this.isShowBackTop = (-position.y) > 1000 

        // 2.决定TabControl在什么位置是否为吸顶(position: fixed)
        this.isTabSticky = (-position.y) > this.tabOffsetTop
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      // 该方法是用来请求下一页的数据的
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()

          // this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    /* position: sticky;
    top: 44px; */
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>