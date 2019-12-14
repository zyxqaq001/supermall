<template>
  <div id="detail">
   <detail-nav-bar></detail-nav-bar>
   <detail-swiper :topImages="topImages"></detail-swiper>
   <detail-base-info :goods="goods"></detail-base-info>
   <!-- <detail-goods-info></detail-goods-info> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailGoodsInfo
  },
  data() {
    return {
      iid:null,
      topImages:[],
      goods:[]
    }
  },
  created() {
    this.iid = this.$route.params.iid//拿到iid

    getDetail(this.iid).then(res=>{//获取详情页数据
      const data = res.result
      //获取轮播图数据
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    })
     
  },
}
</script>
<style scoped>
</style>