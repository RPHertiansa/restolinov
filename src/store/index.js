import Vue from 'vue'
import Vuex from 'vuex'
import products from './Products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products
  }
})
