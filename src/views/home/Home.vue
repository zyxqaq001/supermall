<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tabControl" :titles="titles" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed">
      </tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore" ><!-- -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureViews'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
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
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
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
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,500)
       //监听item中图片加载完成
      this.$bus.$on("itemImageLoad",()=>{
        refresh()
      })

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
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
       this.$refs.tabControl1.currentIndex = index;
       this.$refs.tabControl2.currentIndex = index;

     },
     backClick(){//监听组件的原生事件时需要加上修饰符native
        this.$refs.scroll.scrollTo(0,0,1000)//通过$refs可以拿到scroll组件里的方法
     },
     contentScroll(position){
       this.isShowBackTop = (-position.y)>1000
       this.isTabFixed = (-position.y)>this.tabOffsetTop
     },
     loadMore(){//上拉加载更多
       this.getHomeGoods(this.currentType)
     },
     swiperImageLoad(){//拿到正确的offsetTop值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()//完成上拉加载更多
          })
       }
    },
   
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 50px;
  }
  .tabControl{
    position: relative;
    z-index: 9;
  }

</style>
