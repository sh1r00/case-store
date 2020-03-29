import Vue from 'vue'
import Vuex from 'vuex'
import Request from '~/common/request'

const state = {
  cartTotal: 0,
  cart: {},
  products: [],
}

const getters = {
  cart(state) {
    return state.cart
  },
  cartTotal(state) {
    return state.cartTotal
  },
  products(state) {
    return state.products
  }
}

const mutations = {
  SET_PRODUCTS (state, payload) {
    state.products = payload
  },
  CLEAR_CART (state) {
    state.cart = {}
    state.cartTotal = 0
  },
  REMOVE_ITEM (state, item) {
    state.cartTotal -= item.count
    Vue.delete(state.cart, item.slug)
  },
  ADD_TO_CART (state, item) {
    state.cartTotal++
    if (item.slug in state.cart) {
      state.cart[item.slug].count++
    } else {
      let stateItem = Object.assign({}, item)
      stateItem.count = 1
      state.cart[item.slug] = stateItem
    }
  }
}

const actions = {
  getProducts(context) {
    Request.getProducts()
    .then(data => {
      console.log('get products', data)
      context.commit('SET_PRODUCTS', data.entries)
    }).catch(err => {
      console.log(err)
    })
  }
}

const store = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}

export default store
