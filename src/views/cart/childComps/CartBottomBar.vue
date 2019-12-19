<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>全选
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算：{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  components:{
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength(){
      return  this.cartList.filter(item=>item.checked).length;
    },
    isSelectAll(){
      // return !(this.cartList.filter(item => !item.checked).length);
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){//判断全选或全不选
        this.cartList.forEach(item => item.checked = false);
      }else{
        this.cartList.forEach(item => item.checked = true);
      }
    }
  },
}
</script>

<style scoped>
.bottom-bar{
  height: 48px;
  background: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button{
  width: 21px;
  height: 21px;
  line-height: 18px;
  margin-right: 5px;
}
.price{
  margin-left: 20px;
  flex: 1;
}
.calculate{
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>