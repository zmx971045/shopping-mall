<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import PullUp from '@better-scroll/pull-up'

  BScroll.use(PullUp)
  export default {
    name: "Scroll",
    props: {
      // 利用父子组件通信传入对应的监听滚动条的状态以及是否可以进行上拉加载更多
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建BScroll对象，设置对应的配置属性
      this.scroll = new BScroll(this.$refs.wrapper, {
        //默认为false，当为true时，在content中的dom中，所有元素的click事件都能够其效果
        click: true,
        // 默认为0，1.2.3三种状态，这里不建议写死，利用组件通信进行灵活运用
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动位置
      if (this.probeType == 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
        // console.log(position);
        // 使用组件通信，将监听滚动位置的功能传到其父组件home.vue中进行实现
        // 这些功能最好还是在home.vue中进行实现为好
        this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件--> pullingup事件，这里必须是pullingUp才能够触发上拉加载更多
      // 设置一个判断条件，监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 这里只是封装了一下scroll组件中的方法，让我们在home.vue中使用的时候不会太长
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 获取scroll外的tabcontrol到达那一个位置进行显示的时候的Y值
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }

</script>

<style scoped>
</style>