import { debounce } from "./utils";
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