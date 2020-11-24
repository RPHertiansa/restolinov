import Vue from 'vue'
import Vuex from 'vuex'
import products from './Products'
import auth from './Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    auth
  }
})
