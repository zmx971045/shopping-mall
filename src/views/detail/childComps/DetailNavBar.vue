<template>
  <div>
    <nav-bar>
      <div slot="left" class="image" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             @click="itemClick(index)"
             :class="{active: index === currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods:{
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }

</script>

<style scoped>
  /* .nav-bar {
    position: relative;
    z-index: 8;
    background-color: #fff;
  } */
  .title {
    display: flex;
    font-size: 11px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .image img{
    margin-top: 12px;
  }
</style>