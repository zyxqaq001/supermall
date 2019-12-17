import { debounce } from "./utils";
import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  methods: {
    newRefresh(){
      this.$refs.scroll.refresh
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    //监听item中图片加载完成
    this.itemImgListener = () => {
      newRefresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
}
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,

    }
  },
  methods: {
    //返回顶部
    backTop() {
      //监听组件的原生事件时需要加上修饰符native
      this.$refs.scroll.scrollTo(0, 0, 1000); //通过$refs可以拿到scroll组件里的方法
    },
  },
}