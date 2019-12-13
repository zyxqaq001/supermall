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
    // pullUpLoad:{
    //   type:Boolean,
    //   default:false
    // }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click:true
    })
    //监听滚动
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
   
    //监听上拉事件
    // this.scroll.on('pullingUp',()=>{
    //    this.$emit('pullingUp')
    // })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time=300)
    },
    // finishPullUp() {
    //     this.scroll.finishPullUp()
    //   }
    refresh(){
       this.scroll.refresh()
    }
  },
}
</script>
<style scoped>
</style>