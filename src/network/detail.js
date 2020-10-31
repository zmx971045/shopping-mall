import {request} from "./request";

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 商品基本信息获取
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.desc = itemInfo.desc
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo){
    this.name = shopInfo.name
    this.logo = shopInfo.shopLogo
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule){
    // 参数信息的一些图片
    this.image = info.image ? info.image[0] : '';
    // 参数信息的详情数据
    this.infos = info.set;
    // 参数的尺码参考
    this.sizes = rule.tables;
  }
}