<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureViews'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        titles:['流行','新款','精选'],
        goods:{//保存商品数据
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    computed: {
      showGoods(){//显示数据
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
     this.getHomeMultidata()
     //请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },
    methods: {
     //事件监听相关方法
     tabClick(index){
       switch (index) {
         case 0:
           this.currentType = 'pop';
           break;
         case 1:
           this.currentType = 'new';
           break;
           case 2:
           this.currentType = 'sell';
           break;
       }
     },

    //网络请求相关方法
       getHomeMultidata(){  // 请求多个数据
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
       },
       getHomeGoods(type){ //请求商品数据
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page +=1
          })
       }
    },
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 5000px;
}
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
  }
  .tab-control{
    position: sticky;
    top: 44px;
     z-index: 99;
  }
</style>
