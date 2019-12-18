<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from './childComps/cartList'

import {mapGetters} from 'vuex'//导入mapGetters 辅助函数
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList
    },
    computed: {
      // ...mapGetters(["cartLength"])mapGetters两种语法
      ...mapGetters({
        length:"cartLength"
      })
    },
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
