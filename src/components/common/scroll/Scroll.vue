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
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType
    })
    //监听滚动
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time=300)
    }
  },
}
</script>
<style scoped>
</style>