<template>
    <div class="wrapper" ref="wrapper">
     <div class="content">
        <slot></slot>
     </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click:true
    })
    //监听滚动
   if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
   }
    // 监听上拉事件
   if (this.pullUpLoad) {//为true时上拉
      this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
   }
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {//完成下拉加载更多
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
     getScrollY(){
       return this.scroll ? this.scroll.y : 0
     },
  },
}
</script>
<style scoped>
</style>