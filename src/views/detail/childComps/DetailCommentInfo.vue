<template>
<!-- 首先做一层判断，判断从父组件传过来的值是否为空 -->
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="info-title">用户评价</div>
      <div class="info-more">
        更多
        <!-- 使用i标签画一个箭头 -->
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-img">
        <img :src="item" v-for="(item, index) in commentInfo.images" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/untils'
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate: function(value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }

</script>

<style scoped>
  .comment-info {
    padding: 5px 10px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  .info-title {
    float: left;
    font-size: 15px;
  }
  .info-more {
    float: right;
    font-size: 13px;
    margin-right: 15px;
  }
  .info-user {
    padding: 12px 0px 7px;
  }
  .info-user img {
    width: 41px;
    height: 41px;
    border-radius: 50%;
  }
  .info-user span {
    font-size: 15px;
    position: relative;
    top: -15px;
    left: 12px
  }
  .info-detail {
    padding: 0px 5px 15px;
  }
  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 12px;
  }
  .info-other .date {
    margin-right: 8px;
  }
  .info-img {
    padding-top: 12px;
  }
  .info-img img {
    width: 70px;
    height: 70px;
    padding-right: 5px;
  }
</style>