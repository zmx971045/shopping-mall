<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imageLoad">
    <div class="goods-message">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // console.log('imgload');
        this.$bus.$emit('itemImgLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
        // console.log(this.$router);
        
      }
    }
    
  }

</script>

<style>
  /* 对每一条加载出来的商品信息图片等进行样式调整 */
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-message {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-message p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-message .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-message .collect {
    position: relative;
  }

  .goods-message .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>