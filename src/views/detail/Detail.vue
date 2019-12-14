<template>
  <div id="detail">
   <detail-nav-bar></detail-nav-bar>
   <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'network/detail'
export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[]
    }
  },
  created() {
    this.iid = this.$route.params.iid//拿到iid

    getDetail(this.iid).then(res=>{//获取详情页数据
      //获取轮播图数据
      this.topImages = res.result.itemInfo.topImages
    })
     
  },
  components:{
    DetailNavBar,
    DetailSwiper
  }
}
</script>
<style scoped>
</style>