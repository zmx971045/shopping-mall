<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <!-- span别忘记加 -->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
// 制作tabcontrol，当有鼠标点击某一处时，该处的样式进行改变
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return{
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 组件通信：子传父$emit
        this.$emit('tabClick', index)
      }
    }
  }

</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span{
    padding: 8px;
  }

  .active {
    color: var(--color-high-text); 
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>