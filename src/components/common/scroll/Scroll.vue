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
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
    })
  },
  methods: {
    scrollTO(x,y,time=300){
      this.scroll.scrollTO(x,y,time=300)
    }
  },
}
</script>
<style scoped>
</style>