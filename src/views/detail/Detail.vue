<template>
  <div id="detail">
   <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'

import {getDetail} from 'network/detail'
export default {
  data() {
    return {
      iid:null
    }
  },
  created() {
    this.iid = this.$route.params.iid//拿到iid

    getDetail(this.iid).then(res=>{
      console.log(res);
    })
     
  },
  components:{
    DetailNavBar
  }
}
</script>
<style scoped>
</style>