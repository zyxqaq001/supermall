import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  addCart(context, payload) {
   return new Promise((resolve,reject)=>{
     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
     if (oldProduct) {//判断商品是够添加到购物车
       context.commit(ADD_COUNTER, oldProduct);//添加过的，数量加1
       resolve('数量加1')
     } else {//未添加的商品，将数量设置为1，并且添加商品到购物车
       payload.count = 1;
       context.commit(ADD_TO_CART, payload)
       resolve('添加了新的商品')
     }
   })

  }
}