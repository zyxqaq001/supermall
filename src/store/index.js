import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carList:[

    ]
  },
  mutations: {
    addCart(state,payload){
      let oldProduct = state.carList.find(item=>item.iid === payload.iid)
      if (oldProduct){//判断商品是够添加到购物车
         oldProduct.count += 1;//添加过的，数量加1
       }else{//未添加的商品，将数量设置为1，并且添加商品到购物车
         payload.count = 1;
         state.carList.push(payload)
       }
      
    }
  },
  actions: {
  },
  modules: {
  }
})
