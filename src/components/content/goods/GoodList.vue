<template>
  <div class="goods"> 
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodListItem'
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }

  }

</script>

<style>
  .goods {
    /* 定义该类标签是一个flex布局 */
    display: flex;
    /* 该值默认为nowrap，不拆行；这里我们要定义为wrap，在必要的时候可以进行拆行 */
    flex-wrap: wrap;
    /* 在弹性盒对象的 <div> 元素中的各项周围留有空白：中间的空白是均等分的，但是左右两边的空白不是均等分的 */
    justify-content: space-around;
    padding: 2px;
  }
</style>